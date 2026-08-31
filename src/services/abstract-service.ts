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

export enum UnverifiableReason {
  ClientRendered = 'CLIENT_RENDERED',
  BotProtected = 'BOT_PROTECTED',
  NotUsernameBased = 'NOT_USERNAME_BASED',
  WildcardDns = 'WILDCARD_DNS',
  NotInDns = 'NOT_IN_DNS',
}

export const unverifiableReasonText: Record<UnverifiableReason, string> = {
  [UnverifiableReason.ClientRendered]:
    'This platform builds profile pages in the browser and returns an identical response for every username, so an automated check cannot tell a free name from a taken one. Open the profile to see for yourself.',
  [UnverifiableReason.BotProtected]:
    'This platform puts automated requests behind a bot check, so it never returns the real profile page to us. Open the profile in your browser to see whether the name is taken.',
  [UnverifiableReason.NotUsernameBased]:
    'Profile URLs on this platform use numeric IDs or slugs rather than usernames, so a username cannot be looked up directly. Search the platform to check the name.',
  [UnverifiableReason.WildcardDns]:
    'This domain extension answers every lookup, registered or not, so a DNS check cannot tell whether a name is free. Check with a registrar instead.',
  [UnverifiableReason.NotInDns]:
    'These names live on a blockchain naming service rather than in public DNS, so a DNS lookup cannot see them. Check the naming service directly.',
};

export enum CheckMethod {
  Standard = 'STANDARD',
  BodyMatch = 'BODY_MATCH',
  NotFoundBodyMatch = 'NOT_FOUND_BODY_MATCH',
  DNS = 'DNS',
  NickInTitle = 'NICK_IN_TITLE',
  NickInOgTitle = 'NICK_IN_OG_TITLE',
  Unverifiable = 'UNVERIFIABLE',
  PresenceMatch = 'PRESENCE_MATCH',
  RedirectMatch = 'REDIRECT_MATCH',
  JsonApi = 'JSON_API',
  Rdap = 'RDAP',
}

interface ServiceBase {
  name: string;
  url: string;
  category: string;
  testAvailableNick?: string;
  testTakenNick?: string;
}

export type ServiceDefinition =
  | (ServiceBase & {
      checkMethod:
        | CheckMethod.Standard
        | CheckMethod.DNS
        | CheckMethod.NickInTitle
        | CheckMethod.NickInOgTitle
        | CheckMethod.Rdap;
      apiUrl?: string;
    })
  | (ServiceBase & {
      checkMethod: CheckMethod.BodyMatch | CheckMethod.NotFoundBodyMatch;
      bodyMatch: string;
      apiUrl?: string;
    })
  | (ServiceBase & {
      checkMethod: CheckMethod.PresenceMatch;
      presenceMatch: string;
      apiUrl?: string;
    })
  | (ServiceBase & { checkMethod: CheckMethod.RedirectMatch; redirectMatch: string })
  | (ServiceBase & { checkMethod: CheckMethod.JsonApi; apiUrl: string; jsonPath: string })
  | (ServiceBase & {
      checkMethod: CheckMethod.Unverifiable;
      unverifiableReason: UnverifiableReason;
    });

export interface ServiceOptions {
  presenceMatch?: string;
  redirectMatch?: string;
  apiUrl?: string;
  jsonPath?: string;
}

export interface HttpResponse {
  status: number;
  body: string;
  finalUrl?: string;
}

export type HttpClient = (url: string) => Promise<HttpResponse>;

const BLOCK_MARKERS = [
  'Just a moment...',
  'Attention Required! | Cloudflare',
  'cf-browser-verification',
  'Checking your browser before accessing',
  'Enable JavaScript and cookies to continue',
  'Request unsuccessful. Incapsula incident ID',
  'Access to this page has been denied',
  'Pardon Our Interruption',
];

export function isBlockedResponse(status: number, body?: string): boolean {
  if (status === 429) return true;
  if (status !== 403 && status !== 503) return false;
  if (typeof body !== 'string') return true;
  return BLOCK_MARKERS.some((marker) => body.includes(marker));
}

export function readJsonPath(json: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((value, key) => {
    if (value === null || value === undefined) return undefined;
    if (Array.isArray(value)) {
      const index = Number(key);
      return Number.isInteger(index) ? value[index] : undefined;
    }
    if (typeof value === 'object') return (value as Record<string, unknown>)[key];
    return undefined;
  }, json);
}

function isPresent(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'boolean') return value;
  return true;
}

export class AbstractService {
  private readonly presenceMatch?: string;
  private readonly redirectMatch?: string;
  private readonly apiUrl?: string;
  private readonly jsonPath?: string;

