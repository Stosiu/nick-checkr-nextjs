# NickCheckr

Username and domain availability checker across 460+ platforms, organized by category.

## Stack

- Next.js 16 (App Router) with TypeScript
- Tailwind CSS 4 + shadcn/ui (base-ui, not radix — `asChild` not supported on Button)
- TanStack React Query v5
- Framer Motion for hero animations
- nuqs for URL search state (`?nick=`)
- Vitest for testing
- pnpm as package manager
- Deployed on Vercel

## Project Structure

All source files live under `src/`:

- `src/app/` - Next.js App Router pages and API routes
- `src/app/api/check/` - Single check API with rate limiting + in-memory cache
- `src/app/api/check/stream/` - Streaming NDJSON endpoint used by the homepage; also persists results to Vercel Blob
- `src/components/` - React components (`ui/` for shadcn)
- `src/services/` - Nickname checking services (AbstractService pattern)
- `src/services/data/services.ts` - 701 services with categories (including 175 domain TLDs and 10 package registries)
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utilities: `cache.ts` (server cache), `check-store.ts` (client result store), `fetch-queue.ts` (client concurrency limiter), `blog.ts` (blog processing), `utils.ts` (shadcn `cn()`)
- `src/config/` - Site configuration
- `src/content/` - Changelog entries rendered by `/changelog`
- `src/utils/` - Rate limiter

## Commands

- `pnpm dev` - Start dev server
- `pnpm build` - Production build
- `pnpm test` - Run all tests
- `pnpm test src/services/__tests__/abstract-service.test.ts` - Run specific test
- `pnpm typecheck` - TypeScript type checking
- `pnpm probe` - Live health check of every service against real sites (network, slow, not part of `pnpm test`)
- `pnpm prune-blobs` - List blob results left behind by earlier service-list generations; add `--delete` to remove them

## Adding a New Service

Add an entry to `src/services/data/services.ts` following the `ServiceDefinition` interface. Each service requires a `category` field.

Categories: Social Media, Developer, Content & Blogging, Creative & Design, Music & Audio, Video & Streaming, Gaming, Professional, Community, Finance & Crypto, Messaging, Education & Learning, Photography, Marketplace, Fitness & Sports, Domain Names, Package Names, Q&A & Knowledge, Crowdfunding & Support, Newsletters, Link in Bio, Web3 & Decentralized, East Asia, Europe & Russia, Consoles & Esports, Security & Bug Bounty.

Check methods:
- `CheckMethod.Standard` - Returns 404 when username is not found
- `CheckMethod.BodyMatch` - Returns 200 but body contains a specific string when not found
- `CheckMethod.NotFoundBodyMatch` - Returns non-200 and body contains a specific string when not found
- `CheckMethod.DNS` - DNS-over-HTTPS via Cloudflare; NXDOMAIN (Status: 3) = available
- `CheckMethod.NickInTitle` - Page always returns 200; the profile exists when `<title>` contains the nick
- `CheckMethod.NickInOgTitle` - Same, using the `og:title` meta tag
- `CheckMethod.Unverifiable` - Platform serves an identical page for every username. Returns `AvailabilityStatus.Unknown` without making a request, and the UI shows "Can't verify"
- `CheckMethod.PresenceMatch` - Page always returns 200; the profile exists when the body contains `presenceMatch`. `{}` in the marker is replaced with the nick
- `CheckMethod.RedirectMatch` - A missing profile redirects elsewhere. `redirectMatch` starting with `http` must equal the final URL exactly; otherwise it is matched as a substring of it
- `CheckMethod.JsonApi` - Probes `apiUrl` instead of `url` and reads the dot-path `jsonPath`; a present, non-empty value means taken
- `CheckMethod.Rdap` - Domain registration lookup against the TLD's RDAP service; 404 = available. More accurate than DNS, which only reports whether a name resolves

`ServiceDefinition` is a discriminated union on `checkMethod`, so a missing `bodyMatch`, `presenceMatch`, `redirectMatch`, `apiUrl`/`jsonPath` or `unverifiableReason` is a type error rather than a runtime throw. `Standard` may also carry an optional `apiUrl` when the check is status-only but the card should link somewhere else.

A 403/503 carrying a Cloudflare or Incapsula challenge, or any 429, is reported as an error rather than being read as an answer.

