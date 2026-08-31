export interface ChangelogEntry {
  version: string;
  date: string;
  summary: string;
  changes: { kind: 'added' | 'fixed' | 'changed'; text: string }[];
}

export const changelog: ChangelogEntry[] = [
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
        text: 'Platforms that serve an identical page whether or not a username exists now report "Can\'t verify" instead of guessing "Taken". You get a link to check the profile yourself.',
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
