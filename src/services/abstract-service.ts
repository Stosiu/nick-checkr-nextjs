export enum AvailabilityStatus {
  Available = 'AVAILABLE',
  Error = 'ERROR',
  Taken = 'TAKEN',
  Timeout = 'TIMEOUT',
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
    if (checkMethod !== CheckMethod.Standard && checkMethod !== CheckMethod.DNS && typeof bodyMatch !== 'string') {
      throw new Error(
        `bodyMatch is required for checkMethod "${checkMethod}" on service "${name}"`,
      );
    }
  }

  async check(nick: string): Promise<CheckResult> {
    const url = this.url.replace('{}', nick);

    try {
      const response = await this.httpClient(url);
      return this.parseResponse(response.status, response.body);
    } catch (e: unknown) {
      if (e instanceof TimeoutError) {
        return { status: AvailabilityStatus.Timeout, errorDetail: e.message };
      }
      const message = e instanceof Error ? e.message : String(e);
      return { status: AvailabilityStatus.Error, errorDetail: message };
    }
  }

  parseResponse(status: number, body?: string): CheckResult {
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

export class TimeoutError extends Error {
  constructor(ms: number) {
    super(`timeout after ${ms}ms`);
    this.name = 'TimeoutError';
  }
}
