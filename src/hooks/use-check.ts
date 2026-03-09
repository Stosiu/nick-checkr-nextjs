'use client';

import { useQuery } from '@tanstack/react-query';

import type { AvailabilityStatus } from '@/services';
import { enqueue } from '@/lib/fetch-queue';

export function useCheck(nick: string, service: string) {
  return useQuery<AvailabilityStatus>({
    queryKey: ['check-nickname', nick, service],
    queryFn: () =>
      enqueue(async () => {
        const params = new URLSearchParams({ nick, service });
        const res = await fetch(`/api/check?${params}`);
        if (!res.ok) throw new Error('Check failed');
        return res.json();
      }),
    retry: false,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
