import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';

import { Layout } from '~/components/Layout';
import { NicknameCheckCard } from '~/components/NicknameCheckCard';
import { useServicesNames } from '~/queries/useCheck';

const Index: NextPage = () => {
  const { data } = useServicesNames();
  const [search, setSearch] = useState('stosiu');
  const [checkFor, setCheckFor] = useState('');

  const handleCheckClick = () => {
    if (search === '') {
      return;
    }

    setCheckFor(search);
  };

  return (
    <Layout>
      <NextSeo title='NickChekr - Check if you nick is taken!' />

      <div className='flex flex-col justify-center gap-4 px-4 py-8'>
        <h2 className='text-center text-2xl md:text-4xl'>
          Check if your nickname is available in {data?.length} services!
        </h2>

        <div className='flex flex-col justify-center gap-2 md:flex-row'>
          <input
            className='min-w-[300px] rounded border px-4 py-2'
            placeholder='Nick to check'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className='rounded bg-blue-800 px-4 py-2 text-white'
            onClick={handleCheckClick}
          >
            Check nickname
          </button>
        </div>

        {checkFor && (
          <div className='flex flex-col justify-center gap-2 md:mx-auto md:max-w-6xl'>
            <h3 className='text-lg text-gray-700 md:text-2xl'>
              Results for {checkFor}
            </h3>
            <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
              {data?.map((service) => (
                <NicknameCheckCard
                  key={service}
                  nickname={checkFor}
                  service={service}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