Include `testAvailableNick` and `testTakenNick` for integration tests. `testTakenNick` must be a username that really exists on that platform — a wrong one makes the health probe report a permanent false failure. Omit it if no real account can be confirmed.

Service names must be unique; a duplicate silently breaks blob persistence and renders a duplicate card.

Before adding a service, confirm the URL discriminates: a random username must return 404 (or the body marker) while a real one returns 200. Many platforms use numeric IDs rather than usernames (Pixiv, Goodreads authors, Royal Road) and cannot be checked this way.

## Checking Service Health

`pnpm probe` runs every service against its own test fixtures over the live network and reports the pass rate. It is excluded from `pnpm test` (which is fully mocked and cannot detect upstream drift). Upstream sites change their 404 behaviour regularly, so run the probe before a release.

- `PROBE_ONLY="Twitch,Kick"` limits it to named services
- `PROBE_REPORT=/tmp/out.json` writes a per-fixture JSON report
- `PROBE_CONCURRENCY=10` tunes parallelism
- `PROBE_MIN_PASS_RATE=95` is the pass threshold the run asserts; set it to `0` when probing a subset

Probing at high concurrency makes upstream hosts rate-limit and answer 403/429, which reads as a permanent block. Before marking a service `Unverifiable` or deleting it, re-run just that service at `PROBE_CONCURRENCY=2`. `.github/workflows/probe.yml` runs the full probe weekly at concurrency 6.

## Path Alias

`@/*` maps to `src/` (e.g., `import { cn } from '@/lib/utils'`).

## Architecture Notes

- **Vercel Hobby limits**: serverless functions may not declare `maxDuration` above 60. A higher value builds fine locally and in GitHub Actions but fails the Vercel deploy at the `patchBuild` step with `invalid_max_duration`, so the site silently keeps serving the previous build. A full 701-service stream finishes in about 21 seconds, well inside the cap
- **Corepack on Vercel**: the project sets `ENABLE_EXPERIMENTAL_COREPACK=1` so Vercel honours `packageManager: pnpm@11.3.0`. Without it Vercel picks pnpm 9 by project creation date, and pnpm 9 rejects `pnpm-workspace.yaml` with "packages field missing or empty" because the file carries only `allowBuilds` and `overrides`
- **Streaming checks**: a search opens one request to `/api/check/stream`, which runs all upstream checks server-side (32 concurrent) and streams NDJSON results back as they land. One function invocation per search instead of one per platform. `src/lib/check-store.ts` holds results in an external store so each card re-renders only when its own result arrives; `src/hooks/use-check-stream.tsx` owns the stream and batches updates every 80ms
- **Single checks**: `/api/check` and `src/hooks/use-check.ts` remain for the one-off check on `/check/[platform]` pages
- **Request concurrency**: `src/lib/fetch-queue.ts` limits to 8 concurrent fetches, used by the single-check path
- **Server cache**: `src/lib/cache.ts` — in-memory TTL cache (30 min for success, 5 min for errors) to avoid redundant upstream requests
- **URL state**: nuqs manages `?nick=` param; requires Suspense boundary in `src/app/page.tsx`
- **Hero background**: Framer Motion parallax with mouse tracking, typing animation cycling through usernames. No canvas — pure DOM + GPU-composited transforms
- **Preview mode**: Before searching, categories show first 8 services as muted preview cards with "Show more" toggle; all expand during active search
- **Tooltips**: shadcn tooltip (base-ui) on error/timeout cards showing error details

## SEO Infrastructure

- `src/app/sitemap.ts` — Dynamic sitemap: homepage, `/check` index, all `/check/[platform]` pages, `/blog`, all blog posts
- `src/app/robots.ts` — Crawling rules + sitemap reference
- `src/app/blog/feed.xml/route.ts` — RSS 2.0 feed for blog posts
- `src/app/check/page.tsx` — Index listing all platforms by category (targets "username availability checker")
- `src/app/check/[platform]/page.tsx` — Per-platform SEO pages with `generateStaticParams`, platform info, username rules/tips, cross-links, JSON-LD
- `src/lib/platform-utils.ts` — Slug generation, service lookup, platform descriptions/rules data
- Homepage JSON-LD (WebApplication schema), `metadataBase`, canonical URLs, RSS `alternates`
- Footer has curated internal links: popular platform checkers, categories, resources
- Content strategy: `docs/plans/2026-03-09-content-strategy-design.md`

## Blog Pipeline

