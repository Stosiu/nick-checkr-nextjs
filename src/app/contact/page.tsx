import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with the ${siteConfig.name} team. Reach out about general inquiries, advertising, guest posts, or bug reports.`,
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description: `Get in touch with the ${siteConfig.name} team. Reach out about general inquiries, advertising, guest posts, or bug reports.`,
    url: '/contact',
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact Us | ${siteConfig.name}`,
    description: `Get in touch with the ${siteConfig.name} team. Reach out about general inquiries, advertising, guest posts, or bug reports.`,
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const githubIssuesUrl = `${siteConfig.social.github}/nick-checkr-nextjs/issues`;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
        Contact us
      </h1>
      <p className="mb-10 text-lg text-white/60">
        Whether you have a question, want to collaborate, or found something
        broken, we want to hear from you. Pick the channel that fits your needs
        below.
      </p>

      <div className="space-y-6">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="mb-2 text-xl font-semibold text-white">
            General inquiries
          </h2>
          <p className="text-white/60">
            Have a question about {siteConfig.name}, want to suggest a platform
            we should add, or just want to say hello? Drop us a line at{' '}
            <a
              href="mailto:nickcheckr@stosiu.dev"
              className="text-brand-400 hover:text-brand-300"
            >
              nickcheckr@stosiu.dev
            </a>
            . We read every message.
          </p>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="mb-2 text-xl font-semibold text-white">
            Advertising & partnerships
          </h2>
          <p className="text-white/60">
            If you are interested in sponsoring {siteConfig.name}, running a
            campaign, or exploring a partnership, we are open to the
            conversation. Reach out at{' '}
            <a
              href="mailto:nickcheckr@stosiu.dev?subject=[ADVERTISING] Partnership Inquiry - NickCheckr"
              className="text-brand-400 hover:text-brand-300"
            >
              nickcheckr@stosiu.dev
            </a>{' '}
            with details about what you have in mind.
          </p>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="mb-2 text-xl font-semibold text-white">
            Write for us
          </h2>
          <p className="text-white/60">
            We publish articles about usernames, online identity, and platform
            tips. If you have a topic that fits and you can write clearly without
            filler, send your pitch to{' '}
            <a
              href="mailto:nickcheckr@stosiu.dev?subject=[GUEST POST] Submission - NickCheckr"
              className="text-brand-400 hover:text-brand-300"
            >
              nickcheckr@stosiu.dev
            </a>
            . Include a brief outline and a link to something you have written
            before.
          </p>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="mb-2 text-xl font-semibold text-white">
            Bug reports & feedback
          </h2>
          <p className="text-white/60">
            Found a service that is returning wrong results, or something else
            that is not working right? The fastest way to report it is through
            our{' '}
            <a
              href={githubIssuesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300"
            >
              GitHub issues page
            </a>
            . You can also email us if you prefer, but GitHub lets us track and
            respond to issues more efficiently.
          </p>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="mb-2 text-xl font-semibold text-white">
            Response time
          </h2>
          <p className="text-white/60">
            We typically reply within 1-2 business days. For bug reports filed
            on GitHub, you will usually get a response faster since we monitor
            the repository closely.
          </p>
        </div>
      </div>
    </div>
  );
}
