import { gotScraping } from 'got-scraping';

import { AbstractService, TimeoutError, type CheckResult, type HttpClient } from './abstract-service';
import { services } from './data/services';

const TIMEOUT_MS = 10_000;

function createHttpClient(): HttpClient {
  return async (url: string) => {
    try {
      const response = await gotScraping({
        url,
        timeout: { request: TIMEOUT_MS },
        followRedirect: true,
        maxRedirects: 10,
        throwHttpErrors: false,
        headerGeneratorOptions: {
          browsers: ['chrome'],
          operatingSystems: ['macos'],
          locales: ['en-US'],
        },
      });
      return { status: response.statusCode, body: response.body };
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e && e.code === 'ETIMEDOUT') {
        throw new TimeoutError(TIMEOUT_MS);
      }
      throw e;
    }
  };
}

class NicknameChecker {
  private readonly services: AbstractService[];

  constructor() {
    const httpClient = createHttpClient();
    this.services = services.map(
      (s) => new AbstractService(httpClient, s.name, s.url, s.category, s.checkMethod, s.bodyMatch),
    );
  }

  getServiceNames(): string[] {
    return this.services.map((s) => s.name);
  }

  getServiceEntries(): { name: string; url: string; category: string }[] {
    return this.services.map((s) => ({ name: s.name, url: s.url, category: s.category }));
  }

  check(nick: string, serviceName: string): Promise<CheckResult> {
    const service = this.services.find((s) => s.name === serviceName);
    if (!service) {
      throw new Error(`Service "${serviceName}" not found`);
    }
    return service.check(nick);
  }
}

export const nicknameChecker = new NicknameChecker();
