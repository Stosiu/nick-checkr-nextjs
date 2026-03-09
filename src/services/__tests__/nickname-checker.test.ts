import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CheckMethod } from '../abstract-service';
import { services } from '../data/services';

const mockHttpClient = vi.fn();

vi.mock('got-scraping', () => ({
  gotScraping: async (opts: { url: string }) => {
    const result = await mockHttpClient(opts.url);
    return { statusCode: result.status, body: result.body };
  },
}));

// Import after mock setup
const { nicknameChecker } = await import('../nickname-checker');
const { AvailabilityStatus } = await import('../abstract-service');

beforeEach(() => {
  mockHttpClient.mockReset();
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
              mockHttpClient.mockResolvedValueOnce({ status: 404, body: 'Not Found' });
              break;
            case CheckMethod.BodyMatch:
              mockHttpClient.mockResolvedValueOnce({
                status: 200,
                body: `page content ${service.bodyMatch} more content`,
              });
              break;
            case CheckMethod.NotFoundBodyMatch:
              mockHttpClient.mockResolvedValueOnce({
                status: 404,
                body: `content ${service.bodyMatch} here`,
              });
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
              mockHttpClient.mockResolvedValueOnce({ status: 200, body: 'profile page' });
              break;
            case CheckMethod.BodyMatch:
              mockHttpClient.mockResolvedValueOnce({
                status: 200,
                body: 'normal profile page without the match string',
              });
              break;
            case CheckMethod.NotFoundBodyMatch:
              mockHttpClient.mockResolvedValueOnce({ status: 200, body: 'active profile' });
              break;
          }

          const result = await nicknameChecker.check(service.testTakenNick!, service.name);
          expect(result.status).toBe(AvailabilityStatus.Taken);
        });
      }
    });
});
