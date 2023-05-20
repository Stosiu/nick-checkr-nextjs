import { NicknameCheckerService } from './NicknameCheckerService';
import { servicesList } from './data/services-list';
import { AVAILABILITY_RESPONSE } from './AbstractService';

const FILTER_SERVICE: null | string = null;

describe('NicknameCheckersService', () => {
  servicesList.filter(s => (s._testTakenNickname || s._testAvailableNickname) && (!FILTER_SERVICE || s.service === FILTER_SERVICE)
  ).forEach(service => {
    if (service._testAvailableNickname) {
      it(`should correctly implement ${service.service} available logic`, async () => {
        const response = await NicknameCheckerService.checkIfAvailableInService(service._testAvailableNickname as string, service.service);
        expect(response).toBe(AVAILABILITY_RESPONSE.AVAILABLE);
      });
    }

    if (service._testTakenNickname) {
      it(`should correctly implement ${service.service} taken logic`, async () => {
        const response = await NicknameCheckerService.checkIfAvailableInService(service._testTakenNickname as string, service.service);
        expect(response).toBe(AVAILABILITY_RESPONSE.TAKEN);
      });
    }
  });
});
