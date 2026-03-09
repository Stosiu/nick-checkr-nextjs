'use client';

import { useState } from 'react';

interface Props {
  total: number;
  available: number;
  taken: number;
  errors: number;
}

interface TooltipState {
  label: string;
  x: number;
}

export function ProgressBar({ total, available, taken, errors }: Props) {
  const checked = available + taken + errors;
  const pending = total - checked;
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const pctAvailable = (available / total) * 100;
  const pctTaken = (taken / total) * 100;
  const pctErrors = (errors / total) * 100;

  const segments = [
    { key: 'available', pct: pctAvailable, count: available, color: 'bg-green-500', label: 'Available' },
    { key: 'taken', pct: pctTaken, count: taken, color: 'bg-red-400', label: 'Taken' },
    { key: 'errors', pct: pctErrors, count: errors, color: 'bg-yellow-400', label: 'Errors' },
  ];

  const handleMouseEnter = (label: string, count: number, pct: number, e: React.MouseEvent) => {
    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    setTooltip({ label: `${label}: ${count} (${pct.toFixed(1)}%)`, x });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tooltip) return;
    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    setTooltip((prev) => prev ? { ...prev, x: e.clientX - rect.left } : null);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/[0.06]">
          {segments.map((seg) =>
            seg.pct > 0 ? (
              <div
                key={seg.key}
                className={`${seg.color} cursor-pointer transition-all duration-500 ease-out hover:brightness-110`}
                style={{ width: `${seg.pct}%` }}
                onMouseEnter={(e) => handleMouseEnter(seg.label, seg.count, seg.pct, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setTooltip(null)}
              />
            ) : null,
          )}
        </div>
        {tooltip && (
          <div
            className="pointer-events-none absolute -top-9 -translate-x-1/2 rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
            style={{ left: tooltip.x }}
          >
            {tooltip.label}
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/40">
        <span>
          {checked} of {total} checked
        </span>
        {available > 0 && (
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
            {available} available
          </span>
        )}
        {taken > 0 && (
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400" />
            {taken} taken
          </span>
        )}
        {errors > 0 && (
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-400" />
            {errors} errors
          </span>
        )}
        {pending > 0 && (
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-white/[0.15]" />
            {pending} pending
          </span>
        )}
      </div>
    </div>
  );
}
