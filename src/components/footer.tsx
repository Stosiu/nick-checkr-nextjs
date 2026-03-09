import Link from 'next/link';

import { siteConfig } from '@/config/site';
const VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? '0.0.0';
const COMMIT_HASH =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'dev';

const FUNNY_QUOTES = [
  'If your nick is taken, you waited too long.',
  'xX_DarkSlayer_Xx was available. Just saying.',
  "Your nickname is unique. Just like everyone else's.",
  "Checked 75+ sites so you don't have to.",
  "stosiu was taken. That's how this started.",
  'The best username is the one nobody else wanted.',
  "admin/admin didn't work here either.",
  'First rule of NickCheckr: tell everyone about NickCheckr.',
];

function getQuote(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000,
  );
  return FUNNY_QUOTES[dayOfYear % FUNNY_QUOTES.length];
}

const POPULAR_PLATFORMS = [
  { name: 'Instagram', slug: 'instagram' },
  { name: 'TikTok', slug: 'tiktok' },
  { name: 'Twitter', slug: 'twitter' },
  { name: 'YouTube', slug: 'youtube' },
  { name: 'GitHub', slug: 'github' },
  { name: 'Reddit', slug: 'reddit' },
  { name: 'Twitch', slug: 'twitch' },
  { name: 'Snapchat', slug: 'snapchat' },
  { name: 'Steam', slug: 'steam' },
  { name: 'Bluesky', slug: 'bluesky' },
  { name: 'Spotify', slug: 'spotify' },
  { name: 'Pinterest', slug: 'pinterest' },
];

const CATEGORIES = [
  { name: 'Social Media', id: 'social-media' },
  { name: 'Developer', id: 'developer' },
  { name: 'Gaming', id: 'gaming' },
  { name: 'Creative & Design', id: 'creative-design' },
  { name: 'Professional', id: 'professional' },
  { name: 'Community', id: 'community' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const quote = getQuote();

  return (
    <footer className="mt-auto">
      <div className="glow-divider" />
      <div className="px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                Popular Checkers
              </h4>
              <ul className="space-y-1.5">
                {POPULAR_PLATFORMS.slice(0, 6).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/check/${p.slug}`}
                      className="text-xs text-white/30 transition-colors hover:text-white/60"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                More Platforms
              </h4>
              <ul className="space-y-1.5">
                {POPULAR_PLATFORMS.slice(6).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/check/${p.slug}`}
                      className="text-xs text-white/30 transition-colors hover:text-white/60"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                Categories
              </h4>
              <ul className="space-y-1.5">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/check#${c.id}`}
                      className="text-xs text-white/30 transition-colors hover:text-white/60"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                Resources
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/check"
                    className="text-xs text-white/30 transition-colors hover:text-white/60"
                  >
                    All Platforms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-xs text-white/30 transition-colors hover:text-white/60"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/feed.xml"
                    className="text-xs text-white/30 transition-colors hover:text-white/60"
                  >
                    RSS Feed
                  </Link>
                </li>
                <li>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/30 transition-colors hover:text-white/60"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-white/[0.06] pt-6 text-center">
            <p className="text-sm text-white/50">
              <span className="font-semibold text-white/70">
                {siteConfig.name}
              </span>
              <span className="mx-2 text-white/20">&middot;</span>
              Claim your identity everywhere.
            </p>

            <p className="text-xs text-white/30">
              &copy; {year}{' '}
              <a
                href="https://stosiu.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 transition-colors hover:text-brand-300"
              >
                stosiu
              </a>
              <span className="mx-2 text-white/15">&middot;</span>
              <a
                href="https://stosiu.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 transition-colors hover:text-white/60"
              >
                stosiu.dev
              </a>
            </p>

            <p className="font-mono text-[11px] italic text-white/20">
              &ldquo;{quote}&rdquo;
            </p>

            <p className="font-mono text-[10px] text-white/15">
              v{VERSION}
              <span className="mx-1.5">&middot;</span>
              {COMMIT_HASH}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
