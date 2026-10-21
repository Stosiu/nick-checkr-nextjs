import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

import { PageShell, Panel } from '@/components/page-shell';
import { siteConfig } from '@/config/site';
import { getServiceSlug } from '@/lib/platform-utils';
import { AvailabilityStatus, CheckMethod } from '@/services';
import { services } from '@/services/data/services';
import { nicknameChecker } from '@/services/nickname-checker';

export const revalidate = 21600;
export const maxDuration = 60;

export const metadata: Metadata = {
  title: 'Status',
  description: `Live check of whether ${siteConfig.name} gets the right answer from the most popular platforms, rerun every six hours.`,
  alternates: { canonical: '/status' },
};

const MONITORED = [
  'YouTube',
  'X',
  'Twitter',
  'Snapchat',
  'Twitch',
  'Kick',
  'Discord',
  'Facebook',
  'Pinterest',
  'Bluesky',
  'Telegram',
  'GitHub',
  'PyPI',
  'Medium',
  'Steam',
  'Xbox',
  'Roblox',
  'SoundCloud',
  'Behance',
  'Dribbble',
  '.com',
];

const CONCURRENCY = 8;

type Verdict = 'working' | 'wrong' | 'error';

type Row = {
  name: string;
  verdict: Verdict;
  detail: string;
};

async function checkPlatform(name: string): Promise<Row> {
  const definition = services.find((s) => s.name === name);
  if (!definition?.testTakenNick || !definition.testAvailableNick) {
    return { name, verdict: 'error', detail: 'No test names configured' };
  }

  const [taken, free] = await Promise.all([
    nicknameChecker.check(definition.testTakenNick, name),
    nicknameChecker.check(definition.testAvailableNick, name),
  ]);

  const failure = [taken, free].find(
    (r) => r.status === AvailabilityStatus.Error || r.status === AvailabilityStatus.Timeout,
  );
  if (failure) {
    return { name, verdict: 'error', detail: failure.errorDetail ?? 'The platform did not answer' };
  }

  if (taken.status === AvailabilityStatus.Taken && free.status === AvailabilityStatus.Available) {
    return { name, verdict: 'working', detail: 'Existing and free names both answered correctly' };
  }

  const wrong =
    taken.status !== AvailabilityStatus.Taken
      ? 'An existing account was reported as free'
      : 'A free name was reported as taken';
  return { name, verdict: 'wrong', detail: wrong };
}

async function checkAll(): Promise<Row[]> {
  const rows: Row[] = [];
  const queue = [...MONITORED];
  const worker = async () => {
    for (let name = queue.shift(); name; name = queue.shift()) {
      rows.push(await checkPlatform(name));
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return MONITORED.map((name) => rows.find((r) => r.name === name)!);
}

const verdictStyle: Record<Verdict, { icon: typeof CheckCircle2; label: string; className: string }> = {
  working: { icon: CheckCircle2, label: 'Working', className: 'bg-brand-400/15 text-brand-400 border-brand-400/25' },
  wrong: { icon: XCircle, label: 'Wrong answer', className: 'bg-red-400/15 text-red-400 border-red-400/25' },
  error: { icon: AlertCircle, label: 'Not answering', className: 'bg-yellow-400/15 text-yellow-400 border-yellow-400/25' },
};

export default async function StatusPage() {
  const rows = await checkAll();
  const checkedAt = new Date();
  const working = rows.filter((r) => r.verdict === 'working').length;
  const unverifiable = services.filter((s) => s.checkMethod === CheckMethod.Unverifiable).length;

  const allWorking = working === rows.length;

  return (
    <PageShell
      title="Status"
      intro={
        <p>
          Each popular platform is asked about an account that exists and a name that does not,
          from the same servers that run your searches. The check repeats every six hours.
        </p>
      }
      aside={
        <div
          className={`flex items-center gap-3 rounded-xl border px-5 py-4 ${
            allWorking ? 'border-brand-400/25 bg-brand-400/[0.06]' : 'border-yellow-400/25 bg-yellow-400/[0.06]'
          }`}
        >
          {allWorking ? (
            <CheckCircle2 className="h-6 w-6 shrink-0 text-brand-400" />
          ) : (
            <AlertCircle className="h-6 w-6 shrink-0 text-yellow-400" />
          )}
          <div>
            <p className="font-semibold text-white">
              {working} of {rows.length} answering correctly
            </p>
            <p className="text-sm text-white/60">
              Last run{' '}
              <time dateTime={checkedAt.toISOString()} className="font-mono text-white/80">
                {checkedAt.toISOString().slice(0, 16).replace('T', ' ')} UTC
              </time>
            </p>
          </div>
        </div>
      }
    >
      <Panel>
        <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
          {rows.map((row) => {
            const style = verdictStyle[row.verdict];
            return (
              <li key={row.name} className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-3">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/check/${getServiceSlug(row.name)}`}
                    prefetch={false}
                    className="font-medium text-white transition-colors hover:text-brand-400"
                  >
                    {row.name}
                  </Link>
                  <span className="mt-0.5 block truncate text-sm text-white/60">{row.detail}</span>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.className}`}
                >
                  <style.icon className="h-3.5 w-3.5" />
                  {style.label}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-3xl text-sm text-white/60">
          Across the whole catalogue, {unverifiable} of {services.length} entries are marked
          &ldquo;Can&apos;t verify&rdquo; because the platform shows the same page for every name or
          blocks automated checks. See a result that looks wrong?{' '}
          <Link
            href="/contact"
            className="text-brand-400 underline decoration-brand-400/40 underline-offset-4 transition-colors hover:decoration-brand-400"
          >
            Report it
          </Link>
          .
        </p>
      </Panel>
    </PageShell>
  );
}
