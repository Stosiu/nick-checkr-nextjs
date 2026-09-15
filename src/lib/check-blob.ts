import { BlobNotFoundError, head } from '@vercel/blob';

import { getServicesHash } from '@/lib/services-hash';

export interface CheckBlob {
  nick: string;
  checkedAt: string;
  checkCount: number;
  results: Record<string, string>;
  summary: Record<string, number>;
}

export function checkBlobPathname(nick: string): string {
  return `checks/${getServicesHash()}/${nick.toLowerCase()}.json`;
}

export async function readCheckBlob(pathname: string): Promise<CheckBlob | null> {
  let meta;
  try {
    meta = await head(pathname);
  } catch (err) {
    if (err instanceof BlobNotFoundError) return null;
    throw err;
  }

  const res = await fetch(`${meta.url}?v=${meta.uploadedAt.getTime()}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}
