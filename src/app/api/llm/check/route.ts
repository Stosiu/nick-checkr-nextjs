import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import { getServicesHash } from '@/lib/services-hash';
import { rateLimit } from '@/utils/rate-limit';

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
        description: 'Returns cached username availability results across 208+ platforms',
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

    return NextResponse.json({
      cached: true,
      nick: data.nick,
      checkCount: data.checkCount,
      lastCheckedAt: data.checkedAt,
      summary: data.summary,
      results: data.results,
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
