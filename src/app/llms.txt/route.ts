import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# NickCheckr

> Check username availability across 200+ platforms instantly.

NickCheckr is a free, open-source tool that checks whether a username (nickname) is available on 208+ online platforms across 15 categories: Social Media, Developer, Gaming, Creative & Design, Music & Audio, Video & Streaming, Professional, Community, Finance & Crypto, Messaging, Education & Learning, Photography, Marketplace, Fitness & Sports, and Content & Blogging.

## How It Works

Enter a username and NickCheckr checks all 208 platforms in parallel. Each platform is checked by requesting the public profile URL — if the platform returns a 404 or a "not found" indicator, the username is available. Results are cached and shown in real-time as they come in.

## API

NickCheckr provides a JSON API for checking username availability:

### Check a single service
GET https://nickcheckr.com/api/check?nick={username}&service={serviceName}

Returns one of: "AVAILABLE", "TAKEN", "ERROR", "TIMEOUT"

### Get cached results (all services)
GET https://nickcheckr.com/api/llm/check?nick={username}

Returns cached results from previous checks, including per-service availability and summary counts. If the username hasn't been checked before, returns { cached: false } with a link to check it.

### LLM Tool Use

The /api/llm/check endpoint is designed for LLM function calling / tool use. It accepts a username and returns structured JSON with availability data across all 208 platforms.

Example response:
{
  "cached": true,
  "nick": "example",
  "checkCount": 3,
  "lastCheckedAt": "2026-03-10T12:00:00Z",
  "summary": { "available": 142, "taken": 58, "errors": 8, "total": 208 },
  "results": { "GitHub": "AVAILABLE", "Instagram": "TAKEN", ... }
}

## Pages

- Homepage: https://nickcheckr.com
- All Platforms: https://nickcheckr.com/check
- Blog: https://nickcheckr.com/blog
- About: https://nickcheckr.com/about
- Contact: https://nickcheckr.com/contact
- Privacy Policy: https://nickcheckr.com/privacy
- Disclaimer: https://nickcheckr.com/disclaimer
- RSS Feed: https://nickcheckr.com/blog/feed.xml

## Platform Categories

Each platform belongs to one of 15 categories. The /check page lists all platforms organized by category. Individual platform pages are available at /check/{platform-slug} (e.g., /check/github, /check/instagram).

## Source Code

NickCheckr is open source: https://github.com/Stosiu/nick-checkr-nextjs

## Contact

Email: alex@thedigitalbunch.com
Built by stosiu: https://stosiu.dev
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
