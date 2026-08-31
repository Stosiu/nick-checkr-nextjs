import { writeFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

import { AvailabilityStatus, CheckMethod } from '../../abstract-service';
import { services } from '../../data/services';
import { nicknameChecker } from '../../nickname-checker';

const CONCURRENCY = Number(process.env.PROBE_CONCURRENCY ?? '16');
const REPORT = process.env.PROBE_REPORT;
const ONLY = process.env.PROBE_ONLY?.split(',').filter(Boolean);
const MIN_PASS_RATE = Number(process.env.PROBE_MIN_PASS_RATE ?? '95');

interface Row {
  name: string;
  category: string;
  method: string;
  nick: string;
  expected: string;
  actual: string;
  detail?: string;
  ok: boolean;
}

async function pool<T>(items: T[], limit: number, fn: (item: T) => Promise<void>) {
  let i = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (i < items.length) await fn(items[i++]);
    }),
  );
}

describe('live service health', () => {
  it(
    'every service still distinguishes a taken username from a free one',
    async () => {
      const cases = services
        .filter((s) => !ONLY || ONLY.includes(s.name))
        .flatMap((s) => {
          const unverifiable = s.checkMethod === CheckMethod.Unverifiable;
          const entries: Array<{ nick: string; expected: AvailabilityStatus }> = [];
          if (s.testTakenNick) {
            entries.push({
              nick: s.testTakenNick,
              expected: unverifiable ? AvailabilityStatus.Unknown : AvailabilityStatus.Taken,
            });
          }
          if (s.testAvailableNick) {
            entries.push({
              nick: s.testAvailableNick,
              expected: unverifiable ? AvailabilityStatus.Unknown : AvailabilityStatus.Available,
            });
          }
          return entries.map((e) => ({ service: s, ...e }));
        });

      const rows: Row[] = [];

      await pool(cases, CONCURRENCY, async (c) => {
        const result = await nicknameChecker.check(c.nick, c.service.name);
        rows.push({
          name: c.service.name,
          category: c.service.category,
          method: c.service.checkMethod,
          nick: c.nick,
          expected: c.expected,
          actual: result.status,
          detail: result.errorDetail,
          ok: result.status === c.expected,
        });
      });

      if (REPORT) writeFileSync(REPORT, JSON.stringify(rows, null, 2));

      const failed = rows.filter((r) => !r.ok);
      const rate = ((rows.length - failed.length) / rows.length) * 100;
      console.log(`live health: ${rows.length - failed.length}/${rows.length} (${rate.toFixed(1)}%)`);

      for (const r of failed) {
        console.log(`  FAIL ${r.name} [${r.method}] ${r.nick}: expected ${r.expected}, got ${r.actual}${r.detail ? ` (${r.detail})` : ''}`);
      }

      expect(rows.length).toBeGreaterThan(0);
      expect(rate).toBeGreaterThanOrEqual(MIN_PASS_RATE);
    },
    60 * 60 * 1000,
  );
});
