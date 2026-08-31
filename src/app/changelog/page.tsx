import type { Metadata } from 'next';

import { changelog } from '@/content/changelog';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Changelog',
  description: `What has changed in ${siteConfig.name}: new platforms, check accuracy improvements, and performance work.`,
  openGraph: {
    title: `Changelog — ${siteConfig.name}`,
    description: `What has changed in ${siteConfig.name}: new platforms, check accuracy improvements, and performance work.`,
    url: '/changelog',
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: '/changelog',
  },
};

const kindStyles = {
  added: 'bg-brand-400/15 text-brand-400 border-brand-400/25',
  fixed: 'bg-yellow-400/15 text-yellow-400 border-yellow-400/25',
  changed: 'bg-white/[0.06] text-white/50 border-white/[0.08]',
} as const;

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ChangelogPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-16">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Changelog</h1>
      <p className="mb-12 text-lg leading-relaxed text-white/50">
        Platform additions, accuracy fixes, and performance work on {siteConfig.name}.
      </p>

      <div className="space-y-12">
        {changelog.map((entry) => (
          <section key={entry.version} className="space-y-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-white/[0.06] pb-3">
              <h2 className="font-mono text-xl font-semibold text-white">v{entry.version}</h2>
              <time dateTime={entry.date} className="text-sm text-white/35">
                {formatDate(entry.date)}
              </time>
            </div>

            <p className="leading-relaxed text-white/60">{entry.summary}</p>

            <ul className="space-y-3">
              {entry.changes.map((change) => (
                <li key={change.text} className="flex gap-3">
                  <span
                    className={`mt-0.5 h-fit shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${kindStyles[change.kind]}`}
                  >
                    {change.kind}
                  </span>
                  <span className="text-sm leading-relaxed text-white/70">{change.text}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
