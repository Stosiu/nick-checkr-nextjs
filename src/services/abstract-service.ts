export enum AvailabilityStatus {
  Available = 'AVAILABLE',
  Error = 'ERROR',
  Taken = 'TAKEN',
  Timeout = 'TIMEOUT',
  Unknown = 'UNKNOWN',
}

export interface CheckResult {
  status: AvailabilityStatus;
  errorDetail?: string;
}

export enum CheckMethod {
  Standard = 'STANDARD',
  BodyMatch = 'BODY_MATCH',
  NotFoundBodyMatch = 'NOT_FOUND_BODY_MATCH',
  DNS = 'DNS',
  NickInTitle = 'NICK_IN_TITLE',
  NickInOgTitle = 'NICK_IN_OG_TITLE',
  Unverifiable = 'UNVERIFIABLE',
}

export interface ServiceDefinition {
  name: string;
  url: string;
  category: string;
  checkMethod: CheckMethod;
  bodyMatch?: string | null;
  testAvailableNick?: string;
  testTakenNick?: string;
}

export interface HttpResponse {
  status: number;
  body: string;
}

export type HttpClient = (url: string) => Promise<HttpResponse>;

export class AbstractService implements ServiceDefinition {
  constructor(
    private readonly httpClient: HttpClient,
    readonly name: string,
    readonly url: string,
    readonly category: string,
    readonly checkMethod: CheckMethod,
    readonly bodyMatch?: string | null,
  ) {
    const needsBodyMatch =
      checkMethod === CheckMethod.BodyMatch || checkMethod === CheckMethod.NotFoundBodyMatch;
    if (needsBodyMatch && typeof bodyMatch !== 'string') {
      throw new Error(
        `bodyMatch is required for checkMethod "${checkMethod}" on service "${name}"`,
      );
    }
  }

  async check(nick: string): Promise<CheckResult> {
    if (this.checkMethod === CheckMethod.Unverifiable) {
      return {
        status: AvailabilityStatus.Unknown,
        errorDetail: `${this.name} serves the same page whether or not a username exists, so availability cannot be determined automatically. Open the profile to check.`,
      };
    }

    const url = this.url.replace('{}', nick);

    try {
      const response = await this.httpClient(url);
      return this.parseResponse(response.status, response.body, nick);
    } catch (e: unknown) {
      if (e instanceof TimeoutError) {
        return { status: AvailabilityStatus.Timeout, errorDetail: e.message };
      }
      const message = e instanceof Error ? e.message : String(e);
      return { status: AvailabilityStatus.Error, errorDetail: message };
    }
  }

  parseResponse(status: number, body?: string, nick?: string): CheckResult {
    const bodyContainsMatch =
      typeof body === 'string' &&
      typeof this.bodyMatch === 'string' &&
      body.includes(this.bodyMatch);

    switch (this.checkMethod) {
      case CheckMethod.DNS: {
        try {
          const json = JSON.parse(body ?? '{}');
          return {
            status: json.Status === 3
              ? AvailabilityStatus.Available
              : AvailabilityStatus.Taken,
          };
        } catch {
          return { status: AvailabilityStatus.Error, errorDetail: 'DNS parse error' };
        }
      }

      case CheckMethod.Unverifiable:
        return { status: AvailabilityStatus.Unknown };

      case CheckMethod.NickInTitle:
      case CheckMethod.NickInOgTitle: {
        if (status !== 200 && status !== 404) {
          return { status: AvailabilityStatus.Error, errorDetail: `HTTP ${status}` };
        }
        if (status === 404) return { status: AvailabilityStatus.Available };
        const haystack =
          this.checkMethod === CheckMethod.NickInTitle ? readTitle(body) : readOgTitle(body);
        if (haystack === null) {
          return { status: AvailabilityStatus.Error, errorDetail: 'No title in response' };
        }
        return {
          status: nick && haystack.toLowerCase().includes(nick.toLowerCase())
            ? AvailabilityStatus.Taken
            : AvailabilityStatus.Available,
        };
      }

      case CheckMethod.NotFoundBodyMatch:
        return {
          status: status !== 200 && bodyContainsMatch
            ? AvailabilityStatus.Available
            : AvailabilityStatus.Taken,
        };

      case CheckMethod.BodyMatch:
        return {
          status: bodyContainsMatch
            ? AvailabilityStatus.Available
            : AvailabilityStatus.Taken,
        };

      default:
        if (status !== 200 && status !== 404) {
          return { status: AvailabilityStatus.Error, errorDetail: `HTTP ${status}` };
        }
        return {
          status: status !== 200
            ? AvailabilityStatus.Available
            : AvailabilityStatus.Taken,
        };
    }
  }
}

function readTitle(body?: string): string | null {
  if (typeof body !== 'string') return null;
  return body.match(/<title[^>]*>([^<]{0,300})<\/title>/i)?.[1]?.trim() ?? null;
}

function readOgTitle(body?: string): string | null {
  if (typeof body !== 'string') return null;
  return (
    body.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']{0,300})["']/i)?.[1] ??
    null
  );
}

export class TimeoutError extends Error {
  constructor(ms: number) {
    super(`timeout after ${ms}ms`);
    this.name = 'TimeoutError';
  }
}
