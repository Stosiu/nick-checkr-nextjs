import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function PageShell({
  title,
  intro,
  aside,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="noise dot-grid container mx-auto space-y-6 px-4 py-4 md:py-8">
      <header className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-10 sm:px-8 md:px-12 md:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-64 w-[36rem] max-w-[130%] -translate-x-1/4 -translate-y-1/2 rounded-full bg-brand-500/[0.08] blur-[120px]"
        />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {intro && <div className="mt-4 text-pretty text-lg leading-relaxed text-white/70">{intro}</div>}
          </div>
          {aside}
        </div>
      </header>
      {children}
    </div>
  );
}

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-8 sm:px-8 md:px-12 md:py-12',
        className,
      )}
    >
      {children}
    </section>
  );
}
