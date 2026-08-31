import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';

import { getServicesHash } from '@/lib/services-hash';

const NICK_PATTERN = /^[a-zA-Z0-9]([a-zA-Z0-9._-]{0,38}[a-zA-Z0-9])?$/;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ nick: string }> },
) {
  const { nick } = await params;

  if (!NICK_PATTERN.test(nick)) {
    return NextResponse.json({ error: 'Invalid nickname' }, { status: 400 });
  }

  const key = `checks/${getServicesHash()}/${nick.toLowerCase()}.json`;

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
