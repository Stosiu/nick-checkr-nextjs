import { NextRequest, NextResponse } from 'next/server';

import { getCached, setCache } from '@/lib/cache';
import { nicknameChecker } from '@/services/nickname-checker';
import { AvailabilityStatus } from '@/services';
import { rateLimit } from '@/utils/rate-limit';

const NICK_PATTERN = /^[a-zA-Z0-9]([a-zA-Z0-9._-]{0,38}[a-zA-Z0-9])?$/;
const validServices = new Set(nicknameChecker.getServiceNames());

const limiter = rateLimit({
  interval: 60_000,
  uniqueTokenPerInterval: 500,
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const nick = searchParams.get('nick');
  const service = searchParams.get('service');

  if (!nick || !service) {
    return NextResponse.json({ error: 'Missing nick or service' }, { status: 400 });
  }

  if (!NICK_PATTERN.test(nick)) {
    return NextResponse.json({ error: 'Invalid nickname format' }, { status: 400 });
  }

  if (!validServices.has(service)) {
    return NextResponse.json({ error: 'Unknown service' }, { status: 400 });
  }

  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'anonymous';
  const { success, remaining } = limiter.check(1000, ip);

  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const cacheKey = `${nick.toLowerCase()}:${service}`;
  const cached = getCached<AvailabilityStatus>(cacheKey);

  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        'Cache-Control': 's-maxage=3600',
        'X-RateLimit-Remaining': String(remaining),
        'X-Cache': 'HIT',
      },
    });
  }

  try {
    const { status: result, errorDetail } = await nicknameChecker.check(nick, service);

    if (result === AvailabilityStatus.Error || result === AvailabilityStatus.Timeout) {
      console.error(`[check] ${service} returned ${result} for nick "${nick}"${errorDetail ? ` — ${errorDetail}` : ''}`);
      setCache(cacheKey, result, 5 * 60 * 1000);
    } else {
      setCache(cacheKey, result);
    }

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 's-maxage=3600',
        'X-RateLimit-Remaining': String(remaining),
        'X-Cache': 'MISS',
      },
    });
  } catch (err) {
    console.error(`[check] ${service} threw for nick "${nick}":`, err);
    return NextResponse.json({ error: 'Check failed' }, { status: 500 });
  }
}
