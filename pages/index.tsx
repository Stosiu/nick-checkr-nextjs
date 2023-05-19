import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';

import { Layout } from '~/components/Layout';
import { useServicesNames } from '~/queries/useCheck';
import { NicknameCheckCard } from '~/components/NicknameCheckCard';

const Index: NextPage = () => {
  const { data } = useServicesNames();
  const [search, setSearch] = useState('stosiu');
  const [checkFor, setCheckFor] = useState('');

  const handleCheckClick = () => {
    if (search === '') return;

    setCheckFor(search);
  }

  return (
    <Layout>
      <NextSeo title='NickChekr - Check if you nick is taken!' />

      <div className='flex justify-center flex-col gap-4 py-8 px-4'>
        <h2 className='text-2xl md:text-4xl text-center'>Check if your nickname is available in {data?.length} services!</h2>

        <div className='flex flex-col md:flex-row gap-2 justify-center'>
          <input value={search} className='border rounded px-4 py-2 min-w-[300px]' placeholder='Nick to check' onChange={(e) => setSearch(e.target.value)}/>
          <button onClick={handleCheckClick} className='py-2 px-4 text-white bg-blue-800 rounded'>Check nickname</button>
        </div>

        {checkFor && (
          <div className='flex justify-center flex-col gap-2 md:max-w-6xl md:mx-auto'>
            <h3 className='text-lg md:text-2xl text-gray-700'>Results for {checkFor}</h3>
            <div className='grid grid-cols-2 :md:grid-cols-4 gap-4'>
              {data?.map((service) => (
                <NicknameCheckCard nickname={checkFor} service={service} key={service} />
              ))}
            </div>
          </div>
        )}
      </div>

    </Layout>
  );
};

export default Index;
