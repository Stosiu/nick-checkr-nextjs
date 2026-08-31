import { NextResponse } from 'next/server';

import { getAllCategories } from '@/lib/platform-utils';
import { CheckMethod } from '@/services';
import { services } from '@/services/data/services';

export async function GET() {
  const total = services.length;
  const categories = getAllCategories();
  const unverifiableCount = services.filter(
    (s) => s.checkMethod === CheckMethod.Unverifiable,
  ).length;
  const checkableCount = total - unverifiableCount;

  const content = `# NickCheckr

> Check username availability across ${total} platforms instantly.

NickCheckr is a free, open-source tool that checks whether a username (nickname) is available on ${total} online platforms across ${categories.length} categories: ${categories.join(', ')}.

## How It Works

Enter a username and NickCheckr checks every platform in one streaming request. Each platform is checked by requesting its public profile URL — if the platform returns a 404 or a "not found" indicator, the username is available. Results stream back as they arrive and are cached.

${checkableCount} of the ${total} platforms can be checked automatically. The remaining ${unverifiableCount} cannot, and NickCheckr reports them as "unknown" with a reason rather than guessing.

## Result Statuses

- AVAILABLE — no account with this username was found on the platform.
- TAKEN — an account with this username already exists.
- ERROR — the platform could not be reached or refused the request. Availability is unknown.
- TIMEOUT — the platform did not respond in time. Availability is unknown.
- UNKNOWN — the platform cannot be checked automatically. A machine-readable reason and a human-readable explanation are always included.

Reasons for UNKNOWN:

- CLIENT_RENDERED — the platform builds profile pages in the browser and returns an identical response for every username.
- BOT_PROTECTED — the platform puts automated requests behind a bot check and never returns the real profile page.
- NOT_USERNAME_BASED — profile URLs use numeric IDs or slugs rather than usernames, so a username cannot be looked up.
- WILDCARD_DNS — the domain extension answers every lookup, registered or not.
- NOT_IN_DNS — the names live on a blockchain naming service rather than in public DNS.

Never treat UNKNOWN as available or taken. Tell the user to check that platform manually and give them the profile URL.

## API

### Check a single service
GET https://nickcheckr.stosiu.dev/api/check?nick={username}&service={serviceName}

Returns a bare JSON string — "AVAILABLE", "TAKEN", "ERROR" or "TIMEOUT" — for platforms that can be checked. For a platform that cannot, it returns an object instead:

{ "status": "UNKNOWN", "reason": "This platform builds profile pages in the browser..." }

### Get cached results (all services)
GET https://nickcheckr.stosiu.dev/api/llm/check?nick={username}

Returns cached results from previous checks, including per-service availability, summary counts, status meanings, and an explanation for every platform reported as unknown. If the username has not been checked before, returns { cached: false } with a link to check it.

### LLM Tool Use

The /api/llm/check endpoint is designed for LLM function calling. It accepts a username and returns structured JSON across all ${total} platforms.

Example response:
{
  "cached": true,
  "nick": "example",
  "checkCount": 3,
  "lastCheckedAt": "2026-08-31T12:00:00Z",
  "summary": { "available": 142, "taken": 58, "errors": 8, "total": ${total} },
  "results": { "GitHub": "available", "Instagram": "taken", "TikTok": "unknown" },
  "statusMeanings": { "available": "...", "taken": "...", "error": "...", "unknown": "..." },
  "unverifiable": {
    "TikTok": {
      "reason": "CLIENT_RENDERED",
      "explanation": "This platform builds profile pages in the browser and returns an identical response for every username, so an automated check cannot tell a free name from a taken one. Open the profile to see for yourself.",
      "checkManuallyAt": "https://www.tiktok.com/@{username}"
    }
  }
}

## Pages

- Homepage: https://nickcheckr.stosiu.dev
- All Platforms: https://nickcheckr.stosiu.dev/check
- Blog: https://nickcheckr.stosiu.dev/blog
- Changelog: https://nickcheckr.stosiu.dev/changelog
- About: https://nickcheckr.stosiu.dev/about
- Contact: https://nickcheckr.stosiu.dev/contact
- Privacy Policy: https://nickcheckr.stosiu.dev/privacy
- Disclaimer: https://nickcheckr.stosiu.dev/disclaimer
- RSS Feed: https://nickcheckr.stosiu.dev/blog/feed.xml

## Platform Categories

Each platform belongs to one of ${categories.length} categories. The /check page lists all platforms organized by category. Individual platform pages are available at /check/{platform-slug} (e.g., /check/github, /check/instagram).

## Source Code

NickCheckr is open source: https://github.com/Stosiu/nick-checkr-nextjs
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
