import { describe, expect, it } from 'vitest';

import { AbstractService, AvailabilityStatus, CheckMethod, TimeoutError, type HttpClient } from '../abstract-service';

const noop: HttpClient = async () => ({ status: 200, body: '' });

describe('AbstractService.parseResponse', () => {
  describe('Standard check method', () => {
    const service = new AbstractService(noop, 'Test', 'https://example.com/{}', 'Test', CheckMethod.Standard);

    it('returns Available when status is 404', () => {
      expect(service.parseResponse(404)).toMatchObject({ status: AvailabilityStatus.Available });
    });

    it('returns Taken when status is 200', () => {
      expect(service.parseResponse(200)).toMatchObject({ status: AvailabilityStatus.Taken });
    });

    it('returns Error when status is 500', () => {
      expect(service.parseResponse(500)).toMatchObject({ status: AvailabilityStatus.Error });
    });

    it('returns Error when status is 403', () => {
      expect(service.parseResponse(403)).toMatchObject({ status: AvailabilityStatus.Error });
    });
  });

  describe('BodyMatch check method', () => {
    const service = new AbstractService(
      noop, 'Test', 'https://example.com/{}', 'Test',
      CheckMethod.BodyMatch, 'not found',
    );

    it('returns Available when body contains match string', () => {
      expect(service.parseResponse(200, 'user not found here')).toMatchObject({ status: AvailabilityStatus.Available });
    });

    it('returns Taken when body does not contain match string', () => {
      expect(service.parseResponse(200, 'welcome to profile')).toMatchObject({ status: AvailabilityStatus.Taken });
    });
  });

  describe('NotFoundBodyMatch check method', () => {
    const service = new AbstractService(
      noop, 'Test', 'https://example.com/{}', 'Test',
      CheckMethod.NotFoundBodyMatch, 'disabled',
    );

    it('returns Available when status != 200 and body contains match', () => {
      expect(service.parseResponse(404, 'account disabled')).toMatchObject({ status: AvailabilityStatus.Available });
    });

    it('returns Taken when status is 200', () => {
      expect(service.parseResponse(200, 'disabled')).toMatchObject({ status: AvailabilityStatus.Taken });
    });

    it('returns Taken when body does not contain match', () => {
      expect(service.parseResponse(404, 'something else')).toMatchObject({ status: AvailabilityStatus.Taken });
    });
  });

  describe('constructor validation', () => {
    it('throws when BodyMatch has no bodyMatch string', () => {
      expect(() => new AbstractService(noop, 'Test', 'url', 'Test', CheckMethod.BodyMatch)).toThrow();
    });

    it('throws when NotFoundBodyMatch has no bodyMatch string', () => {
      expect(() => new AbstractService(noop, 'Test', 'url', 'Test', CheckMethod.NotFoundBodyMatch)).toThrow();
    });

    it('does not throw for Standard without bodyMatch', () => {
      expect(() => new AbstractService(noop, 'Test', 'url', 'Test', CheckMethod.Standard)).not.toThrow();
    });
  });
});

describe('AbstractService.check', () => {
  it('returns Timeout on TimeoutError', async () => {
    const client: HttpClient = async () => { throw new TimeoutError(5000); };
    const service = new AbstractService(client, 'Test', 'https://example.com/{}', 'Test', CheckMethod.Standard);
    const result = await service.check('testuser');
    expect(result.status).toBe(AvailabilityStatus.Timeout);
    expect(result.errorDetail).toContain('timeout');
  });

  it('returns Error on unknown failure', async () => {
    const client: HttpClient = async () => { throw new Error('network error'); };
    const service = new AbstractService(client, 'Test', 'https://example.com/{}', 'Test', CheckMethod.Standard);
    const result = await service.check('testuser');
    expect(result.status).toBe(AvailabilityStatus.Error);
    expect(result.errorDetail).toBe('network error');
  });

  it('replaces {} in URL with nick', async () => {
    let calledUrl = '';
    const client: HttpClient = async (url) => { calledUrl = url; return { status: 200, body: '' }; };
    const service = new AbstractService(client, 'Test', 'https://example.com/{}', 'Test', CheckMethod.Standard);
    await service.check('myuser');
    expect(calledUrl).toBe('https://example.com/myuser');
  });
});

describe('PresenceMatch check method', () => {
  const service = new AbstractService(
    noop, 'Test', 'https://example.com/{}', 'Test',
    CheckMethod.PresenceMatch, undefined, undefined, { presenceMatch: 'profile-header' },
  );

  it('returns Taken when the marker is present', () => {
    expect(service.parseResponse(200, '<div class="profile-header">')).toMatchObject({
      status: AvailabilityStatus.Taken,
    });
  });

  it('returns Available when a 200 lacks the marker', () => {
    expect(service.parseResponse(200, '<div class="empty-state">')).toMatchObject({
      status: AvailabilityStatus.Available,
    });
  });

  it('substitutes the nick into the marker', () => {
    const perNick = new AbstractService(
      noop, 'Test', 'https://example.com/{}', 'Test',
      CheckMethod.PresenceMatch, undefined, undefined, { presenceMatch: '"username":"{}"' },
    );
    expect(perNick.parseResponse(200, '{"username":"alex"}', 'alex')).toMatchObject({
      status: AvailabilityStatus.Taken,
    });
    expect(perNick.parseResponse(200, '{"username":"someoneelse"}', 'alex')).toMatchObject({
      status: AvailabilityStatus.Available,
    });
  });

  it('throws when presenceMatch is missing', () => {
    expect(() => new AbstractService(noop, 'Test', 'url', 'Test', CheckMethod.PresenceMatch)).toThrow();
  });
});

