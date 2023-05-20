import { NextPage } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';

import { Layout } from '~/components/Layout';
import { NicknameCheckCard } from '~/components/NicknameCheckCard';
import Girl from '~/public/images/girl.jpg';
import { NicknameCheckersService } from '~/services/nickname-checkers';

const Index: NextPage<{ services: string[] }> = ({ services }) => {
  const [search, setSearch] = useState('');
  const [checkFor, setCheckFor] = useState<string | null>(null);

  const handleCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === '') {
      return;
    }

    setCheckFor(search);
  };

  return (
    <Layout>
      <NextSeo title='NickChekr - uncover your nickname availability on 100+ websites' />

      <div className='flex flex-col justify-center gap-4 pt-4 md:pt-8'>
        <div className='bg-white'>
          <div className='mx-auto max-w-7xl'>
            <div className='relative isolate overflow-hidden rounded-3xl bg-gray-900 px-6 py-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:py-0'>
              <svg
                aria-hidden='true'
                className='pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0'
                viewBox='0 0 1024 1024'
              >
                <circle
                  cx='512'
                  cy='512'
                  fill='url(#759c1415-0410-454c-8f7c-9a820de03641)'
                  fillOpacity='0.9'
                  r='512'
                />
                <defs>
                  <radialGradient id='759c1415-0410-454c-8f7c-9a820de03641'>
                    <stop stopColor='#ffffff' />
                    <stop offset='1' stopColor='#ffffff' />
                  </radialGradient>
                </defs>
              </svg>
              <div className='mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left'>
                <h2 className='text-3xl font-bold text-white sm:text-4xl'>
                  Uncover the availability of Your Nickname on 100+ websites
                  instantly.
                </h2>
                <p className='mt-6 text-lg leading-8 text-gray-300'>
                  Effortlessly scan numerous websites: discover if your desired
                  nickname is taken across a vast array of online platforms.
                </p>
                <div className='mt-10 flex items-center justify-center gap-2 lg:justify-start'>
                  {checkFor ? (
                    <div>
                      <div className='text-sm leading-6 text-white'>
                        See results for <b>{checkFor}</b> below
                      </div>
                      <button
                        className='m-0 text-xs text-white underline'
                        onClick={() => {
                          setCheckFor(null);
                          setSearch('');
                        }}
                      >
                        Check different nickname
                      </button>
                    </div>
                  ) : (
                    <form
                      className='flex flex-col gap-2 md:flex-row'
                      onSubmit={handleCheck}
                    >
                      <input
                        className='min-w-[200px] rounded-md border px-4 py-2 text-sm md:max-w-[220px]'
                        placeholder='Nick to check'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />

                      <button
                        className='whitespace-nowrap rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50'
                        disabled={search === ''}
                        type='submit'
                      >
                        Check availability
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <Image
                alt='Girl'
                className='pointer-events-none absolute right-8 top-1/2 hidden w-[32rem] max-w-none -translate-y-1/2 rounded-lg bg-white/5 object-cover ring-4 ring-white/10 md:block'
                placeholder='blur'
                src={Girl}
              />
            </div>
          </div>
        </div>

        {checkFor && (
          <div className='flex flex-col justify-center gap-2 md:mx-auto md:max-w-7xl'>
            <div className='grid grid-cols-2 gap-3 md:grid-cols-6'>
              {services.map((service) => (
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

export const getStaticProps = async () => {
  return {
    props: {
      services: NicknameCheckersService.getServicesNames(),
    },
  };
};

export default Index;
