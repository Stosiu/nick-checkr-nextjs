import { NextRequest } from 'next/server';
import { put } from '@vercel/blob';

import { getCached, setCache } from '@/lib/cache';
import { getServicesHash } from '@/lib/services-hash';
import { AvailabilityStatus } from '@/services';
import { nicknameChecker } from '@/services/nickname-checker';
import { rateLimit } from '@/utils/rate-limit';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const NICK_PATTERN = /^[a-zA-Z0-9]([a-zA-Z0-9._-]{0,38}[a-zA-Z0-9])?$/;
const CONCURRENCY = 16;
const ERROR_TTL = 5 * 60 * 1000;
const RETRY_BACKOFF_MS = [400, 1500];
const TIMEOUT_RETRY_BACKOFF_MS = [400];

function isTransientFailure(status: AvailabilityStatus): boolean {
  return status === AvailabilityStatus.Error || status === AvailabilityStatus.Timeout;
}

function backoffFor(status: AvailabilityStatus): number[] {
  return status === AvailabilityStatus.Timeout ? TIMEOUT_RETRY_BACKOFF_MS : RETRY_BACKOFF_MS;
}

const limiter = rateLimit({ interval: 60_000, uniqueTokenPerInterval: 500 });

const cardState: Record<AvailabilityStatus, string> = {
  [AvailabilityStatus.Available]: 'available',
  [AvailabilityStatus.Taken]: 'taken',
  [AvailabilityStatus.Error]: 'error',
  [AvailabilityStatus.Timeout]: 'error',
  [AvailabilityStatus.Unknown]: 'unknown',
};

export async function GET(request: NextRequest) {
  const nick = request.nextUrl.searchParams.get('nick');

  if (!nick) {
    return Response.json({ error: 'Missing nick' }, { status: 400 });
  }

  if (!NICK_PATTERN.test(nick)) {
    return Response.json({ error: 'Invalid nickname format' }, { status: 400 });
  }

  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'anonymous';

  if (!limiter.check(20, ip).success) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const serviceNames = nicknameChecker.getServiceNamesSpreadByHost();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const results: Record<string, string> = {};
      const failures: { service: string; status: string; detail?: string }[] = [];
      let closed = false;

      const send = (payload: unknown) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(payload)}\n`));
        } catch {
          closed = true;
        }
      };

      send({ type: 'start', total: serviceNames.length });

      let cursor = 0;
      const worker = async () => {
        while (cursor < serviceNames.length && !closed && !request.signal.aborted) {
          const service = serviceNames[cursor++];
          const cacheKey = `${nick.toLowerCase()}:${service}`;

          let status = getCached<AvailabilityStatus>(cacheKey);
          let detail: string | undefined;

          if (!status) {
            try {
              let result = await nicknameChecker.check(nick, service);
              for (const delay of backoffFor(result.status)) {
                if (!isTransientFailure(result.status)) break;
                await new Promise((resolve) => setTimeout(resolve, delay));
                result = await nicknameChecker.check(nick, service);
              }
              status = result.status;
              detail = result.errorDetail;
              const isFailure =
                status === AvailabilityStatus.Error || status === AvailabilityStatus.Timeout;
              setCache(cacheKey, status, isFailure ? ERROR_TTL : undefined);
            } catch (err) {
              status = AvailabilityStatus.Error;
              detail = err instanceof Error ? err.message : String(err);
            }
          }

          results[service] = cardState[status];
          if (status === AvailabilityStatus.Error || status === AvailabilityStatus.Timeout) {
            failures.push({ service, status, detail });
          }
          send({ type: 'result', service, status, detail });
        }
      };

      await Promise.all(Array.from({ length: CONCURRENCY }, worker));

      if (failures.length > 0) {
        console.warn(
          `[check/stream] health ${JSON.stringify({
            checked: Object.keys(results).length,
            failed: failures.length,
            services: failures,
          })}`,
        );
      }

      if (!request.signal.aborted && Object.keys(results).length === serviceNames.length) {
        try {
          await persist(nick, results);
        } catch (err) {
          console.error(`[check/stream] failed to persist results for "${nick}":`, err);
        }
      }

      send({ type: 'done' });
      closed = true;
      try {
        controller.close();
      } catch {
        closed = true;
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}

async function persist(nick: string, results: Record<string, string>) {
  const values = Object.values(results);
  const payload = {
    nick: nick.toLowerCase(),
    checkedAt: new Date().toISOString(),
    checkCount: (await readCheckCount(nick)) + 1,
    results,
    summary: {
      available: values.filter((s) => s === 'available').length,
      taken: values.filter((s) => s === 'taken').length,
      errors: values.filter((s) => s === 'error').length,
      unknown: values.filter((s) => s === 'unknown').length,
      total: values.length,
    },
  };

  await put(`checks/${getServicesHash()}/${nick.toLowerCase()}.json`, JSON.stringify(payload), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}

async function readCheckCount(nick: string): Promise<number> {
  const { list } = await import('@vercel/blob');
  const key = `checks/${getServicesHash()}/${nick.toLowerCase()}.json`;
  const { blobs } = await list({ prefix: key, limit: 1 });
  if (blobs.length === 0) return 0;
  const res = await fetch(blobs[0].url);
  const existing = await res.json();
  return existing.checkCount ?? 1;
}
