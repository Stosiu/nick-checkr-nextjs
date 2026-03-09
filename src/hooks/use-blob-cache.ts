'use client';

import { useCallback, useEffect, useState } from 'react';

interface BlobCacheState {
  checkCount: number | null;
  isLoading: boolean;
}

export function useBlobCache(nick: string | null) {
  const [state, setState] = useState<BlobCacheState>({
    checkCount: null,
    isLoading: false,
  });

  useEffect(() => {
    if (!nick) {
      setState({ checkCount: null, isLoading: false });
      return;
    }

    setState({ checkCount: null, isLoading: true });

    fetch(`/api/cache/${encodeURIComponent(nick)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setState({
          checkCount: data?.checkCount ?? null,
          isLoading: false,
        });
      })
      .catch(() => {
        setState({ checkCount: null, isLoading: false });
      });
  }, [nick]);

  const saveResults = useCallback(
    async (results: Record<string, string>) => {
      if (!nick) return;
      try {
        const res = await fetch(`/api/cache/${encodeURIComponent(nick)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ results }),
        });
        if (res.ok) {
          const data = await res.json();
          setState((prev) => ({ ...prev, checkCount: data.checkCount }));
        }
      } catch {
        // Silently fail — caching is best-effort
      }
    },
    [nick],
  );

  return { ...state, saveResults };
}
