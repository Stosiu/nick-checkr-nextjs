import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';

import { CopyEmail } from '@/components/copy-email';
import { PageShell, Panel } from '@/components/page-shell';
import { siteConfig } from '@/config/site';

const email = 'nickcheckr@stosiu.dev';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Report a wrong result, suggest a platform, or get in touch about ${siteConfig.name}, advertising or guest posts.`,
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Report a wrong result, suggest a platform, or get in touch about ${siteConfig.name}, advertising or guest posts.`,
    url: '/contact',
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact | ${siteConfig.name}`,
    description: `Report a wrong result, suggest a platform, or get in touch about ${siteConfig.name}, advertising or guest posts.`,
  },
  alternates: {
    canonical: '/contact',
  },
};

const issueBody = [
  'Username searched:',
  'Platform:',
  'What NickCheckr showed (Available / Taken / Can\'t verify / Error):',
  'What is actually true, and how you know:',
].join('\n\n');

const issueUrl = `${siteConfig.social.repo}/issues/new?${new URLSearchParams({
  title: 'Wrong result: <platform>',
  body: issueBody,
})}`;

const topics = [
  {
    label: 'General question or platform suggestion',
    subject: `Question - ${siteConfig.name}`,
    text: 'Questions about how NickCheckr works, or a platform you would like added.',
  },
  {
    label: 'Advertising and partnerships',
    subject: `[ADVERTISING] Partnership Inquiry - ${siteConfig.name}`,
    text: 'Sponsorship, campaigns or a partnership. Include what you have in mind.',
  },
  {
    label: 'Write for the blog',
    subject: `[GUEST POST] Submission - ${siteConfig.name}`,
    text: 'Articles about usernames, online identity and platforms. Send a short outline and a link to something you have written.',
  },
];

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      intro={
        <p>
          {siteConfig.name} is built and maintained by one person,{' '}
          <Link
            href="/about"
            className="text-brand-400 underline decoration-brand-400/40 underline-offset-4 transition-colors hover:decoration-brand-400"
          >
            stosiu
          </Link>
          . Most messages are about a result that looks wrong, so that comes first. I usually reply
          within 1-2 business days.
        </p>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="flex flex-col border-brand-400/20 bg-brand-400/[0.04]">
          <h2 className="mb-3 text-2xl font-bold text-white">A wrong result or a bug</h2>
          <p className="mb-6 max-w-xl text-white/70 leading-relaxed">
            If a card says a name is available when it is taken, or the other way round, open an
            issue. The form asks for the username, the platform, what NickCheckr showed and what is
            actually true, which is everything needed to fix the check.
          </p>
          <div className="mt-auto space-y-4">
            <a
              href={issueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-400 px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-brand-300"
            >
              <Github className="h-4 w-4" />
              Report on GitHub
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-sm text-white/60">
              No GitHub account? Email the same details to {email}.
            </p>
          </div>
        </Panel>

        <Panel>
          <h2 className="mb-5 text-2xl font-bold text-white">Everything else, by email</h2>
          <CopyEmail email={email} />
          <ul className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {topics.map((topic) => (
              <li key={topic.label}>
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent(topic.subject)}`}
                  className="group flex items-start justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block font-medium text-white transition-colors group-hover:text-brand-400">
                      {topic.label}
                    </span>
                    <span className="mt-1 block text-sm text-white/60">{topic.text}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-brand-400" />
                </a>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </PageShell>
  );
}
