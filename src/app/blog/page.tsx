import type { Metadata } from 'next';
import { Suspense } from 'react';
import { siteConfig } from '@/config/site';
import { omit } from 'es-toolkit';
import { getAllPosts } from '@/lib/blog';
import { BlogList } from '@/components/blog-list';
import { PageShell } from '@/components/page-shell';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips and guides on usernames, online identity, and the platforms we use.',
  openGraph: {
    title: `Blog — ${siteConfig.name}`,
    description: 'Tips and guides on usernames, online identity, and the platforms we use.',
    type: 'website',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog — ${siteConfig.name}`,
    description: 'Tips and guides on usernames, online identity, and the platforms we use.',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog',
    description: 'Tips and guides on usernames, online identity, and the platforms we use.',
    url: `${siteConfig.url}/blog`,
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    hasPart: posts.map((post) => ({
      '@type': 'Article',
      headline: post.title,
      datePublished: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    })),
  };

  return (
    <PageShell
      title="Blog"
      intro={<p>Tips and guides on usernames, online identity, and the platforms we use.</p>}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Suspense>
        <BlogList posts={posts.map((post) => omit(post, ['content']))} />
      </Suspense>
    </PageShell>
  );
}