describe('RedirectMatch check method', () => {
  const service = new AbstractService(
    noop, 'Test', 'https://example.com/{}', 'Test',
    CheckMethod.RedirectMatch, undefined, undefined, { redirectMatch: '/login' },
  );

  it('returns Available when the final URL matches the redirect target', () => {
    expect(service.parseResponse(200, '', 'alex', 'https://example.com/login?next=/alex')).toMatchObject({
      status: AvailabilityStatus.Available,
    });
  });

  it('returns Taken when the final URL is the profile itself', () => {
    expect(service.parseResponse(200, '', 'alex', 'https://example.com/alex')).toMatchObject({
      status: AvailabilityStatus.Taken,
    });
  });

  it('returns Error when the client reports no final URL', () => {
    expect(service.parseResponse(200, '', 'alex')).toMatchObject({ status: AvailabilityStatus.Error });
  });
});

describe('JsonApi check method', () => {
  const service = new AbstractService(
    noop, 'Test', 'https://example.com/{}', 'Test',
    CheckMethod.JsonApi, undefined, undefined,
    { apiUrl: 'https://api.example.com/users/{}', jsonPath: 'data.id' },
  );

  it('returns Taken when the path resolves to a value', () => {
    expect(service.parseResponse(200, '{"data":{"id":42}}')).toMatchObject({
      status: AvailabilityStatus.Taken,
    });
  });

  it('returns Available when the path is null', () => {
    expect(service.parseResponse(200, '{"data":null}')).toMatchObject({
      status: AvailabilityStatus.Available,
    });
  });

  it('returns Available when the path resolves to an empty string', () => {
    expect(service.parseResponse(200, '{"data":{"id":""}}')).toMatchObject({
      status: AvailabilityStatus.Available,
    });
  });

  it('returns Error on malformed JSON', () => {
    expect(service.parseResponse(200, 'not json')).toMatchObject({ status: AvailabilityStatus.Error });
  });

  it('probes apiUrl rather than the profile URL', async () => {
    let calledUrl = '';
    const client: HttpClient = async (url) => {
      calledUrl = url;
      return { status: 200, body: '{"data":{"id":1}}' };
    };
    const withClient = new AbstractService(
      client, 'Test', 'https://example.com/{}', 'Test',
      CheckMethod.JsonApi, undefined, undefined,
      { apiUrl: 'https://api.example.com/users/{}', jsonPath: 'data.id' },
    );
    await withClient.check('alex');
    expect(calledUrl).toBe('https://api.example.com/users/alex');
  });
});

describe('Rdap check method', () => {
  const service = new AbstractService(noop, '.com', 'https://rdap.example/{}.com', 'Domain Names', CheckMethod.Rdap);

  it('returns Taken when the registry returns a domain object', () => {
    expect(service.parseResponse(200, '{"objectClassName":"domain","ldhName":"TAKEN.COM"}')).toMatchObject({
      status: AvailabilityStatus.Taken,
    });
  });

  it('returns Available on 404', () => {
    expect(service.parseResponse(404, '')).toMatchObject({ status: AvailabilityStatus.Available });
  });

  it('returns Error when the registry rate-limits', () => {
    expect(service.parseResponse(429, '')).toMatchObject({ status: AvailabilityStatus.Error });
  });
});

describe('bot-protection guard', () => {
  it('reports Error rather than Taken when a BodyMatch service is challenged', () => {
    const service = new AbstractService(
      noop, 'Test', 'https://example.com/{}', 'Test', CheckMethod.BodyMatch, 'not found',
    );
    expect(service.parseResponse(403, '<title>Just a moment...</title>')).toMatchObject({
      status: AvailabilityStatus.Error,
    });
  });

  it('reports Error on 429 regardless of body', () => {
    const service = new AbstractService(
      noop, 'Test', 'https://example.com/{}', 'Test', CheckMethod.BodyMatch, 'not found',
    );
    expect(service.parseResponse(429, 'anything')).toMatchObject({ status: AvailabilityStatus.Error });
  });

  it('leaves a genuine 403 page alone when it carries no challenge marker', () => {
    const service = new AbstractService(
      noop, 'Test', 'https://example.com/{}', 'Test', CheckMethod.NotFoundBodyMatch, 'no such user',
    );
    expect(service.parseResponse(403, 'no such user')).toMatchObject({
      status: AvailabilityStatus.Available,
    });
  });

  it('does not apply to DNS responses', () => {
    const service = new AbstractService(noop, '.com', 'https://dns/{}', 'Domain Names', CheckMethod.DNS);
    expect(service.parseResponse(429, '{"Status":3}')).toMatchObject({
      status: AvailabilityStatus.Available,
    });
  });
});

describe('RedirectMatch with a homepage target', () => {
  const service = new AbstractService(
    noop, 'Test', 'https://example.com/{}', 'Test',
    CheckMethod.RedirectMatch, undefined, undefined, { redirectMatch: 'https://example.com/' },
  );

  it('does not treat a profile URL as the homepage just because it shares the prefix', () => {
    expect(service.parseResponse(200, '', 'alex', 'https://example.com/alex')).toMatchObject({
      status: AvailabilityStatus.Taken,
    });
  });

  it('returns Available when the request lands on the homepage itself', () => {
    expect(service.parseResponse(200, '', 'alex', 'https://example.com')).toMatchObject({
      status: AvailabilityStatus.Available,
    });
  });
});
