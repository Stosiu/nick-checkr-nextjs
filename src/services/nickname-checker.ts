import { Impit } from 'impit';

import { AbstractService, CheckMethod, TimeoutError, type CheckResult, type HttpClient } from './abstract-service';
import { services } from './data/services';

const TIMEOUT_MS = 10_000;
const DNS_TIMEOUT_MS = 5_000;
const RDAP_TIMEOUT_MS = 8_000;

const impit = new Impit({ browser: 'chrome' });

function createHttpClient(headers?: Record<string, string>): HttpClient {
  return async (url: string) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await impit.fetch(url, {
        headers,
        signal: controller.signal,
      });
      const body = await response.text();
      return { status: response.status, body, finalUrl: response.url ?? url };
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

function createFetchClient(accept: string, timeoutMs: number): HttpClient {
  return async (url: string) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        headers: { Accept: accept },
        signal: controller.signal,
      });
      const body = await response.text();
      return { status: response.status, body, finalUrl: response.url ?? url };
    } catch (e: unknown) {
      if (e instanceof Error && e.name === 'AbortError') {
        throw new TimeoutError(timeoutMs);
      }
      throw e;
    } finally {
      clearTimeout(timer);
    }
  };
}

function clientFor(
  method: CheckMethod,
  clients: Record<'http' | 'dns' | 'rdap' | 'json', HttpClient>,
): HttpClient {
  switch (method) {
    case CheckMethod.DNS:
      return clients.dns;
    case CheckMethod.Rdap:
      return clients.rdap;
    case CheckMethod.JsonApi:
      return clients.json;
    default:
      return clients.http;
  }
}

class NicknameChecker {
  private readonly services: AbstractService[];

  constructor() {
    const clients = {
      http: createHttpClient(),
      dns: createFetchClient('application/dns-json', DNS_TIMEOUT_MS),
      rdap: createFetchClient('application/rdap+json', RDAP_TIMEOUT_MS),
      json: createHttpClient({ Accept: 'application/json' }),
    };

    this.services = services.map(
      (s) => new AbstractService(
        clientFor(s.checkMethod, clients),
        s.name,
        s.url,
        s.category,
        s.checkMethod,
        'bodyMatch' in s ? s.bodyMatch : undefined,
        'unverifiableReason' in s ? s.unverifiableReason : undefined,
        {
          presenceMatch: 'presenceMatch' in s ? s.presenceMatch : undefined,
          redirectMatch: 'redirectMatch' in s ? s.redirectMatch : undefined,
          apiUrl: 'apiUrl' in s ? s.apiUrl : undefined,
          jsonPath: 'jsonPath' in s ? s.jsonPath : undefined,
        },
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
