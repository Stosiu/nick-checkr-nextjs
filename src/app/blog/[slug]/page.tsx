import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Lightbulb } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getThoughtBySlug, getAllThoughts, getRelatedThoughts } from '@/lib/thoughts';
import { ThoughtContent } from '@/components/thought-content';
import { ThoughtProgress } from '@/components/thought-progress';
import { ThoughtToc } from '@/components/thought-toc';
import { ShareButtons } from '@/components/share-buttons';
import { RelatedThoughts } from '@/components/related-thoughts';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);
  if (!thought) return {};

  const url = `${siteConfig.url}/blog/${slug}`;
  return {
    title: thought.title,
    description: thought.description ?? thought.content.slice(0, 160).replace(/\n/g, ' '),
    openGraph: {
      title: thought.title,
      description: thought.description ?? undefined,
      type: 'article',
      publishedTime: thought.date,
      authors: [siteConfig.name],
      tags: thought.tags,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: thought.title,
      description: thought.description ?? undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const thoughts = await getAllThoughts();
  return thoughts.map((t) => ({ slug: t.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);
  if (!thought) notFound();

  const url = `${siteConfig.url}/blog/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: thought.title,
    description: thought.description,
    datePublished: thought.date,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    url,
    keywords: thought.tags.join(', '),
    wordCount: thought.wordCount,
    timeRequired: `PT${thought.readingTime}M`,
  };

  return (
    <div className="noise dot-grid">
      <ThoughtProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-6xl px-4 pb-20 pt-12 xl:grid xl:grid-cols-[1fr_14rem] xl:items-start xl:gap-10">
        <div className="min-w-0">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/40 transition-all hover:border-white/[0.15] hover:text-white/70 xl:hidden"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Blog
          </Link>

          <h1 className="mb-3 text-3xl font-bold">{thought.title}</h1>
          <div className="mb-4 flex items-center gap-3">
            <time className="font-mono text-sm text-white/30">{thought.date}</time>
            <span className="text-base text-white/30">&middot;</span>
            <span className="flex items-center gap-1.5 text-sm text-white/30">
              <Clock className="h-3.5 w-3.5" />
              {thought.readingTime} min read
            </span>
            <span className="text-base text-white/30">&middot;</span>
            <span className="font-mono text-sm text-white/30">
              {thought.wordCount.toLocaleString()} words
            </span>
          </div>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {thought.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
              >
                <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-xs text-white/40 transition-colors hover:border-white/[0.15] hover:text-white/60">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <div className="mb-8">
            <ShareButtons url={url} title={thought.title} />
          </div>

          {thought.tldr && (
            <div className="mb-10 rounded-lg border border-brand-400/20 bg-brand-400/[0.04] p-4">
              <div className="mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-brand-400" />
                <span className="text-sm font-semibold text-brand-400">TL;DR</span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">{thought.tldr}</p>
            </div>
          )}

          <ThoughtToc
            entries={thought.toc}
            title={thought.title}
            backHref="/blog"
            backLabel="Back to Blog"
          />
          <ThoughtContent
            html={thought.html}
            coverImage={thought.image}
            coverAlt={thought.title}
            coverCaption={thought.imageCaption ?? undefined}
          />
          <RelatedThoughts thoughts={await getRelatedThoughts(slug, thought.tags)} />
        </div>

        <ThoughtToc
          entries={thought.toc}
          title={thought.title}
          backHref="/blog"
          backLabel="Back to Blog"
          desktop
        />
      </article>
    </div>
  );
}
