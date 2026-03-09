type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const store = new Map<string, CacheEntry<unknown>>();

const DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes

export function getCached<T>(key: string): T | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.value as T;
}

export function setCache<T>(key: string, value: T, ttl = DEFAULT_TTL): void {
  store.set(key, { value, expiresAt: Date.now() + ttl });

  // Lazy eviction: prune expired entries when cache grows large
  if (store.size > 5000) {
    const now = Date.now();
    for (const [k, v] of store) {
      if (now > v.expiresAt) store.delete(k);
    }
  }
}
