import type { Metadata } from 'next';
import { Suspense } from 'react';
import { siteConfig } from '@/config/site';
import { getAllThoughts } from '@/lib/thoughts';
import { ThoughtsList } from '@/components/thoughts-list';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on usernames, online identity, and the platforms we use.',
  openGraph: {
    title: `Blog — ${siteConfig.name}`,
    description: 'Thoughts on usernames, online identity, and the platforms we use.',
    type: 'website',
    url: `${siteConfig.url}/blog`,
  },
};

export default async function BlogPage() {
  const thoughts = await getAllThoughts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog',
    description: 'Thoughts on usernames, online identity, and the platforms we use.',
    url: `${siteConfig.url}/blog`,
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    hasPart: thoughts.map((thought) => ({
      '@type': 'Article',
      headline: thought.title,
      datePublished: thought.date,
      url: `${siteConfig.url}/blog/${thought.slug}`,
    })),
  };

  return (
    <div className="noise dot-grid">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-12">
        <h1 className="mb-2 text-3xl font-bold">Blog</h1>
        <p className="mb-8 text-sm text-white/40">
          Thoughts on usernames, online identity, and the platforms we use.
        </p>
        <Suspense>
          <ThoughtsList thoughts={thoughts} />
        </Suspense>
      </div>
    </div>
  );
}
