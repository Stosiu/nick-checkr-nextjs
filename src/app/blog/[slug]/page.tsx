import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Lightbulb } from 'lucide-react';
import { capitalize } from 'es-toolkit';
import { siteConfig } from '@/config/site';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog';
import { BlogContent } from '@/components/blog-content';
import { BlogProgress } from '@/components/blog-progress';
import { BlogToc } from '@/components/blog-toc';
import { ShareButtons } from '@/components/share-buttons';
import { RelatedPosts } from '@/components/related-posts';
import { HeaderPanel, PageContainer, Panel } from '@/components/page-shell';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description ?? post.content.slice(0, 160).replace(/\n/g, ' '),
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
      type: 'article',
      publishedTime: post.date,
      authors: [siteConfig.name],
      tags: post.tags,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description ?? undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((t) => ({ slug: t.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
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
    keywords: post.tags.join(', '),
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingTime}M`,
  };

  return (
    <PageContainer>
      <BlogProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeaderPanel className="max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/60 transition-all hover:border-white/[0.15] hover:text-white/70 xl:hidden"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Blog
        </Link>

        <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">{post.title}</h1>
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <time className="font-mono text-sm text-white/55">{post.date}</time>
          <span className="text-base text-white/55">&middot;</span>
          <span className="flex items-center gap-1.5 text-sm text-white/55">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} min read
          </span>
          <span className="hidden text-base text-white/55 sm:inline">&middot;</span>
          <span className="hidden font-mono text-sm text-white/55 sm:inline">
            {post.wordCount.toLocaleString()} words
          </span>
        </div>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
            >
              <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-xs text-white/60 transition-colors hover:border-white/[0.15] hover:text-white/60">
                {capitalize(tag)}
              </span>
            </Link>
          ))}
        </div>
        <ShareButtons url={url} title={post.title} />
      </HeaderPanel>

      <Panel>
        <article className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:items-start xl:gap-12">
          <div className="min-w-0">
            {post.tldr && (
              <div className="mb-10 rounded-lg border border-brand-400/20 bg-brand-400/[0.04] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-brand-400" />
                  <span className="text-sm font-semibold text-brand-400">TL;DR</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">{post.tldr}</p>
              </div>
            )}

            <BlogToc
              entries={post.toc}
              title={post.title}
              backHref="/blog"
              backLabel="Back to Blog"
            />
            <BlogContent
              html={post.html}
              coverImage={post.image}
              coverAlt={post.title}
              coverCaption={post.imageCaption ?? undefined}
            />
          </div>

          <BlogToc
            entries={post.toc}
            title={post.title}
            backHref="/blog"
            backLabel="Back to Blog"
            desktop
          />
        </article>
      </Panel>

      <RelatedPosts posts={await getRelatedPosts(slug, post.tags)} />
    </PageContainer>
  );
}
