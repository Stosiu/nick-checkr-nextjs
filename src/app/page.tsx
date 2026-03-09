import type { Metadata } from 'next';
import { Suspense } from 'react';

import { siteConfig } from '@/config/site';
import { nicknameChecker } from '@/services/nickname-checker';
import { services } from '@/services/data/services';

import { HomeContent } from './home-content';

export const metadata: Metadata = {
  title: `NickCheckr | Check username availability across ${services.length}+ platforms`,
  description: `Check if your nickname is available on ${services.length}+ websites instantly. Scan social media, developer platforms, gaming, and more — all at once.`,
  alternates: { canonical: '/' },
};

export default function Home() {
  const serviceEntries = nicknameChecker.getServiceEntries();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    description: `Check if your nickname is available on ${services.length}+ websites instantly.`,
    url: siteConfig.url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense>
        <HomeContent services={serviceEntries} />
      </Suspense>
    </>
  );
}
