import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import { getServicesHash } from '@/lib/services-hash';
import { CheckMethod, unverifiableReasonText } from '@/services';
import { services } from '@/services/data/services';
import { rateLimit } from '@/utils/rate-limit';

const unverifiable = Object.fromEntries(
  services
    .filter((s) => s.checkMethod === CheckMethod.Unverifiable)
    .map((s) => [
      s.name,
      {
        reason: s.unverifiableReason,
        explanation: unverifiableReasonText[s.unverifiableReason!],
        checkManuallyAt: s.url.replace('{}', '{username}'),
      },
    ]),
);

const NICK_PATTERN = /^[a-zA-Z0-9]([a-zA-Z0-9._-]{0,38}[a-zA-Z0-9])?$/;

const limiter = rateLimit({
  interval: 60_000,
  uniqueTokenPerInterval: 500,
});

export async function GET(request: NextRequest) {
  const nick = request.nextUrl.searchParams.get('nick');

  if (!nick) {
    return NextResponse.json(
      {
        error: 'Missing nick parameter',
        usage: 'GET /api/llm/check?nick={username}',
        description: `Returns cached username availability results across ${services.length} platforms. Each result is available, taken, error, or unknown; unknown entries are explained in the unverifiable field.`,
      },
      { status: 400 },
    );
  }

  if (!NICK_PATTERN.test(nick)) {
    return NextResponse.json({ error: 'Invalid nickname format. Use 1-40 alphanumeric characters, dots, hyphens, or underscores.' }, { status: 400 });
  }

  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'anonymous';
  const { success } = limiter.check(100, ip);

  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded. Max 100 requests per minute.' }, { status: 429 });
  }

  const key = `checks/${getServicesHash()}/${nick.toLowerCase()}.json`;

  try {
    const { blobs } = await list({ prefix: key, limit: 1 });

    if (blobs.length === 0) {
      return NextResponse.json({
        cached: false,
        nick: nick.toLowerCase(),
        message: 'This username has not been checked yet.',
        checkUrl: `https://nickcheckr.stosiu.dev/?nick=${encodeURIComponent(nick)}`,
      });
    }

    const res = await fetch(blobs[0].url);
    const data = await res.json();

    const unknownHere = Object.fromEntries(
      Object.entries(unverifiable).filter(([name]) => data.results?.[name] === 'unknown'),
    );

    return NextResponse.json({
      cached: true,
      nick: data.nick,
      checkCount: data.checkCount,
      lastCheckedAt: data.checkedAt,
      summary: data.summary,
      results: data.results,
      statusMeanings: {
        available: 'No account with this username was found on the platform.',
        taken: 'An account with this username already exists.',
        error: 'The platform could not be reached, or refused the request. Availability is unknown.',
        unknown: 'This platform cannot be checked automatically. See unverifiable for the reason.',
      },
      unverifiable: unknownHere,
    }, {
      headers: {
        'Cache-Control': 's-maxage=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to retrieve cached results' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
