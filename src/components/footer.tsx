import { Github, Star } from 'lucide-react';
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
  { name: 'Social Media', slug: 'social-media' },
  { name: 'Developer', slug: 'developer' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'Creative & Design', slug: 'creative-design' },
  { name: 'Professional', slug: 'professional' },
  { name: 'Community', slug: 'community' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const quote = getQuote();
  const stars = process.env.GITHUB_STARS ? Number(process.env.GITHUB_STARS) : null;

  return (
    <footer className="mt-auto">
      <div className="glow-divider" />
      <div className="px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                Popular Checkers
              </h3>
              <ul className="space-y-1.5">
                {POPULAR_PLATFORMS.map((p) => (
                  <li key={p.slug}>
                    <Link
                      prefetch={false}
                      href={`/check/${p.slug}`}
                      className="text-xs text-white/55 transition-colors hover:text-white/85"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                Categories
              </h3>
              <ul className="space-y-1.5">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      prefetch={false}
                      href={`/check/category/${c.slug}`}
                      className="text-xs text-white/55 transition-colors hover:text-white/85"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                Resources
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    prefetch={false}
                    href="/check"
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    All Platforms
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/blog"
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/blog/feed.xml"
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    RSS Feed
                  </Link>
                </li>
                <li>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/llms.txt"
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    LLM API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                Company
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    prefetch={false}
                    href="/about"
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/contact"
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/status"
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    Status
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/changelog"
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                Legal
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    prefetch={false}
                    href="/privacy"
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/disclaimer"
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    Disclaimer
                  </Link>
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

            <a
              href={siteConfig.social.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-brand-400/30 hover:bg-white/[0.04] hover:text-white/80"
            >
              <Github className="h-3.5 w-3.5" aria-hidden />
              <span>Star on GitHub</span>
              {stars !== null && (
                <span className="flex items-center gap-1 border-l border-white/[0.08] pl-2 font-mono text-white/60 transition-colors group-hover:text-brand-400">
                  <Star className="h-3 w-3" aria-hidden />
                  {stars.toLocaleString()}
                </span>
              )}
            </a>

            <p className="text-xs text-white/55">
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
                className="text-white/60 transition-colors hover:text-white/85"
              >
                stosiu.dev
              </a>
            </p>

            <p className="font-mono text-[11px] italic text-white/50">
              &ldquo;{quote}&rdquo;
            </p>

            <p className="font-mono text-[11px] text-white/50">
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