  constructor(
    private readonly httpClient: HttpClient,
    readonly name: string,
    readonly url: string,
    readonly category: string,
    readonly checkMethod: CheckMethod,
    readonly bodyMatch?: string | null,
    readonly unverifiableReason?: UnverifiableReason,
    options: ServiceOptions = {},
  ) {
    this.presenceMatch = options.presenceMatch;
    this.redirectMatch = options.redirectMatch;
    this.apiUrl = options.apiUrl;
    this.jsonPath = options.jsonPath;

    const needsBodyMatch =
      checkMethod === CheckMethod.BodyMatch || checkMethod === CheckMethod.NotFoundBodyMatch;
    if (needsBodyMatch && typeof bodyMatch !== 'string') {
      throw new Error(
        `bodyMatch is required for checkMethod "${checkMethod}" on service "${name}"`,
      );
    }

    if (checkMethod === CheckMethod.Unverifiable && !unverifiableReason) {
      throw new Error(`unverifiableReason is required for unverifiable service "${name}"`);
    }

    if (checkMethod === CheckMethod.PresenceMatch && typeof this.presenceMatch !== 'string') {
      throw new Error(`presenceMatch is required for service "${name}"`);
    }

    if (checkMethod === CheckMethod.RedirectMatch && typeof this.redirectMatch !== 'string') {
      throw new Error(`redirectMatch is required for service "${name}"`);
    }

    if (
      checkMethod === CheckMethod.JsonApi &&
      (typeof this.apiUrl !== 'string' || typeof this.jsonPath !== 'string')
    ) {
      throw new Error(`apiUrl and jsonPath are required for service "${name}"`);
    }
  }

  async check(nick: string): Promise<CheckResult> {
    if (this.checkMethod === CheckMethod.Unverifiable) {
      return {
        status: AvailabilityStatus.Unknown,
        errorDetail: unverifiableReasonText[this.unverifiableReason!],
      };
    }

    const target = (this.apiUrl ?? this.url).replace('{}', nick);

    try {
      const response = await this.httpClient(target);
      return this.parseResponse(response.status, response.body, nick, response.finalUrl);
    } catch (e: unknown) {
      if (e instanceof TimeoutError) {
        return { status: AvailabilityStatus.Timeout, errorDetail: e.message };
      }
      const message = e instanceof Error ? e.message : String(e);
      return { status: AvailabilityStatus.Error, errorDetail: message };
    }
  }

  parseResponse(status: number, body?: string, nick?: string, finalUrl?: string): CheckResult {
    const bodyContainsMatch =
      typeof body === 'string' &&
      typeof this.bodyMatch === 'string' &&
      body.includes(this.bodyMatch);

    if (this.checkMethod !== CheckMethod.DNS && isBlockedResponse(status, body)) {
      return {
        status: AvailabilityStatus.Error,
        errorDetail: `blocked by bot protection (HTTP ${status})`,
      };
    }

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

      case CheckMethod.Rdap: {
        if (status === 404) return { status: AvailabilityStatus.Available };
        if (status !== 200) {
          return { status: AvailabilityStatus.Error, errorDetail: `HTTP ${status}` };
        }
        try {
          const json = JSON.parse(body ?? '{}');
          return {
            status: typeof json.ldhName === 'string' || typeof json.handle === 'string'
              ? AvailabilityStatus.Taken
              : AvailabilityStatus.Available,
          };
        } catch {
          return { status: AvailabilityStatus.Error, errorDetail: 'RDAP parse error' };
        }
      }

      case CheckMethod.JsonApi: {
        if (status === 404) return { status: AvailabilityStatus.Available };
        if (status !== 200) {
          return { status: AvailabilityStatus.Error, errorDetail: `HTTP ${status}` };
        }
        try {
          const json = JSON.parse(body ?? '{}');
          return {
            status: isPresent(readJsonPath(json, this.jsonPath!))
              ? AvailabilityStatus.Taken
              : AvailabilityStatus.Available,
          };
        } catch {
          return { status: AvailabilityStatus.Error, errorDetail: 'JSON parse error' };
        }
      }

      case CheckMethod.RedirectMatch: {
        if (status === 404) return { status: AvailabilityStatus.Available };
        if (typeof finalUrl !== 'string') {
          return { status: AvailabilityStatus.Error, errorDetail: 'No final URL in response' };
        }
        const target = this.redirectMatch!;
        const landed = target.startsWith('http')
          ? finalUrl.replace(/\/$/, '') === target.replace(/\/$/, '')
          : finalUrl.includes(target);
        return {
          status: landed ? AvailabilityStatus.Available : AvailabilityStatus.Taken,
        };
      }

      case CheckMethod.Unverifiable:
        return {
          status: AvailabilityStatus.Unknown,
          errorDetail: unverifiableReasonText[this.unverifiableReason!],
        };

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

      case CheckMethod.PresenceMatch: {
        if (status === 404) return { status: AvailabilityStatus.Available };
        if (status !== 200) {
          return { status: AvailabilityStatus.Error, errorDetail: `HTTP ${status}` };
        }
        const marker = (this.presenceMatch ?? '').replace('{}', nick ?? '');
        return {
          status: typeof body === 'string' && body.includes(marker)
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
