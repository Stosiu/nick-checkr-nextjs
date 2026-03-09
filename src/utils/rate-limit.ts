import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  interval?: number;
  uniqueTokenPerInterval?: number;
}

export function rateLimit(options?: RateLimitOptions) {
  const cache = new LRUCache<string, number[]>({
    max: options?.uniqueTokenPerInterval ?? 500,
    ttl: options?.interval ?? 60_000,
  });

  return {
    check(limit: number, token: string): { success: boolean; remaining: number } {
      const tokenCount = cache.get(token) ?? [0];
      if (tokenCount[0] === 0) {
        cache.set(token, tokenCount);
      }
      tokenCount[0] += 1;

      const remaining = Math.max(0, limit - tokenCount[0]);
      return { success: tokenCount[0] <= limit, remaining };
    },
  };
}
