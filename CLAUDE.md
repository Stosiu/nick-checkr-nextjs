# NickCheckr

Username and domain availability checker across 400+ platforms, organized by category.

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
- `src/app/api/check/` - Check API with rate limiting + in-memory cache
- `src/components/` - React components (`ui/` for shadcn)
- `src/services/` - Nickname checking services (AbstractService pattern)
- `src/services/data/services.ts` - 412 services with categories (including 30 domain TLDs)
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utilities: `cache.ts` (server cache), `fetch-queue.ts` (client concurrency limiter), `blog.ts` (blog processing), `utils.ts` (shadcn `cn()`)
- `src/config/` - Site configuration
- `src/utils/` - Rate limiter

## Commands

- `pnpm dev` - Start dev server
- `pnpm build` - Production build
- `pnpm test` - Run all tests
- `pnpm test src/services/__tests__/abstract-service.test.ts` - Run specific test
- `pnpm typecheck` - TypeScript type checking

## Adding a New Service

Add an entry to `src/services/data/services.ts` following the `ServiceDefinition` interface. Each service requires a `category` field.

Categories: Social Media, Developer, Content & Blogging, Creative & Design, Music & Audio, Video & Streaming, Gaming, Professional, Community, Finance & Crypto, Messaging, Education & Learning, Photography, Marketplace, Fitness & Sports, Domain Names.

Check methods:
- `CheckMethod.Standard` - Returns 404 when username is not found
- `CheckMethod.BodyMatch` - Returns 200 but body contains a specific string when not found
- `CheckMethod.NotFoundBodyMatch` - Returns non-200 and body contains a specific string when not found
- `CheckMethod.DNS` - DNS-over-HTTPS via Cloudflare; NXDOMAIN (Status: 3) = available

Include `testAvailableNick` and `testTakenNick` for integration tests.

## Path Alias

`@/*` maps to `src/` (e.g., `import { cn } from '@/lib/utils'`).

## Architecture Notes

- **Request concurrency**: `src/lib/fetch-queue.ts` limits to 8 concurrent fetches to avoid flooding the browser during checks
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
4. One end-of-post CTA block linking to `https://nickcheckr.com`
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

When adding new articles, pick dates that continue from the last published date (2026-04-16) with 3-5 day gaps.

## Design System

Dark theme matching stosiu.dev: Inter + JetBrains Mono fonts, emerald green accent (brand-400 = #34d399), dot-grid background, noise texture overlay, oklch color space. Always dark mode (no light mode toggle).
