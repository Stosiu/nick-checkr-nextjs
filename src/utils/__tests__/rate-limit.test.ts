import { describe, expect, it } from 'vitest';

import { rateLimit } from '../rate-limit';

describe('rateLimit', () => {
  it('allows requests up to the limit and reports remaining', () => {
    const limiter = rateLimit();

    expect(limiter.check(3, 'ip-a')).toEqual({ success: true, remaining: 2 });
    expect(limiter.check(3, 'ip-a')).toEqual({ success: true, remaining: 1 });
    expect(limiter.check(3, 'ip-a')).toEqual({ success: true, remaining: 0 });
  });

  it('fails once the limit is exceeded', () => {
    const limiter = rateLimit();
    limiter.check(1, 'ip-a');

    expect(limiter.check(1, 'ip-a')).toEqual({ success: false, remaining: 0 });
  });

  it('never reports negative remaining', () => {
    const limiter = rateLimit();
    limiter.check(1, 'ip-a');
    limiter.check(1, 'ip-a');

    expect(limiter.check(1, 'ip-a').remaining).toBe(0);
  });

  it('tracks tokens independently', () => {
    const limiter = rateLimit();
    limiter.check(2, 'ip-a');

    expect(limiter.check(2, 'ip-b')).toEqual({ success: true, remaining: 1 });
  });
});
