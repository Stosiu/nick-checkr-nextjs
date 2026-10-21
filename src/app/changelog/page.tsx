import type { Metadata } from 'next';

import { PageShell, Panel } from '@/components/page-shell';
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
  changed: 'bg-white/[0.06] text-white/70 border-white/[0.08]',
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
    <PageShell
      title="Changelog"
      intro={<p>Platform additions, accuracy fixes, and performance work on {siteConfig.name}.</p>}
    >
      <Panel className="divide-y divide-white/[0.06] py-0 md:py-0">
        {changelog.map((entry) => (
          <section
            key={entry.version}
            className="grid gap-4 py-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12 md:py-12"
          >
            <div className="md:sticky md:top-24 md:self-start">
              <h2 className="font-mono text-xl font-semibold text-white">v{entry.version}</h2>
              <time dateTime={entry.date} className="mt-1 block text-sm text-white/60">
                {formatDate(entry.date)}
              </time>
            </div>

            <div className="max-w-3xl space-y-4">
              <p className="leading-relaxed text-white/70">{entry.summary}</p>

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
            </div>
          </section>
        ))}
      </Panel>
    </PageShell>
  );
}
