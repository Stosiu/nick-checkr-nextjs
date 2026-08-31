'use client';

import { useMemo } from 'react';
import { parseAsString, useQueryState } from 'nuqs';

import { CheckSummary } from '@/components/check-summary';
import { HeroBackground } from '@/components/hero-background';
import { ProgressBar } from '@/components/progress-bar';
import { ResultsGrid, type ServiceEntry } from '@/components/results-grid';
import { SearchForm } from '@/components/search-form';
import { CheckStreamProvider, useCheckProgress } from '@/hooks/use-check-stream';
import { useBlobCache } from '@/hooks/use-blob-cache';
import { cn } from '@/lib/utils';

interface Props {
  services: ServiceEntry[];
}

function Results({ nickname, services }: { nickname: string | null; services: ServiceEntry[] }) {
  const progress = useCheckProgress();
  const { checkCount } = useBlobCache(nickname, progress.isComplete);

  return (
    <section className="space-y-6">
      {nickname && (
        <ProgressBar
          total={progress.total}
          available={progress.available}
          taken={progress.taken}
          errors={progress.errors}
          unknown={progress.unknown}
        />
      )}
      {nickname && <CheckSummary checkCount={checkCount} isComplete={progress.isComplete} />}
      <ResultsGrid nickname={nickname} services={services} />
    </section>
  );
}

export function HomeContent({ services }: Props) {
  const [searchNick, setSearchNick] = useQueryState('nick', parseAsString);
  const serviceNames = useMemo(() => services.map((s) => s.name), [services]);

  const counts = useMemo(() => {
    const domains = services.filter((s) => s.category === 'Domain Names').length;
    const registries = services.filter((s) => s.category === 'Package Names').length;
    return { domains, registries, platforms: services.length - domains - registries };
  }, [services]);

  const searching = Boolean(searchNick);

  return (
    <div className="noise dot-grid container mx-auto space-y-8 px-4 py-4 md:py-8">
      <section
        className={cn(
          'relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 text-center sm:px-8 md:px-16',
          searching ? 'py-8 md:py-10' : 'py-12 md:py-24',
        )}
      >
        {!searching && <HeroBackground />}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] max-w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.08] blur-[120px]"
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          {!searching && (
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45 backdrop-blur-sm sm:text-[11px]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
              </span>
              {counts.platforms} platforms
              <span className="text-white/20">/</span>
              {counts.domains} domains
              <span className="text-white/20">/</span>
              {counts.registries} registries
            </div>
          )}

          <h1
            className={cn(
              'text-balance font-bold tracking-[-0.035em] text-white',
              searching ? 'text-2xl sm:text-3xl' : 'text-4xl leading-[1.05] sm:text-6xl md:text-7xl',
            )}
          >
            Check your username{' '}
            <span className="bg-gradient-to-br from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
              everywhere
            </span>{' '}
            at once
          </h1>

          {!searching && (
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-white/45 sm:mt-6 sm:text-lg">
              One search sweeps every social network, developer platform, marketplace and domain
              extension we track. Results stream in as they land.
            </p>
          )}

          <div className={cn('flex justify-center', searching ? 'mt-5' : 'mt-7 sm:mt-9')}>
            <SearchForm
              onSearch={setSearchNick}
              onClear={() => setSearchNick(null)}
              currentSearch={searchNick}
            />
          </div>

          {!searching && (
            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-white/50 sm:text-sm">
              <span>No account</span>
              <span className="text-white/15">·</span>
              <span>Nothing stored about you</span>
              <span className="text-white/15">·</span>
              <span>Full sweep in about 20 seconds</span>
            </p>
          )}
        </div>
      </section>

      <CheckStreamProvider nick={searchNick} serviceNames={serviceNames}>
        <Results nickname={searchNick} services={services} />
      </CheckStreamProvider>
    </div>
  );
}
