import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { getServiceSlug, getServicesByCategory } from '@/lib/platform-utils';
import { services } from '@/services/data/services';

export const metadata: Metadata = {
  title: `Username Availability Checker — Check ${services.length}+ Platforms`,
  description: `Check if your username is available across ${services.length}+ platforms including Instagram, GitHub, Reddit, TikTok, and more. Free, instant results.`,
  alternates: { canonical: '/check' },
  openGraph: {
    title: `Username Availability Checker — Check ${services.length}+ Platforms`,
    description: `Check if your username is available across ${services.length}+ platforms. Free, instant results.`,
    url: '/check',
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function CheckIndexPage() {
  const grouped = getServicesByCategory();

  return (
    <div className="noise dot-grid">
      <div className="container mx-auto max-w-5xl space-y-12 px-4 py-12">
        <header className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Username <span className="text-brand-400">Availability Checker</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/50">
            Check if your desired username is available across {services.length}+
            platforms at once. Search social media, developer tools, gaming networks,
            creative portfolios, and more — all in one place.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Start checking now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <nav className="space-y-10">
          {[...grouped.entries()].map(([category, categoryServices]) => (
            <section
              key={category}
              id={category
                .toLowerCase()
                .replace(/\s+&\s+/g, '-')
                .replace(/\s+/g, '-')}
              className="space-y-3"
            >
              <h2 className="border-b border-white/[0.06] pb-2 text-lg font-bold text-white">
                {category}
                <span className="ml-2 text-sm font-normal text-white/30">
                  {categoryServices.length} platforms
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {categoryServices.map((service) => (
                  <Link
                    key={service.name}
                    href={`/check/${getServiceSlug(service.name)}`}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:border-brand-400/30 hover:text-white"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </nav>

        <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Check all {services.length} platforms at once
          </h2>
          <p className="text-white/40">
            Instead of checking each platform individually, NickCheckr scans every
            service simultaneously and shows you results in seconds.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Start checking
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
