'use client';

import { AlertCircle, CheckCircle2, CircleDashed, ExternalLink, Loader2, XCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useServiceResult } from '@/hooks/use-check-stream';
import { cn } from '@/lib/utils';
import { AvailabilityStatus } from '@/services';

interface Props {
  nickname: string;
  service: string;
  profileUrl: string;
}

const statusConfig = {
  [AvailabilityStatus.Available]: {
    icon: CheckCircle2,
    label: 'Available',
    className: 'border-brand-400/20 bg-brand-400/[0.04] hover:bg-brand-400/[0.08]',
    badgeClass: 'bg-brand-400/15 text-brand-400 border-brand-400/25',
  },
  [AvailabilityStatus.Taken]: {
    icon: XCircle,
    label: 'Taken',
    className: 'border-red-400/20 bg-red-400/[0.04] hover:bg-red-400/[0.08]',
    badgeClass: 'bg-red-400/15 text-red-400 border-red-400/25',
  },
  [AvailabilityStatus.Timeout]: {
    icon: AlertCircle,
    label: 'Timeout',
    className: 'border-yellow-400/20 bg-yellow-400/[0.04] hover:bg-yellow-400/[0.08]',
    badgeClass: 'bg-yellow-400/15 text-yellow-400 border-yellow-400/25',
    errorHint: 'Request timed out — the service took too long to respond',
  },
  [AvailabilityStatus.Error]: {
    icon: AlertCircle,
    label: 'Error',
    className: 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]',
    badgeClass: 'bg-white/[0.06] text-white/40 border-white/[0.08]',
    errorHint: 'Could not reach this service — it may be blocking automated checks',
  },
  [AvailabilityStatus.Unknown]: {
    icon: CircleDashed,
    label: "Can't verify",
    className: 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]',
    badgeClass: 'bg-white/[0.06] text-white/40 border-white/[0.08]',
    errorHint: 'This platform serves the same page for every username — open the profile to check',
  },
};

function buildProfileLink(urlTemplate: string, nickname: string): string {
  if (urlTemplate.includes('cloudflare-dns.com')) {
    const match = urlTemplate.match(/name=\{\}\.(\S+?)&/);
    const tld = match?.[1] ?? 'com';
    return `https://www.namecheap.com/domains/registration/results/?domain=${nickname}.${tld}`;
  }
  return urlTemplate.replace('{}', nickname);
}

function CardShell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('rounded-lg border px-3 py-2.5 transition-all duration-200', className)}>
      {children}
    </div>
  );
}

function CardRow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-2">{children}</div>;
}

export function NicknameCheckCard({ nickname, service, profileUrl }: Props) {
  const result = useServiceResult(service);

  const resolvedUrl = buildProfileLink(profileUrl, nickname);

  if (!result) {
    return (
      <CardShell className="border-white/[0.06] bg-white/[0.02]">
        <CardRow>
          <span className="truncate text-sm font-medium text-white/50">{service}</span>
          <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-white/25" />
        </CardRow>
      </CardShell>
    );
  }

  const config = statusConfig[result.status];
  const Icon = config.icon;
  const genericHint = 'errorHint' in config ? (config as { errorHint: string }).errorHint : undefined;
  const errorHint = result.detail ?? genericHint;

  const card = (
    <a href={resolvedUrl} target="_blank" rel="noopener noreferrer" className="group block">
      <CardShell className={config.className}>
        <CardRow>
          <div className="flex min-w-0 items-center gap-1.5">
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate text-sm font-medium text-white/70">{service}</span>
            <ExternalLink className="h-3 w-3 shrink-0 text-white/0 transition-colors group-hover:text-white/30" />
          </div>
          <Badge variant="outline" className={cn('shrink-0 text-[11px]', config.badgeClass)}>
            {config.label}
          </Badge>
        </CardRow>
      </CardShell>
    </a>
  );

  if (errorHint) {
    return (
      <Tooltip>
        <TooltipTrigger render={<div />}>
          {card}
        </TooltipTrigger>
        <TooltipContent>{errorHint}</TooltipContent>
      </Tooltip>
    );
  }

  return card;
}
