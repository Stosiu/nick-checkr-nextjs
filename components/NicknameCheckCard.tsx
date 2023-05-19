import cx from 'classnames';
import startCase from 'lodash/startCase';

import { useCheck } from '~/queries/useCheck';
import { AVAILABILITY_RESPONSE } from '~/services/nickname-checkers/service';

interface Props {
  className?: string;
  nickname: string;
  service: string;
}

export const NicknameCheckCard = ({ nickname, service, className }: Props) => {
  const { data, isLoading, isError } = useCheck(nickname, service);

  const status = () => {
    if (isLoading) {
      return 'Loading...';
    }
    if (isError) {
      return 'Error';
    }
    if (data) {
      return startCase(data);
    }

    return 'Taken';
  };

  const statusClass = () => {
    if (isLoading) {
      return 'text-gray-500';
    }
    if (isError) {
      return 'text-red-500';
    }
    if (data && data === AVAILABILITY_RESPONSE.AVAILABLE) {
      return 'text-green-500';
    }

    return 'text-red-500';
  };

  return (
    <div
      className={cx(
        'flex flex-col border rounded-xl px-4 p-2 md:p-4',
        className
      )}
    >
      <h3 className='text-lg md:text-2xl'>{service}</h3>
      <p className={cx('text-xs md:text-sm', statusClass())}>{status()}</p>
    </div>
  );
};
