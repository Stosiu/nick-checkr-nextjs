# NickCheckr

Check username availability across 200+ platforms instantly. One search, every platform.

**Live at [nickcheckr.stosiu.dev](https://nickcheckr.stosiu.dev)**

## What it does

Enter a username and NickCheckr checks availability across 208 services organized into 15 categories: Social Media, Developer, Content & Blogging, Creative & Design, Music & Audio, Video & Streaming, Gaming, Professional, Community, Finance & Crypto, Messaging, Education & Learning, Photography, Marketplace, and Fitness & Sports.

Results show up in real-time as each platform responds. Available usernames link directly to the signup page. Taken usernames link to the existing profile.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) with TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [TanStack React Query v5](https://tanstack.com/query) for async state
- [Framer Motion](https://motion.dev) for hero animations
- [nuqs](https://nuqs.47ng.com) for URL search state (`?nick=`)
- [Vitest](https://vitest.dev) for testing
- [pnpm](https://pnpm.io) as package manager
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/check/          # Username check API (rate-limited, cached)
│   ├── blog/               # Blog listing + RSS feed
│   ├── check/              # Per-platform SEO pages
│   └── page.tsx            # Homepage
├── components/             # React components
│   └── ui/                 # shadcn/ui primitives
├── services/               # Username checking engine
│   ├── abstract-service.ts # Base service with check methods
│   ├── nickname-checker.ts # Orchestrator singleton
│   └── data/services.ts    # 208 service definitions
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities (cache, fetch queue, blog processing)
├── config/                 # Site configuration
└── utils/                  # Rate limiter
```

## How checking works

Each service is defined with a URL pattern and a check method:

- **Standard** — expects 404 when a username is not found
- **BodyMatch** — returns 200 but the response body contains a specific string when not found
- **NotFoundBodyMatch** — returns non-200 and body contains a specific string when not found

The API route processes checks server-side with:
- In-memory TTL cache (30 min for success, 5 min for errors)
- Rate limiting per IP
- Client-side concurrency limited to 8 simultaneous requests via a fetch queue

## Adding a service

Add an entry to `src/services/data/services.ts`:

```typescript
{
  name: 'ServiceName',
  url: 'https://service.com/{username}',
  checkMethod: CheckMethod.Standard,
  category: 'Social Media',
  testAvailableNick: 'some_nick_that_doesnt_exist_xyz',
  testTakenNick: 'admin',
}
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run all tests |
| `pnpm typecheck` | TypeScript type checking |

## Blog

Blog posts live in `content/blog/<slug>/index.md` with frontmatter (title, date, tags, description, image). The blog supports search, tag filtering, pagination, table of contents, and social sharing.

## License

MIT
