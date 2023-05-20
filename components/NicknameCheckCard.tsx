import { UseQueryResult } from '@tanstack/react-query';
import cx from 'classnames';
import random from 'lodash/random';
import startCase from 'lodash/startCase';
import { useMemo } from 'react';

import { useCheck } from '~/queries/useCheck';
import { AVAILABILITY_RESPONSE } from '~/services/nickname-checkers/service';

const computedText = (data: UseQueryResult<AVAILABILITY_RESPONSE>) => {
  if (data.isLoading) {
    return 'Loading...';
  }
  if (data.isError) {
    return 'Error';
  }
  if (data.data) {
    return startCase(data.data.toLowerCase());
  }

  return 'Taken';
};

const computedTextClass = (data: UseQueryResult<AVAILABILITY_RESPONSE>) => {
  if (data.isLoading) {
    return 'text-gray-600';
  }
  if (data.isError) {
    return 'text-red-600';
  }
  if (data && data.data === AVAILABILITY_RESPONSE.AVAILABLE) {
    return 'text-green-600';
  }

  return 'text-red-500';
};

const computedContainerClass = (
  data: UseQueryResult<AVAILABILITY_RESPONSE>
) => {
  if (data.isError) {
    return 'bg-red-200';
  }
  if (data.data && data.data !== AVAILABILITY_RESPONSE.AVAILABLE) {
    return 'bg-red-200';
  }
  if (data.data && data.data === AVAILABILITY_RESPONSE.AVAILABLE) {
    return 'bg-green-200';
  }

  return '';
};

interface Props {
  className?: string;
  nickname: string;
  service: string;
}

interface ComputedCardProps {
  containerClass: string;
  text: string;
  textClass: string;
}

export const NicknameCheckCard = ({ nickname, service, className }: Props) => {
  const data = useCheck(nickname, service);

  const generatedRandom = useMemo(() => random(-5, 50), []);
  const computed: ComputedCardProps = useMemo(() => {
    return {
      containerClass: computedContainerClass(data),
      text: computedText(data),
      textClass: computedTextClass(data),
    };
  }, [data]);

  return (
    <div
      className={cx(
        'flex flex-col border-2 border-gray-900 rounded-xl duration-200 px-4 p-2 md:p-4 transition-all transform-gpu',
        `hover:scale-105 ${
          generatedRandom < 0 ? '-' : ''
        }hover:rotate-[${Math.abs(generatedRandom)}deg]`,
        computed.containerClass,
        className
      )}
    >
      <h3 className='text-overflow-ellipsis text-gray-900 overflow-hidden whitespace-nowrap text-lg font-semibold md:text-xl'>
        {service}
      </h3>
      <p
        className={cx('text-xs md:text-sm transition-all', computed.textClass)}
      >
        {computed.text}
      </p>
    </div>
  );
};
