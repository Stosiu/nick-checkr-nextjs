import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import { getServicesHash } from '@/lib/services-hash';

const NICK_PATTERN = /^[a-zA-Z0-9]([a-zA-Z0-9._-]{0,38}[a-zA-Z0-9])?$/;

function blobKey(nick: string): string {
  return `checks/${getServicesHash()}/${nick.toLowerCase()}.json`;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ nick: string }> },
) {
  const { nick } = await params;

  if (!NICK_PATTERN.test(nick)) {
    return NextResponse.json({ error: 'Invalid nickname' }, { status: 400 });
  }

  const key = blobKey(nick);

  try {
    const { blobs } = await list({ prefix: key, limit: 1 });
    if (blobs.length === 0) {
      return NextResponse.json({ exists: false }, { status: 404 });
    }

    const res = await fetch(blobs[0].url);
    const data = await res.json();

    return NextResponse.json({
      exists: true,
      checkCount: data.checkCount ?? 1,
      lastCheckedAt: data.checkedAt,
    });
  } catch {
    return NextResponse.json({ exists: false }, { status: 404 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ nick: string }> },
) {
  const { nick } = await params;

  if (!NICK_PATTERN.test(nick)) {
    return NextResponse.json({ error: 'Invalid nickname' }, { status: 400 });
  }

  const body = await request.json();
  const results: Record<string, string> = body.results;

  if (!results || typeof results !== 'object') {
    return NextResponse.json({ error: 'Missing results' }, { status: 400 });
  }

  const key = blobKey(nick);

  // Read existing blob to get check count
  let checkCount = 0;
  try {
    const { blobs } = await list({ prefix: key, limit: 1 });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      const existing = await res.json();
      checkCount = existing.checkCount ?? 1;
    }
  } catch {
    // No existing blob, start at 0
  }

  const available = Object.values(results).filter((s) => s === 'available').length;
  const taken = Object.values(results).filter((s) => s === 'taken').length;
  const errors = Object.values(results).filter((s) => s === 'error').length;

  const payload = {
    nick: nick.toLowerCase(),
    checkedAt: new Date().toISOString(),
    checkCount: checkCount + 1,
    results,
    summary: { available, taken, errors, total: Object.keys(results).length },
  };

  await put(key, JSON.stringify(payload), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });

  return NextResponse.json({ checkCount: payload.checkCount });
}
