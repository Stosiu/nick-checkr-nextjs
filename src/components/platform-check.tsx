'use client';

import { ArrowRight, CheckCircle2, Loader2, Search, XCircle } from 'lucide-react';
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
}

export function PlatformCheck({ serviceName, totalPlatforms }: Props) {
  const [value, setValue] = useState('');
  const [activeNick, setActiveNick] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) setActiveNick(trimmed);
  };

  return (
    <div className="space-y-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <h3 className="text-sm font-semibold text-white">
        Quick check on {serviceName}
      </h3>
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
