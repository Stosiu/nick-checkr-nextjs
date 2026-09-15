import type { NextConfig } from "next";
import { dirname } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const { version } = JSON.parse(readFileSync("./package.json", "utf-8"));

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

async function fetchGitHubStars(): Promise<string> {
  try {
    const response = await fetch('https://api.github.com/repos/Stosiu/nick-checkr-nextjs', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return '';
    const data = await response.json();
    return typeof data.stargazers_count === 'number' ? String(data.stargazers_count) : '';
  } catch {
    return '';
  }
}

export default async function config(): Promise<NextConfig> {
  return {
    turbopack: {
      root: dirname(fileURLToPath(import.meta.url)),
    },
    serverExternalPackages: ['impit'],
    env: {
      NEXT_PUBLIC_APP_VERSION: version,
      GITHUB_STARS: await fetchGitHubStars(),
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ];
    },
  };
}
