import { Impit } from 'impit';

import { AbstractService, CheckMethod, TimeoutError, type CheckResult, type HttpClient } from './abstract-service';
import { services } from './data/services';

const TIMEOUT_MS = 10_000;
const DNS_TIMEOUT_MS = 5_000;

const impit = new Impit({ browser: 'chrome' });

function createHttpClient(): HttpClient {
  return async (url: string) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await impit.fetch(url, {
        signal: controller.signal,
      });
      const body = await response.text();
      return { status: response.status, body };
    } catch (e: unknown) {
      if (e instanceof Error && e.name === 'AbortError') {
        throw new TimeoutError(TIMEOUT_MS);
      }
      throw e;
    } finally {
      clearTimeout(timer);
    }
  };
}

function createDnsClient(): HttpClient {
  return async (url: string) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), DNS_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/dns-json' },
        signal: controller.signal,
      });
      const body = await response.text();
      return { status: response.status, body };
    } catch (e: unknown) {
      if (e instanceof Error && e.name === 'AbortError') {
        throw new TimeoutError(DNS_TIMEOUT_MS);
      }
      throw e;
    } finally {
      clearTimeout(timer);
    }
  };
}

class NicknameChecker {
  private readonly services: AbstractService[];

  constructor() {
    const httpClient = createHttpClient();
    const dnsClient = createDnsClient();
    this.services = services.map(
      (s) => new AbstractService(
        s.checkMethod === CheckMethod.DNS ? dnsClient : httpClient,
        s.name, s.url, s.category, s.checkMethod, s.bodyMatch,
      ),
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
