import { AxiosInstance, AxiosRequestConfig, isAxiosError } from 'axios';
import isString from 'lodash/isString';

const REQUEST_OPTIONS: AxiosRequestConfig = {
  timeout: 5000,
};

export enum AVAILABILITY_RESPONSE {
  AVAILABLE = 'AVAILABLE',
  TAKEN = 'TAKEN',
  TIMEOUT = 'TIMEOUT',
  ERROR = 'ERROR'
}

export enum ErrorType {
  STANDARD = 'STANDARD', // returns HTTP 4xx response when the username is not taken
  NOT_STANDARD = 'NON-STANDARD', // still returns HTTP 2xx when the username is not taken, so we check the response body for errorMsg
  UNIQUE = 'UNIQUE', // returns HTTP 4xx if the username is not taken or disabled. Since disabled usernames cannot be taken again, we check the response body.
}

export interface ServiceData  {
  service: string;
  url: string;
  errorType: ErrorType;
  errorMsg: null | string;
}

export class AbstractService<T = any> implements ServiceData {
  constructor(
    readonly axios: AxiosInstance,
    readonly service: string,
    readonly url: string,
    readonly errorType: ErrorType,
    readonly errorMsg: null | string,
  ) {
    if(errorType === ErrorType.UNIQUE && !isString(errorMsg)) {
      throw new Error(`errorMsg must be a string when errorType is ${ErrorType.UNIQUE} for ${service}`);
    }

    if(errorType === ErrorType.NOT_STANDARD && !isString(errorMsg)) {
      throw new Error(`errorMsg must be a string when errorType is ${ErrorType.NOT_STANDARD} for ${service}`);
    }
  }

  async checkIfAvailable(nick: string): Promise<AVAILABILITY_RESPONSE> {
    const url = this.url.replace('{}', nick);
    console.log(`🎣 Checking ${nick} on ${this.service}`)

    try {
      const data = await this.axios<T>(url, REQUEST_OPTIONS);
      const res = this.parseIsAvailableResponse(data.status, data.data);

      return res ? AVAILABILITY_RESPONSE.AVAILABLE : AVAILABILITY_RESPONSE.TAKEN;
    } catch (e: unknown) {
      if (isAxiosError(e) && e.response) {
        const res = this.parseIsAvailableResponse(e.response.status, e.response.data);

        return res ? AVAILABILITY_RESPONSE.AVAILABLE : AVAILABILITY_RESPONSE.TAKEN;
      }

      if (e instanceof Error && e.message.includes('timeout')) {
        return AVAILABILITY_RESPONSE.TIMEOUT;
      }

      console.error(`🤬 Error checking ${nick} on ${this.service} - ${e instanceof Error ? e.message : 'unknown error'}`)

      throw e;
    }
  }

  parseIsAvailableResponse(status: number, body?: unknown): boolean {
    const doesBodyContainErrorMsg = Boolean(isString(body) && this.errorMsg && body.includes(this.errorMsg));

    switch (this.errorType) {
      case ErrorType.UNIQUE:
        return status !== 200 && doesBodyContainErrorMsg;
      case ErrorType.NOT_STANDARD:
        return doesBodyContainErrorMsg;
      default:
        return status !== 200;
    }
  }
}
