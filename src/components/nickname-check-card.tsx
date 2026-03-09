'use client';

import { AlertCircle, CheckCircle2, ExternalLink, Loader2, XCircle } from 'lucide-react';
import { useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCheck } from '@/hooks/use-check';
import { cn } from '@/lib/utils';
import { AvailabilityStatus } from '@/services';

export type CheckState = 'pending' | 'available' | 'taken' | 'error';

interface Props {
  nickname: string;
  service: string;
  profileUrl: string;
  onStatusChange?: (service: string, state: CheckState) => void;
}

const statusConfig = {
  [AvailabilityStatus.Available]: {
    icon: CheckCircle2,
    label: 'Available',
    className: 'border-brand-400/20 bg-brand-400/[0.04] hover:bg-brand-400/[0.08]',
    badgeClass: 'bg-brand-400/15 text-brand-400 border-brand-400/25',
    state: 'available' as CheckState,
  },
  [AvailabilityStatus.Taken]: {
    icon: XCircle,
    label: 'Taken',
    className: 'border-red-400/20 bg-red-400/[0.04] hover:bg-red-400/[0.08]',
    badgeClass: 'bg-red-400/15 text-red-400 border-red-400/25',
    state: 'taken' as CheckState,
  },
  [AvailabilityStatus.Timeout]: {
    icon: AlertCircle,
    label: 'Timeout',
    className: 'border-yellow-400/20 bg-yellow-400/[0.04] hover:bg-yellow-400/[0.08]',
    badgeClass: 'bg-yellow-400/15 text-yellow-400 border-yellow-400/25',
    state: 'error' as CheckState,
    errorHint: 'Request timed out — the service took too long to respond',
  },
  [AvailabilityStatus.Error]: {
    icon: AlertCircle,
    label: 'Error',
    className: 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]',
    badgeClass: 'bg-white/[0.06] text-white/40 border-white/[0.08]',
    state: 'error' as CheckState,
    errorHint: 'Could not reach this service — it may be blocking automated checks',
  },
};

function buildProfileLink(urlTemplate: string, nickname: string): string {
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

export function NicknameCheckCard({ nickname, service, profileUrl, onStatusChange }: Props) {
  const { data, isLoading, isError, error } = useCheck(nickname, service);

  useEffect(() => {
    if (!onStatusChange) return;
    if (isLoading) return;
    if (isError || !data) {
      onStatusChange(service, 'error');
      return;
    }
    onStatusChange(service, statusConfig[data].state);
  }, [data, isLoading, isError, service, onStatusChange]);

  const resolvedUrl = buildProfileLink(profileUrl, nickname);

  if (isLoading) {
    return (
      <CardShell className="border-white/[0.06] bg-white/[0.02]">
        <CardRow>
          <span className="truncate text-sm font-medium text-white/50">{service}</span>
          <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-white/25" />
        </CardRow>
      </CardShell>
    );
  }

  if (isError || !data) {
    const errorMessage = error instanceof Error ? error.message : 'Check failed';
    return (
      <Tooltip>
        <TooltipTrigger render={<div />}>
          <CardShell className="border-white/[0.06] bg-white/[0.02]">
            <CardRow>
              <div className="flex min-w-0 items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-white/25" />
                <span className="truncate text-sm font-medium text-white/50">{service}</span>
              </div>
              <Badge variant="outline" className="shrink-0 border-white/[0.08] bg-white/[0.04] text-[11px] text-white/35">
                Error
              </Badge>
            </CardRow>
          </CardShell>
        </TooltipTrigger>
        <TooltipContent>{errorMessage}</TooltipContent>
      </Tooltip>
    );
  }

  const config = statusConfig[data];
  const Icon = config.icon;
  const errorHint = 'errorHint' in config ? (config as { errorHint: string }).errorHint : undefined;

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
