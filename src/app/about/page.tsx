import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `About ${siteConfig.name}`,
  description:
    'NickCheckr checks username availability across 200+ platforms in seconds. Open source, built for anyone who wants a consistent online identity.',
  openGraph: {
    title: `About ${siteConfig.name}`,
    description:
      'Check username availability across 200+ platforms instantly. Free, open source, and fast.',
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `About ${siteConfig.name}`,
    description:
      'Check username availability across 200+ platforms instantly. Free, open source, and fast.',
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  description:
    'Username availability checker across 200+ platforms, organized by category.',
  founder: {
    '@type': 'Person',
    name: 'stosiu',
    url: 'https://stosiu.dev',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
        About {siteConfig.name}
      </h1>

      <p className="text-lg text-white/70 leading-relaxed mb-12">
        A free, open-source tool that checks whether your desired username is
        available across 208 platforms. One search, real-time results, no
        account required.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4 mt-12">
        The username problem
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        You pick a username you like. It works on Twitter. Then you try
        Instagram and it is taken. Reddit? Taken. Discord? Also taken, but with
        a slightly different spelling. Before long you have six variations of
        the same name spread across a dozen platforms, and nobody can find you
        consistently. This is a genuinely annoying problem, and it gets worse
        the more platforms you use.
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
        <Link href="/" className="text-brand-400 hover:underline">
          the search bar
        </Link>{' '}
        and NickCheckr checks it against 208 services simultaneously. Results
        come back in real time as each platform responds. Green means
        available. Red means taken. You get a clear picture in seconds instead
        of opening 20 browser tabs and checking each site manually.
      </p>
      <p className="text-white/70 leading-relaxed mb-4">
        The platforms are organized into 15 categories: Social Media, Developer,
        Gaming, Creative &amp; Design, Music &amp; Audio, Video &amp; Streaming,
        Content &amp; Blogging, Professional, Community, Finance &amp; Crypto,
        Messaging, Education &amp; Learning, Photography, Marketplace, and
        Fitness &amp; Sports. You can browse the full list on the{' '}
        <Link href="/check" className="text-brand-400 hover:underline">
          all platforms
        </Link>{' '}
        page. Categories help you focus on the platforms that matter to your use
        case. A game developer cares about Steam, Itch.io, and Discord. A
        photographer cares about 500px, Flickr, and Instagram. You do not need
        to scroll through 208 results when only 30 are relevant to you.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4 mt-12">
        How it works under the hood
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        Each service has a defined check method. The most common approach is
        hitting the platform&apos;s profile URL and looking at the HTTP status code.
        A 404 means the username is not taken. Some platforms always return 200,
        so NickCheckr looks for specific strings in the response body that
        indicate the profile does not exist. A few platforms return non-200
        status codes with body content that needs parsing.
      </p>
      <p className="text-white/70 leading-relaxed mb-4">
        Requests run in parallel with concurrency limits so your browser does
        not choke. Server-side caching means repeated checks for the same
        username return instantly without hitting upstream platforms again.
        Successful results are cached for 30 minutes and errors for 5 minutes.
        The whole thing is fast enough that you get most results within a few
        seconds of hitting search.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4 mt-12">
        208 services and counting
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        The service list covers the obvious platforms like Instagram, TikTok,
        YouTube, Twitter, Reddit, and Discord. It also covers dozens of niche
        platforms that matter to specific communities. Developers will find
        GitHub, GitLab, npm, PyPI, Crates.io, and Homebrew. Gamers get Steam,
        Xbox, PlayStation Network, Epic Games, and Roblox. Creative
        professionals can check Behance, Dribbble, DeviantArt, and Figma.
        Musicians can check SoundCloud, Spotify, and Bandcamp.
      </p>
      <p className="text-white/70 leading-relaxed mb-4">
        New services get added regularly. If a platform has public profile URLs
        and a way to detect whether a username exists, it can be added to the
        list. The check method pattern is straightforward enough that adding a
        new service takes minutes, not hours.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4 mt-12">
        Open source
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        NickCheckr is open source. The full codebase is public. It is built
        with Next.js, TypeScript, Tailwind CSS, and React Query. No tracking,
        no ads, no account walls. You type a name and get results. That is it.
      </p>
      <p className="text-white/70 leading-relaxed mb-4">
        The project is built and maintained by{' '}
        <a
          href="https://stosiu.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-400 hover:underline"
        >
          stosiu
        </a>
        . If you find a broken service, want to suggest a new platform, or have
        ideas for improvements, the GitHub repository is the place to do that.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4 mt-12">
        Learn more
      </h2>
      <p className="text-white/70 leading-relaxed mb-4">
        The{' '}
        <Link href="/blog" className="text-brand-400 hover:underline">
          NickCheckr blog
        </Link>{' '}
        covers username strategy, platform-specific guides, and ideas for
        picking the right handle. Topics range from what to do when your{' '}
        <Link
          href="/blog/username-already-taken"
          className="text-brand-400 hover:underline"
        >
          username is already taken
        </Link>{' '}
        to detailed breakdowns of character limits and naming rules on
        individual platforms.
      </p>

      <div className="mt-16 rounded-lg border border-white/[0.06] bg-white/[0.02] p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Ready to check your username?
        </h2>
        <p className="text-white/70 mb-6">
          Search across 208 platforms in seconds. Free, no signup required.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-brand-400 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-brand-300"
        >
          Try NickCheckr
        </Link>
      </div>
    </div>
  );
}
