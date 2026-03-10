import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, ChevronDown, ExternalLink, Globe, HelpCircle, Lightbulb, ShieldCheck, XCircle } from 'lucide-react';

import { PlatformCheck } from '@/components/platform-check';
import { siteConfig } from '@/config/site';
import {
  getAllServiceSlugs,
  getCategoryDescription,
  getCategoryIcon,
  getCategorySlug,
  getPlatformIcon,
  getPlatformInfo,
  getServiceBySlug,
  getServiceSlug,
  getServicesInCategory,
  getServicesByCategory,
} from '@/lib/platform-utils';
import { services } from '@/services/data/services';

interface Props {
  params: Promise<{ platform: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((platform) => ({ platform }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform } = await params;
  const service = getServiceBySlug(platform);
  if (!service) return {};

  const title = `${service.name} Username Checker — Is Your Name Available?`;
  const description = `Check if your desired username is available on ${service.name}. Instant results, no signup required. Also check ${services.length - 1} other platforms.`;

  return {
    title,
    description,
    alternates: { canonical: `/check/${platform}` },
    openGraph: {
      title,
      description,
      url: `/check/${platform}`,
      siteName: siteConfig.name,
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function PlatformPage({ params }: Props) {
  const { platform } = await params;
  const service = getServiceBySlug(platform);
  if (!service) notFound();

  const info = getPlatformInfo(service.name);
  const categoryServices = getServicesInCategory(service.category).filter(
    (s) => s.name !== service.name,
  );
  const allCategories = getServicesByCategory();
  const profileUrl = service.url.replace('{}', 'username');

  const PlatformIcon = getPlatformIcon(service.name, service.category);

  const faqItems = [
    {
      question: `How do I check if a ${service.name} username is available?`,
      answer: `Enter your desired username in the NickCheckr search bar. It checks ${service.name} along with ${services.length - 1} other platforms simultaneously and shows you instant results.`,
    },
    {
      question: `Can I change my ${service.name} username later?`,
      answer: info.tips,
    },
    {
      question: `What characters are allowed in a ${service.name} username?`,
      answer: info.rules,
    },
    {
      question: `What if my desired ${service.name} username is already taken?`,
      answer: `Try adding numbers, underscores, or abbreviations. You can also check which of the other ${services.length - 1} platforms still have your preferred name available.`,
    },
  ];

  // JSON-LD uses only static trusted data from service definitions and site config
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${service.name} Username Checker`,
    description: `Check username availability on ${service.name}`,
    url: `${siteConfig.url}/check/${platform}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="noise dot-grid">
      <script
        type="application/ld+json"
        // JSON-LD uses only static trusted data from service definitions and site config
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        // FAQ JSON-LD uses only static trusted data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="container mx-auto max-w-5xl space-y-12 px-4 py-12">
        {/* Hero */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Link href="/check" className="hover:text-white/60 transition-colors">
              All Platforms
            </Link>
            <span>/</span>
            <Link
              href={`/check/category/${getCategorySlug(service.category)}`}
              className="hover:text-white/60 transition-colors"
            >
              {service.category}
            </Link>
            <span>/</span>
            <span className="text-white/60">{service.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
              <PlatformIcon className="h-7 w-7 text-brand-400" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {service.name}{' '}
              <span className="text-brand-400">Username Checker</span>
            </h1>
          </div>

          <p className="max-w-2xl text-lg text-white/50">
            Instantly check if your desired username is available on {service.name}.
            No signup needed — just type and search across {services.length}+ platforms at once.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/?nick=`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Check on {service.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white/50 transition-colors hover:text-white/70"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Visit {service.name}
            </a>
          </div>
        </header>

        {/* Quick single-service check */}
        <PlatformCheck serviceName={service.name} totalPlatforms={services.length} />

        {/* Platform info cards */}
        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
              <div className="flex items-center gap-2 text-brand-400">
                <Globe className="h-4 w-4" />
                <h3 className="text-sm font-semibold">About {service.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/40">{info.description}</p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
              <div className="flex items-center gap-2 text-brand-400">
                <ShieldCheck className="h-4 w-4" />
                <h3 className="text-sm font-semibold">Username rules</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/40">{info.rules}</p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
              <div className="flex items-center gap-2 text-brand-400">
                <Lightbulb className="h-4 w-4" />
                <h3 className="text-sm font-semibold">Tips</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/40">{info.tips}</p>
            </div>
          </div>
        </section>

        {/* Why your username matters */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            Why your {service.name} username matters
          </h2>
          <div className="space-y-3 text-white/50">
            <p>
              Your {service.name} username is more than a login credential. It is the name
              people see when they find your profile, the handle they use to mention or tag you,
              and often part of your profile URL. A good username is short, recognizable, and
              consistent with the name you use on other platforms.
            </p>
            <p>
              Securing the same username across multiple services protects your online identity
              and makes it harder for impersonators to claim your name. Use NickCheckr to
              check {service.name} alongside {services.length - 1} other platforms in a single search.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            How to check {service.name} username availability
          </h2>
          <ol className="list-inside list-decimal space-y-2 text-white/50">
            <li>
              Enter your desired username in the{' '}
              <Link href="/" className="text-brand-400 hover:underline">
                search bar
              </Link>
            </li>
            <li>
              NickCheckr checks {service.name} along with {services.length - 1} other
              platforms simultaneously
            </li>
            <li>See instant results — green means available, red means taken</li>
            <li>
              If the name is taken on {service.name}, try variations or check which
              other platforms still have it
            </li>
          </ol>
        </section>

        {/* What to do if taken */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            What to do if your {service.name} username is taken
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <div>
                <h3 className="text-sm font-semibold text-white">Try variations</h3>
                <p className="text-sm text-white/40">
                  Add underscores, numbers, or abbreviate parts of your name. A period or
                  underscore between words can work well.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <div>
                <h3 className="text-sm font-semibold text-white">Add context</h3>
                <p className="text-sm text-white/40">
                  Append your profession, location, or a keyword related to your content.
                  For example: alex_design, alex.nyc, or alexcodes.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <div>
                <h3 className="text-sm font-semibold text-white">Check other platforms first</h3>
                <p className="text-sm text-white/40">
                  Your preferred name might be available elsewhere. NickCheckr shows you
                  all {services.length} platforms at once so you can pick the best option.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/20" />
              <div>
                <h3 className="text-sm font-semibold text-white">Avoid these</h3>
                <p className="text-sm text-white/40">
                  Do not add long strings of random numbers, use excessive special characters,
                  or pick a name that is hard to spell or remember.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <summary className="flex cursor-pointer items-center gap-3 p-4 text-sm font-medium text-white/70 hover:text-white transition-colors [&::-webkit-details-marker]:hidden [&::marker]:hidden">
                  <HelpCircle className="h-4 w-4 shrink-0 text-brand-400" />
                  <span className="flex-1">{item.question}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-white/30 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="px-4 pb-4 pl-11 text-sm leading-relaxed text-white/40">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Same category */}
        {categoryServices.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">
              More {service.category} platforms
            </h2>
            <p className="text-sm text-white/40">
              {getCategoryDescription(service.category)}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {categoryServices.map((s) => {
                const Icon = getPlatformIcon(s.name, s.category);
                return (
                  <Link
                    key={s.name}
                    href={`/check/${getServiceSlug(s.name)}`}
                    className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:border-brand-400/30 hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-white/30" />
                    {s.name}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Other categories */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Browse by category</h2>
          <div className="flex flex-wrap gap-2">
            {[...allCategories.entries()]
              .filter(([cat]) => cat !== service.category)
              .map(([category, catServices]) => {
                const CatIcon = getCategoryIcon(category);
                return (
                  <Link
                    key={category}
                    href={`/check/category/${getCategorySlug(category)}`}
                    className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-sm text-white/50 transition-colors hover:border-white/[0.12] hover:text-white/70"
                  >
                    <CatIcon className="h-3.5 w-3.5 text-white/30" />
                    {category}{' '}
                    <span className="text-white/25">({catServices.length})</span>
                  </Link>
                );
              })}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Check all {services.length} platforms at once
          </h2>
          <p className="text-white/40">
            Why check one platform at a time? NickCheckr scans {services.length}+
            websites simultaneously so you can secure your username everywhere.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Start checking
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </article>
    </div>
  );
}
