import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import qs from 'query-string';
import { AVAILABILITY_RESPONSE } from '~/services/nickname-checkers/service';

export const useCheck = (nick: string, service: string) => useQuery<AVAILABILITY_RESPONSE>(['check-nickname', nick, service], async () => {
  const params = qs.stringify({ nick, service });
  const { data } = await axios.get<AVAILABILITY_RESPONSE>(`/api/check?${params}`);

  return data;
}, {
  retry: false,
  staleTime: 1000 * 60 * 10,
});

export const useServicesNames = () => useQuery<string[]>(['services'], async () => {
  return await axios.get<string[]>('/api/services').then(({ data }) => data);
});
