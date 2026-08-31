export interface ChangelogEntry {
  version: string;
  date: string;
  summary: string;
  changes: { kind: 'added' | 'fixed' | 'changed'; text: string }[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: '2.0.1',
    date: '2026-08-31',
    summary:
      'Platforms that refuse requests from our servers now say so instead of showing an error, results can be filtered by status, and a burst of lookups no longer overwhelms a single domain registry.',
    changes: [
      {
        kind: 'added',
        text: 'Results can be filtered by status as well as by category: available, taken, can\'t verify, or issues. The counts update live as a search runs.',
      },
      {
        kind: 'fixed',
        text: 'Around 65 platforms refuse automated requests from datacenter networks, which includes the servers this site runs on. They previously showed an error on every search; they now report "Can\'t verify" with a link to check by hand. The same platforms answer normally from a home connection, so this reflects where the check runs rather than the platform being broken.',
      },
      {
        kind: 'fixed',
        text: 'Medium, Letterboxd, Codeforces and Fandom are checked again through their public feeds and APIs, which are not behind the same block as their web pages.',
      },
      {
        kind: 'fixed',
        text: 'Checks that share a host are now spread across the queue instead of running together. One registry serves 78 of the domain extensions, and querying them all at once was tripping its rate limit and failing every one of them.',
      },
      {
        kind: 'fixed',
        text: 'A failed check is retried with a short backoff before being reported, which clears most one-off rate limits.',
      },
    ],
  },
  {
    version: '2.0.0',
    date: '2026-08-31',
    summary:
      'A major release. The catalogue grows from 468 to 701 entries across ten new categories, domain coverage nearly doubles to 175 extensions, domain checks now ask the registry whether a name is registered instead of whether it resolves, and four new detection methods rescued platforms that previously could not be checked at all.',
    changes: [
      {
        kind: 'added',
        text: '155 new platforms, every one verified against the live site before being added. Ten new categories: Q&A & Knowledge, Crowdfunding & Support, Newsletters, Link in Bio, Web3 & Decentralized, East Asia, Europe & Russia, Consoles & Esports, Security & Bug Bounty, and Package Names.',
      },
      {
        kind: 'fixed',
        text: 'Domain checks now query the registry directly over RDAP for 154 of the 175 extensions. The old DNS lookup only told you whether a name resolved, so a registered domain parked without DNS records was reported as available. Extensions with no working RDAP service stay on DNS.',
      },
      {
        kind: 'fixed',
        text: '.crypto, .nft and .web3 are not part of public DNS, so the old lookup reported every name on them as available. They now say so instead.',
      },
      {
        kind: 'added',
        text: 'Four new ways of checking a platform: reading a JSON API rather than the profile page, matching a marker that only appears when a profile exists, following redirects to see whether a missing profile lands on a sign-in page, and querying domain registries over RDAP.',
      },
      {
        kind: 'fixed',
        text: 'Nine platforms that reported "Can\'t verify" are checked properly again by asking their public API instead of scraping the profile page: PyPI, Trello, Imgur, Matrix, Crates.io, Minecraft, Dailymotion, CPAN and TETR.IO.',
      },
      {
        kind: 'fixed',
        text: 'A bot-protection challenge is now reported as an error rather than being read as an answer. Previously a Cloudflare block on a body-matching platform was silently recorded as "Taken".',
      },
      {
        kind: 'added',
        text: '69 more domain extensions, including the creative group (.art, .photography, .video, .press, .gallery), professional services (.law, .legal, .consulting, .clinic, .health), commerce (.market, .boutique, .fashion, .cafe) and vanity names (.vip, .top, .buzz, .cool, .rocks). Second-level domains work for the first time: .co.uk, .com.au, .com.br and .co.in.',
      },
      {
        kind: 'added',
        text: 'Package names are checkable across ten registries — npm, PyPI, crates.io, RubyGems, NuGet, Hex, Homebrew, CocoaPods, Pub.dev and Chocolatey. Whether a package name is free is a different question from whether a user account exists, and the catalogue only answered the second before now.',
      },
      {
        kind: 'fixed',
        text: 'Platform pages without hand-written copy no longer share three near-identical sentences. They now describe how the platform builds profile URLs, what that implies for the characters a name may use, and what the check can and cannot determine. Pages that have neither hand-written copy nor a working check are no longer submitted for indexing.',
      },
      {
        kind: 'added',
        text: 'Telegram, Freelancer and Mastodon are checked properly again, and the weekly live health run in CI now fails if verified coverage drops below 95%.',
      },
      {
        kind: 'changed',
        text: 'Live verified coverage across the whole catalogue is 98.4%, measured against real sites rather than mocks.',
      },
      {
        kind: 'added',
        text: 'The footer links to the source on GitHub and shows the repository star count.',
      },
    ],
  },
  {
    version: '1.6.0',
    date: '2026-08-31',
    summary:
      'A single streaming request replaces the 463 separate ones a search used to make, and a live audit of every platform fixed the checks that had quietly stopped working.',
    changes: [
      {
        kind: 'changed',
        text: 'Searching now opens one streaming request instead of firing a separate request per platform. Results still appear as they arrive, but a full search finishes in about 17 seconds rather than 90.',
      },
      {
        kind: 'fixed',
        text: 'Audited all 463 platforms against live sites. 132 checks were returning a confident but wrong answer and have been repaired, taking verified coverage from 55% to 84%.',
      },
      {
        kind: 'added',
        text: 'Platforms that cannot be checked automatically now report "Can\'t verify" instead of guessing "Taken", and each one tells you why: the profile page is built in the browser, the site blocks automated requests, its URLs use numeric IDs rather than usernames, the domain extension answers every lookup, or the names live outside public DNS.',
      },
      {
        kind: 'added',
        text: 'The API returns those reasons too. /api/check answers with a status and reason, /api/llm/check lists every unverifiable platform with a machine-readable code, an explanation, and the URL to check by hand.',
      },
      {
        kind: 'fixed',
        text: 'Domain checks for 34 extensions used a test domain that no longer resolved, so names that were registered showed as free.',
      },
      {
        kind: 'fixed',
        text: 'Removed a write endpoint that let anyone overwrite cached results for any username. Results are now written only by the server that ran the check.',
      },
      {
        kind: 'changed',
        text: 'Updated Next.js and the rest of the dependency tree, clearing every known security advisory in the production build.',
      },
    ],
  },
];
