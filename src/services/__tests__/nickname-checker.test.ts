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

const originalFetch = globalThis.fetch;
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
          }

          const result = await nicknameChecker.check(service.testTakenNick!, service.name);
          expect(result.status).toBe(AvailabilityStatus.Taken);
        });
      }
    });
});
