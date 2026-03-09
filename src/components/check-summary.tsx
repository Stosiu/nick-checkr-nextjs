'use client';

import { Users } from 'lucide-react';

interface Props {
  checkCount: number | null;
  isComplete: boolean;
}

export function CheckSummary({ checkCount, isComplete }: Props) {
  if (!isComplete || checkCount === null) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/50">
      <Users className="h-4 w-4 shrink-0 text-white/30" />
      {checkCount === 1 ? (
        <span>First time this nickname was checked.</span>
      ) : (
        <span>
          This nickname has been checked{' '}
          <span className="font-medium text-white/70">{checkCount} times</span>.
        </span>
      )}
    </div>
  );
}
