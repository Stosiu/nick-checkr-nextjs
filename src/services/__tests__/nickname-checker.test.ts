import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CheckMethod } from '../abstract-service';
import { services } from '../data/services';

const mockFetch = vi.fn();
const mockDnsFetch = vi.fn();

vi.mock('impit', () => ({
  Impit: class {
    fetch = mockFetch;
  },
}));

globalThis.fetch = mockDnsFetch;

const { nicknameChecker } = await import('../nickname-checker');
const { AvailabilityStatus } = await import('../abstract-service');

beforeEach(() => {
  mockFetch.mockReset();
  mockDnsFetch.mockReset();
});

describe('NicknameChecker', () => {
  it('returns all service names', () => {
    const names = nicknameChecker.getServiceNames();
    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain('GitHub');
  });

  it('throws for unknown service', () => {
    expect(() => nicknameChecker.check('test', 'NonExistentService')).toThrow();
  });
});

describe('NicknameChecker with mocked responses', () => {
  services
    .filter((s) => s.checkMethod === CheckMethod.Unverifiable)
    .forEach((service) => {
      it(`${service.name}: reports unknown without a request`, async () => {
        const result = await nicknameChecker.check('anynick', service.name);
        expect(result.status).toBe(AvailabilityStatus.Unknown);
        expect(mockFetch).not.toHaveBeenCalled();
        expect(mockDnsFetch).not.toHaveBeenCalled();
      });
    });

  services
    .filter((s) => s.checkMethod !== CheckMethod.Unverifiable)
    .filter((s) => s.testAvailableNick || s.testTakenNick)
    .forEach((service) => {
      if (service.testAvailableNick) {
        it(`${service.name}: detects available nick`, async () => {
          switch (service.checkMethod) {
            case CheckMethod.Standard:
              mockFetch.mockResolvedValueOnce(new Response('Not Found', { status: 404 }));
              break;
            case CheckMethod.BodyMatch:
              mockFetch.mockResolvedValueOnce(
                new Response(`page content ${service.bodyMatch} more content`, { status: 200 }),
              );
              break;
            case CheckMethod.NotFoundBodyMatch:
              mockFetch.mockResolvedValueOnce(
                new Response(`content ${service.bodyMatch} here`, { status: 404 }),
              );
              break;
            case CheckMethod.DNS:
              mockDnsFetch.mockResolvedValueOnce(
                new Response(JSON.stringify({ Status: 3 }), { status: 200 }),
              );
              break;
            case CheckMethod.NickInTitle:
              mockFetch.mockResolvedValueOnce(
                new Response('<title>Sign up today</title>', { status: 200 }),
              );
              break;
            case CheckMethod.NickInOgTitle:
              mockFetch.mockResolvedValueOnce(
                new Response('<meta property="og:title" content="Sign up today">', { status: 200 }),
              );
              break;
          }

          const result = await nicknameChecker.check(service.testAvailableNick!, service.name);
          expect(result.status).toBe(AvailabilityStatus.Available);
        });
      }

      if (service.testTakenNick) {
        it(`${service.name}: detects taken nick`, async () => {
          switch (service.checkMethod) {
            case CheckMethod.Standard:
              mockFetch.mockResolvedValueOnce(new Response('profile page', { status: 200 }));
              break;
            case CheckMethod.BodyMatch:
              mockFetch.mockResolvedValueOnce(
                new Response('normal profile page without the match string', { status: 200 }),
              );
              break;
            case CheckMethod.NotFoundBodyMatch:
              mockFetch.mockResolvedValueOnce(new Response('active profile', { status: 200 }));
              break;
            case CheckMethod.DNS:
              mockDnsFetch.mockResolvedValueOnce(
                new Response(JSON.stringify({ Status: 0, Answer: [{ data: '1.2.3.4' }] }), { status: 200 }),
              );
              break;
            case CheckMethod.NickInTitle:
              mockFetch.mockResolvedValueOnce(
                new Response(`<title>${service.testTakenNick} on ${service.name}</title>`, { status: 200 }),
              );
              break;
            case CheckMethod.NickInOgTitle:
              mockFetch.mockResolvedValueOnce(
                new Response(`<meta property="og:title" content="${service.testTakenNick} profile">`, { status: 200 }),
              );
              break;
          }

          const result = await nicknameChecker.check(service.testTakenNick!, service.name);
          expect(result.status).toBe(AvailabilityStatus.Taken);
        });
      }
    });
});

describe('service catalogue integrity', () => {
  it('has no duplicate service names', () => {
    const seen = new Map<string, number>();
    for (const s of services) seen.set(s.name, (seen.get(s.name) ?? 0) + 1);
    expect([...seen].filter(([, count]) => count > 1).map(([name]) => name)).toEqual([]);
  });

  it('exposes one checker entry per catalogue entry', () => {
    expect(nicknameChecker.getServiceNames()).toHaveLength(services.length);
  });
});
