import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getCached, setCache } from '../cache';

describe('cache', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns undefined for a missing key', () => {
    expect(getCached('missing')).toBeUndefined();
  });

  it('stores and retrieves a value before expiry', () => {
    setCache('k', { taken: true }, 1000);
    expect(getCached<{ taken: boolean }>('k')).toEqual({ taken: true });
  });

  it('returns undefined once the ttl has elapsed', () => {
    setCache('k', 'value', 1000);
    vi.setSystemTime(1001);
    expect(getCached('k')).toBeUndefined();
  });

  it('keeps the value at the exact ttl boundary', () => {
    setCache('k', 'value', 1000);
    vi.setSystemTime(1000);
    expect(getCached('k')).toBe('value');
  });

  it('overwrites an existing key with a fresh ttl', () => {
    setCache('k', 'old', 1000);
    vi.setSystemTime(500);
    setCache('k', 'new', 1000);
    vi.setSystemTime(1200);
    expect(getCached('k')).toBe('new');
  });
});
