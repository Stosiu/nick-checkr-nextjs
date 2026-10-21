import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, CircleDashed, XCircle } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { getCategorySlug, getServicesByCategory } from '@/lib/platform-utils';
import { CheckMethod } from '@/services';
import { services } from '@/services/data/services';

const domainCount = services.filter((s) => s.category === 'Domain Names').length;
const registryCount = services.filter((s) => s.category === 'Package Names').length;
const platformCount = services.length - domainCount - registryCount;
const unverifiableCount = services.filter((s) => s.checkMethod === CheckMethod.Unverifiable).length;

export const metadata: Metadata = {
  title: 'About',
  description: `NickCheckr checks a username across ${platformCount} platforms, ${domainCount} domain extensions and ${registryCount} package registries in one search. Open source, free, no account.`,
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: `One search across ${platformCount} platforms, ${domainCount} domain extensions and ${registryCount} package registries. Free and open source.`,
    url: '/about',
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${siteConfig.name}`,
    description: `One search across ${platformCount} platforms, ${domainCount} domain extensions and ${registryCount} package registries. Free and open source.`,
  },
  alternates: {
    canonical: '/about',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  description: `Username availability checker across ${services.length} platforms, domain extensions and package registries, organized by category.`,
  founder: {
    '@type': 'Person',
    name: 'stosiu',
    url: 'https://stosiu.dev',
  },
};

const linkClass =
  'text-brand-400 underline decoration-brand-400/40 underline-offset-4 transition-colors hover:decoration-brand-400';

const states = [
  {
    icon: CheckCircle2,
    label: 'Available',
    badgeClass: 'bg-brand-400/15 text-brand-400 border-brand-400/25',
    text: 'The platform says no profile exists under that name.',
  },
  {
    icon: XCircle,
    label: 'Taken',
    badgeClass: 'bg-red-400/15 text-red-400 border-red-400/25',
    text: 'A profile with that name exists.',
  },
  {
    icon: CircleDashed,
    label: "Can't verify",
    badgeClass: 'bg-white/[0.06] text-white/60 border-white/[0.08]',
    text: 'The platform shows the same page for every name or blocks automated checks, so the card links to the profile for you to open.',
  },
];

export default function AboutPage() {
  const categories = [...getServicesByCategory().entries()];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-3xl font-bold tracking-tight text-white mb-6 sm:text-4xl">
        About {siteConfig.name}
      </h1>

      <p className="text-lg text-white/70 leading-relaxed mb-12">
        A free, open-source tool that checks whether a username is free on {platformCount}{' '}
        platforms, {domainCount} domain extensions and {registryCount} package registries in
        one search. No account required.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4 mt-12">
        The username problem
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        You pick a username you like. It works on Twitter. Then you try
        Instagram and it is taken. Reddit? Taken. Discord? Also taken, but with
        a slightly different spelling. Before long you have six variations of
        the same name spread across a dozen platforms, and nobody can find you
        consistently.
      </p>
      <p className="text-white/70 leading-relaxed mb-4">
        Most people discover this the hard way: they pick a name on one
        platform, build an audience around it, and then realize the same name
        is gone everywhere else. By that point, rebranding means losing
        recognition. The better approach is to check availability everywhere
        before you commit to anything. That is what NickCheckr does.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4 mt-12">
        What NickCheckr does
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        Type a username into{' '}
        <Link href="/" className={linkClass}>
          the search bar
        </Link>{' '}
        and NickCheckr checks it everywhere at once. Results appear as each platform
        answers, and a full search finishes in about 20 seconds. Every card ends up in one
        of three states:
      </p>
      <ul className="mb-6 space-y-3">
        {states.map((state) => (
          <li key={state.label} className="flex items-start gap-3">
            <span
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${state.badgeClass}`}
            >
              <state.icon className="h-3.5 w-3.5" />
              {state.label}
            </span>
            <span className="text-white/70 leading-relaxed">{state.text}</span>
          </li>
        ))}
      </ul>
      <p className="text-white/70 leading-relaxed mb-4">
        {unverifiableCount} entries are marked &ldquo;Can&apos;t verify&rdquo; today, including
        Instagram, TikTok and Reddit. NickCheckr says so rather than guess. A card can also show
        an error when a site does not answer during your search; searching again usually
        clears it.
      </p>
      <p className="text-white/70 leading-relaxed mb-4">
        The {categories.length} categories let you focus on the platforms that matter to you. A
        game developer cares about Steam, Itch.io and Discord. A photographer cares about Flickr
        and Behance. Browse a category or{' '}
        <Link href="/check" className={linkClass}>
          the full list
        </Link>
        :
      </p>
      <ul className="mb-4 flex flex-wrap gap-2">
        {categories.map(([category, categoryServices]) => (
          <li key={category}>
            <Link
              href={`/check/category/${getCategorySlug(category)}`}
              prefetch={false}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-sm text-white/70 transition-colors hover:border-brand-400/30 hover:text-white"
            >
              {category}
              <span className="text-white/50">{categoryServices.length}</span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-white mb-4 mt-12">
        How it works under the hood
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        Each search opens one request to the NickCheckr server, which checks every platform,
        16 at a time, and streams each result back as it lands. Every platform has its own
        check. The most common one requests the profile URL and reads the HTTP status: a
        &ldquo;not found&rdquo; answer means the name is free. Platforms that answer the same
        way for every name are checked by looking for a marker in the page, the name in the page
        title, or a public API. Domain extensions are looked up in the registry&apos;s
        registration database (RDAP), which is more accurate than checking whether the domain
        resolves.
      </p>
      <p className="text-white/70 leading-relaxed mb-4">
        A failed check is retried twice before it shows as an error. Results are cached on the
        server, 30 minutes for a clear answer and 5 minutes for an error, so searching the same
        name again returns at once without asking the platforms again.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4 mt-12">
        {services.length} entries and counting
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        The list covers the obvious platforms like YouTube, X, Twitch, Discord and Bluesky, and
        dozens of niche ones that matter to specific communities. Developers will find GitHub,
        PyPI, Crates.io and Homebrew. Gamers get Steam, Xbox and Roblox. Designers can check
        Behance, Dribbble and Figma. Musicians can check SoundCloud and Bandcamp.
      </p>
      <p className="text-white/70 leading-relaxed mb-4">
        New platforms are added regularly. A platform can be added when its profiles have public
        URLs and a missing profile looks different from an existing one.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4 mt-12">
        Open source
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        NickCheckr is open source, and{' '}
        <a href={siteConfig.social.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
          the full codebase is on GitHub
        </a>
        . It is built with Next.js, TypeScript and Tailwind CSS. There are no ads and no
        accounts. Page views are counted with Vercel Web Analytics, which sets no cookies.
      </p>
      <p className="text-white/70 leading-relaxed mb-4">
        The project is built and maintained by{' '}
        <a href="https://stosiu.dev" target="_blank" rel="noopener noreferrer" className={linkClass}>
          stosiu
        </a>
        . If you find a wrong result, want to suggest a new platform, or have an idea, see{' '}
        <Link href="/contact" className={linkClass}>
          how to get in touch
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold text-white mb-4 mt-12">
        Learn more
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        The{' '}
        <Link href="/blog" className={linkClass}>
          NickCheckr blog
        </Link>{' '}
        covers username strategy, platform-specific guides, and ideas for
        picking the right handle. Topics range from what to do when your{' '}
        <Link href="/blog/username-already-taken" className={linkClass}>
          username is already taken
        </Link>{' '}
        to detailed breakdowns of character limits and naming rules on
        individual platforms.
      </p>

      <div className="mt-10 rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 text-center sm:mt-16 sm:p-8">
        <h2 className="text-2xl font-bold text-white mb-3">
          Ready to check your username?
        </h2>
        <p className="text-white/70 mb-6">
          One search across {services.length} platforms, domains and registries. Free, no signup.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-brand-400 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-brand-300"
        >
          Check a nickname
        </Link>
      </div>
    </div>
  );
}
