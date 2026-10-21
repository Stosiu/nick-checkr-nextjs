import { Github, Mail } from 'lucide-react';

import { siteConfig } from '@/config/site';

const buttonClass =
  'inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:border-brand-400/30 hover:bg-brand-400/[0.06] hover:text-brand-400';

export function SuggestPlatform({ platform }: { platform?: string }) {
  const name = platform?.trim();
  const issueUrl = `${siteConfig.social.repo}/issues/new?${new URLSearchParams({
    title: `Platform request: ${name || '<platform>'}`,
    body: [
      `Platform: ${name ?? ''}`,
      'Profile URL format (e.g. https://example.com/@username):',
      'A username that exists there:',
    ].join('\n\n'),
  })}`;
  const mailUrl = `mailto:nickcheckr@stosiu.dev?subject=${encodeURIComponent(
    `Platform suggestion for NickCheckr${name ? `: ${name}` : ''}`,
  )}`;

  return (
    <div className="rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] px-5 py-6 text-center">
      <p className="mb-3 text-sm text-white/40">
        {name ? <>We don&apos;t check {name} yet. </> : <>Missing a platform? </>}
        Let us know and we&apos;ll add it.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <a href={issueUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          <Github className="h-4 w-4" />
          Request on GitHub
        </a>
        <a href={mailUrl} className={buttonClass}>
          <Mail className="h-4 w-4" />
          Suggest by email
        </a>
      </div>
    </div>
  );
}