Blog posts live in `content/blog/<slug>/index.md` with frontmatter:

- `title` (required)
- `date` (required, YYYY-MM-DD)
- `tags` (array of strings)
- `description` (optional, used for SEO)
- `image` (optional, filename in `public/images/blog/<slug>/`)
- `imageCaption` (optional)
- `tldr` (optional, shown in highlight box)

Routes: `/blog` (listing with search/tags/pagination), `/blog/<slug>` (detail with TOC/share/related posts).

## Writing Blog Articles

Content strategy and topic list: `docs/plans/2026-03-09-content-strategy-design.md`

### Structure

- 1200-1800 words per article
- Frontmatter: title, date, tags, description, tldr, image
- `tldr` is a single paragraph shown in a highlight box — write it as a direct, useful summary, not a teaser
- Sentence case for all headings (capitalize only the first word and proper nouns)
- No intro fluff — open with the useful information or the direct answer
- Cover images go in `public/images/blog/<slug>/cover.jpg` (convert from PNG with `magick input.png -quality 85 -resize '1200x>' output.jpg`)

### Cross-linking rules

Every article must include:
1. At least one CTA linking to the homepage or a relevant `/check/[platform]` page
2. Links to 2-4 other blog posts using descriptive anchor text
3. First mention of a specific platform (Instagram, TikTok, etc.) links to `/check/[platform]`
4. One end-of-post CTA block linking to `https://nickcheckr.stosiu.dev`
5. No more than one link per paragraph

Link clusters (articles that should interlink):
- **Core:** username-already-taken, same-username-everywhere, username-character-limits, username-vs-display-name
- **Platform guides** link to character-limits and username-vs-display-name
- **Listicles** link to username-already-taken and same-username-everywhere

### Humanization (mandatory)

Use the `/humanizer` skill on every article. Key rules:
- No significance inflation ("testament", "pivotal", "vital role", "evolving landscape")
- No promotional language ("groundbreaking", "nestled", "vibrant", "stunning")
- No superficial -ing phrases ("highlighting", "underscoring", "showcasing")
- No negative parallelisms ("It's not just X; it's Y")
- No rule-of-three patterns forced for symmetry
- No em dash overuse — prefer commas or periods
- No bold-header bullet lists (`**Speed:** explanation`) — write prose or plain bullets
- No generic positive conclusions ("the future looks bright")
- No filler phrases ("In order to", "It is important to note", "At its core")
- No copula avoidance — use "is/are/has" instead of "serves as/stands as/boasts"
- Use straight quotes, not curly quotes
- Vary sentence length. Short sentences are fine. So are longer ones that take their time.
- Have opinions where appropriate. Don't just report — react.

### Date spacing

Space article dates at least 3-5 days apart. Don't publish everything on the same date. Use dates that feel organic (not all Mondays, not perfectly evenly spaced).

### Published articles (with dates)

| Slug | Date | Image |
|------|------|-------|
| username-already-taken | 2026-02-18 | cover.jpg |
| same-username-everywhere | 2026-02-24 | cover.jpg |
| username-character-limits | 2026-03-01 | cover.jpg |
| username-vs-display-name | 2026-03-05 | cover.jpg |
| change-instagram-username | 2026-03-08 | cover.jpg |
| tiktok-username-rules | 2026-03-12 | cover.jpg |
| youtube-custom-url | 2026-03-16 | cover.jpg |
| get-verified-social-media | 2026-03-19 | cover.jpg |
| reddit-username-rules | 2026-03-23 | cover.jpg |
| discord-username-guide | 2026-03-27 | cover.jpg |
| aesthetic-username-ideas | 2026-03-31 | cover.jpg |
| gaming-username-ideas | 2026-04-04 | cover.jpg |
| professional-username-ideas | 2026-04-08 | cover.jpg |
| funny-tiktok-usernames | 2026-04-12 | cover.jpg |
| matching-usernames-couples | 2026-04-16 | cover.jpg |
| most-common-usernames | 2026-04-20 | cover.jpg |
| username-black-market | 2026-04-24 | cover.jpg |

When adding new articles, pick dates that continue from the last published date (2026-04-16) with 3-5 day gaps.

## Design System

Dark theme matching stosiu.dev: Inter + JetBrains Mono fonts, emerald green accent (brand-400 = #34d399), dot-grid background, noise texture overlay, oklch color space. Always dark mode (no light mode toggle).
