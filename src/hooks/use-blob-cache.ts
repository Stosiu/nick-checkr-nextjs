'use client';

import { useEffect, useState } from 'react';

interface Entry {
  nick: string;
  count: number | null;
}

export function useBlobCache(nick: string | null, isComplete: boolean) {
  const [entry, setEntry] = useState<Entry | null>(null);

  useEffect(() => {
    if (!nick) return;

    let cancelled = false;

    fetch(`/api/cache/${encodeURIComponent(nick)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) setEntry({ nick, count: data?.checkCount ?? null });
      })
      .catch(() => {
        if (!cancelled) setEntry({ nick, count: null });
      });

    return () => {
      cancelled = true;
    };
  }, [nick, isComplete]);

  return { checkCount: entry && entry.nick === nick ? entry.count : null };
}
