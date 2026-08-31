'use client';

import { ArrowRight, CheckCircle2, CircleDashed, ExternalLink, Loader2, Search, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCheck } from '@/hooks/use-check';
import { AvailabilityStatus } from '@/services';

function Result({ nick, service, total }: { nick: string; service: string; total: number }) {
  const { data, isLoading, isError } = useCheck(nick, service);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-white/50">
        <Loader2 className="h-4 w-4 animate-spin" />
        Checking {service}...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-white/40">Could not reach {service}. Try checking all platforms instead.</p>
        <Link
          href={`/?nick=${encodeURIComponent(nick)}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Check all {total} platforms
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (data === AvailabilityStatus.Unknown) {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <CircleDashed className="mt-0.5 h-5 w-5 shrink-0 text-white/40" />
          <span className="text-sm text-white/50">
            We can&apos;t check <span className="font-mono text-white/70">{nick}</span> on {service}{' '}
            automatically.
          </span>
        </div>
        <Link
          href={`/?nick=${encodeURIComponent(nick)}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Check {total - 1} other platforms
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const available = data === AvailabilityStatus.Available;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {available ? (
          <>
            <CheckCircle2 className="h-5 w-5 text-brand-400" />
            <span className="text-sm font-medium text-brand-400">
              <span className="font-mono">{nick}</span> is available on {service}
            </span>
          </>
        ) : (
          <>
            <XCircle className="h-5 w-5 text-red-400" />
            <span className="text-sm font-medium text-red-400">
              <span className="font-mono">{nick}</span> is taken on {service}
            </span>
          </>
        )}
      </div>
      <Link
        href={`/?nick=${encodeURIComponent(nick)}`}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
      >
        {available ? `Secure it on all ${total} platforms` : `Check ${total - 1} other platforms`}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

interface Props {
  serviceName: string;
  totalPlatforms: number;
  unverifiableReason?: string;
  profileUrlTemplate?: string;
}

export function PlatformCheck({
  serviceName,
  totalPlatforms,
  unverifiableReason,
  profileUrlTemplate,
}: Props) {
  const [value, setValue] = useState('');
  const [activeNick, setActiveNick] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) setActiveNick(trimmed);
  };

  if (unverifiableReason) {
    return (
      <div className="space-y-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="flex items-center gap-2">
          <CircleDashed className="h-4 w-4 shrink-0 text-white/40" />
          <h2 className="text-sm font-semibold text-white">
            {serviceName} can&apos;t be checked automatically
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-white/50">{unverifiableReason}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {profileUrlTemplate && (
            <a
              href={profileUrlTemplate.replace('{}', 'username')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:border-brand-400/30 hover:text-brand-400"
            >
              Open {serviceName}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Check {totalPlatforms - 1} other platforms
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <h2 className="text-sm font-semibold text-white">
        Quick check on {serviceName}
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Enter a username..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (activeNick) setActiveNick(null);
          }}
          className="h-10 flex-1 text-sm"
        />
        <Button type="submit" disabled={!value.trim()} className="h-10 px-4 text-sm">
          <Search className="mr-1.5 h-4 w-4" />
          Check
        </Button>
      </form>
      {activeNick && (
        <Result nick={activeNick} service={serviceName} total={totalPlatforms} />
      )}
    </div>
  );
}
