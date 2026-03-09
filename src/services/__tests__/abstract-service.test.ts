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
