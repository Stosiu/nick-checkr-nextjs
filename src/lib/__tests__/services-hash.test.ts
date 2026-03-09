import { describe, expect, it } from 'vitest';
import { getServicesHash } from '../services-hash';

describe('getServicesHash', () => {
  it('returns an 8-char hex string', () => {
    const hash = getServicesHash();
    expect(hash).toMatch(/^[a-f0-9]{8}$/);
  });

  it('returns the same hash on repeated calls', () => {
    expect(getServicesHash()).toBe(getServicesHash());
  });
});
