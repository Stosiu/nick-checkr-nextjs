import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import { siteConfig } from '@/config/site';
import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getCategoryDescription,
  getCategoryIcon,
  getCategorySlug,
  getPlatformIcon,
  getServiceSlug,
  getServicesInCategory,
  getAllCategories,
} from '@/lib/platform-utils';
import { services } from '@/services/data/services';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  const categoryServices = getServicesInCategory(category);
  const title = `${category} Username Checker — Check ${categoryServices.length} Platforms`;
  const description = `Check username availability across ${categoryServices.length} ${category.toLowerCase()} platforms. ${getCategoryDescription(category)}`;

  return {
    title,
    description,
    alternates: { canonical: `/check/category/${slug}` },
    openGraph: {
      title,
      description,
      url: `/check/category/${slug}`,
      siteName: siteConfig.name,
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

function CategoryJsonLd({
  category,
  slug,
  description,
  categoryServices,
}: {
  category: string;
  slug: string;
  description: string;
  categoryServices: { name: string }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category} Username Checker`,
    description,
    url: `${siteConfig.url}/check/category/${slug}`,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    numberOfItems: categoryServices.length,
    hasPart: categoryServices.map((s) => ({
      '@type': 'WebApplication',
      name: `${s.name} Username Checker`,
      url: `${siteConfig.url}/check/${getServiceSlug(s.name)}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryServices = getServicesInCategory(category);
  const CatIcon = getCategoryIcon(category);
  const description = getCategoryDescription(category);

  const otherCategories = getAllCategories().filter((c) => c !== category);

  return (
    <div className="noise dot-grid">
      <CategoryJsonLd
        category={category}
        slug={slug}
        description={description}
        categoryServices={categoryServices}
      />

      <div className="container mx-auto max-w-5xl space-y-8 px-4 py-6 sm:space-y-12 md:py-12">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Link href="/check" className="hover:text-white/60 transition-colors">
              All Platforms
            </Link>
            <span>/</span>
            <span className="text-white/60">{category}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-400/10 border border-brand-400/20">
              <CatIcon className="h-6 w-6 text-brand-400" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {category} <span className="text-brand-400">Username Checker</span>
            </h1>
          </div>

          <p className="max-w-2xl text-lg text-white/50">{description}</p>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Check all {services.length}+ platforms
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-sm text-white/30">
              {categoryServices.length} platforms in this category
            </span>
          </div>
        </header>

        <section className="space-y-3">
          <h2 className="border-b border-white/[0.06] pb-2 text-lg font-bold text-white">
            All {category} platforms
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categoryServices.map((service) => {
              const Icon = getPlatformIcon(service.name, service.category);
              return (
                <Link
                  key={service.name}
                  href={`/check/${getServiceSlug(service.name)}`}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:border-brand-400/30 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-white/30" />
                  {service.name}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center space-y-4 sm:p-8">
          <h2 className="text-2xl font-bold text-white">
            Why check {category.toLowerCase()} usernames?
          </h2>
          <p className="mx-auto max-w-xl text-white/40">
            {description} NickCheckr checks all {categoryServices.length}{' '}
            {category.toLowerCase()} platforms simultaneously so you can secure a
            consistent username across every service that matters to you.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Start checking
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="space-y-3">
          <h2 className="border-b border-white/[0.06] pb-2 text-lg font-bold text-white">
            Other categories
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {otherCategories.map((cat) => {
              const Icon = getCategoryIcon(cat);
              const count = getServicesInCategory(cat).length;
              return (
                <Link
                  key={cat}
                  href={`/check/category/${getCategorySlug(cat)}`}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:border-brand-400/30 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-white/30" />
                  <span className="truncate">{cat}</span>
                  <span className="ml-auto text-xs text-white/20">{count}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
