import axios, { AxiosInstance } from 'axios';

import { AVAILABILITY_RESPONSE, AbstractService } from './AbstractService';
import { servicesList } from './data/services-list';

class _NicknameCheckersService {
  services: AbstractService[];
  axios: AxiosInstance = axios.create({
    timeout: 10000,
    maxRedirects: 0,
  });

  constructor() {
    this.axios.interceptors.request.use((data) => {
      // @ts-ignore // TODO: fix this
      data.headers = {
        ...data.headers,
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US;q=1',
      };

      return data;
    });

    this.services = servicesList.map(data => (
      new AbstractService(this.axios, data.service, data.url, data.errorType, data.errorMsg)
    ));
  }

  getServicesNames(): string[] {
    return this.services.map(service => service.service);
  }

  checkIfAvailableInService(nick: string, service: string): Promise<AVAILABILITY_RESPONSE> {
    const serviceInstance = this.services.find(s => s.service === service);

    if (!serviceInstance) {
      throw new Error(`Service ${service} not found`);
    }

    return serviceInstance.checkIfAvailable(nick);
  }
}

const NicknameCheckersService = new _NicknameCheckersService();

export {
  NicknameCheckersService,
}
