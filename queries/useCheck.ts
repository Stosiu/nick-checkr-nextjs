import axios from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import qs from 'query-string';
import { AVAILABILITY_RESPONSE } from '~/services/AbstractService';

export const useCheck = (nick: string, service: string, options?: UseQueryOptions<AVAILABILITY_RESPONSE>) => useQuery<AVAILABILITY_RESPONSE>(['check-nickname', nick, service], async () => {
  const params = qs.stringify({ nick, service });
  const { data } = await axios.get<AVAILABILITY_RESPONSE>(`/api/check?${params}`);

  return data;
}, {
  retry: false,
  staleTime: 1000 * 60 * 10,
  ...options,
});
