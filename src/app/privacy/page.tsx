import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { services } from '@/services/data/services';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How NickCheckr handles your data when checking username availability across platforms.',
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      'How NickCheckr handles your data when checking username availability across platforms.',
    url: '/privacy',
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      'How NickCheckr handles your data when checking username availability across platforms.',
  },
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-white/50 mb-8">Effective March 2026</p>

      <p className="text-white/70 leading-relaxed mb-4">
        NickCheckr lets you check whether a username is available across {services.length}+
        platforms. This policy explains what data we handle, how we handle it,
        and what we don&apos;t do with it. We tried to keep this readable.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3 mt-8">
        What we collect
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        When you search for a username, we send that username to the platforms
        you&apos;re checking against. We don&apos;t permanently store the
        usernames you enter. Your IP address is used momentarily for rate
        limiting to prevent abuse, but we don&apos;t log or store IP addresses.
        We don&apos;t use cookies. We don&apos;t have user accounts, logins, or
        profiles. There is nothing to sign up for and nothing to track you with.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3 mt-8">
        How we use your data
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        The username you type in gets checked against each platform&apos;s
        public profile URL to determine availability. Results are cached in two
        ways. First, an in-memory cache on our server stores results temporarily
        so that repeated checks for the same username don&apos;t hit every
        platform again. This cache expires after 30 minutes. Second, we use
        Vercel Blob Storage for longer-term result caching to improve
        performance. The cached data contains only the username and its
        availability status per platform. No personal information is attached to
        these cached results.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3 mt-8">
        Third-party services
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        We use Vercel Analytics to understand general traffic patterns. Vercel
        Analytics is cookie-free and collects only anonymous, aggregated data. It
        does not track individual users or build profiles. We also use Vercel
        Blob Storage to cache username check results, as described above. Beyond
        these two Vercel services, we don&apos;t share your data with anyone.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3 mt-8">Cookies</h2>
      <p className="text-white/70 leading-relaxed mb-4">
        We don&apos;t use cookies. Not for analytics, not for tracking, not for
        anything. Vercel Analytics works without them, and we have no login
        system that would need session cookies.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3 mt-8">
        Data retention
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        In-memory cache entries expire after 30 minutes and are wiped whenever
        the server restarts. Blob cache stores results indefinitely but contains
        only username availability status, not personal information. There are no
        user records to retain or delete because we don&apos;t create any.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3 mt-8">
        Children&apos;s privacy
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        NickCheckr is not directed at children under 13. We don&apos;t knowingly
        collect information from children. Since we don&apos;t collect personal
        information from anyone, this is mostly a formality, but we want to be
        clear about it.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3 mt-8">
        External links
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        We link to third-party platforms throughout the site, both in check
        results and in blog posts. Once you follow a link to another site, their
        privacy policy applies, not ours. We recommend reading the privacy
        policies of any platform you visit through our links.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3 mt-8">
        Changes to this policy
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        We may update this policy if our practices change. We won&apos;t send
        you a notification because we don&apos;t have your email address. Check
        back here periodically if you want to stay informed.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3 mt-8">Contact</h2>
      <p className="text-white/70 leading-relaxed mb-4">
        If you have questions or concerns about this policy, email us at{' '}
        <a
          href="mailto:nickcheckr@stosiu.dev"
          className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
        >
          nickcheckr@stosiu.dev
        </a>
        .
      </p>
    </main>
  );
}
