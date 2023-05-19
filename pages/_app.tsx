import '~/styles/globals.css';
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import React from 'react';

import { QUERY_CLIENT, SITE_URL } from '~/constants';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // https://rishimohan.me/blog/nextjs-canonical-tag
  const canonicalUrl = `${SITE_URL}${
    router.asPath === '/' ? '' : router.asPath
  }`.split('?')[0];

  return (
    <>
      <NextSeo
        canonical={canonicalUrl}
        defaultTitle='NickCheckr | Is your nick available?'
        description='NickCheckr is a tool to check if your nick is available on the most popular social media platforms.'
        openGraph={{
          // images: [{ url: `${SITE_URL}/og-image-v2.jpg` }],
          locale: 'en_IE',
          siteName: 'NickCheckr',
          type: 'website',
          url: `${SITE_URL}${router.asPath === '/index' ? '' : router.asPath}`,
        }}
        title='NickCheckr | Is your nick available?'
        twitter={{ cardType: 'summary_large_image' }}
      />
      <Head>
        <meta charSet='utf-8' />
        <meta content='NickCheckr' name='author' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link
          href='/apple-touch-icon.png?v=JW3f2KRTWew4e45'
          rel='apple-touch-icon'
          sizes='180x180'
        />
        <link
          href='/favicon-32x32.png?v=JW3f2KRTWew4e45'
          rel='icon'
          sizes='32x32'
          type='image/png'
        />
        <link
          href='/favicon-16x16.png?v=JW3f2KRTWew4e45'
          rel='icon'
          sizes='16x16'
          type='image/png'
        />
        <link href='/site.webmanifest?v=JW3f2KRTWew4e45' rel='manifest' />
        <link href='/favicon-32x32.png?v=JW3f2KRTWew4e45' rel='mask-icon' />
        <link href='/favicon.ico?v=JW3f2KRTWew4e45' rel='shortcut icon' />
        <meta content='NickCheckr' name='apple-mobile-web-app-title' />
        <meta content='NickCheckr' name='application-name' />
        <meta content='#da532c' name='msapplication-TileColor' />
        <meta content='#ffffff' name='theme-color' />
        <link href='/favicon.ico' rel='shortcut icon' />
      </Head>

      <QueryClientProvider client={QUERY_CLIENT}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
