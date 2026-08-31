'use client';

import { useMemo } from 'react';
import { parseAsString, useQueryState } from 'nuqs';

import { CheckSummary } from '@/components/check-summary';
import { ProgressBar } from '@/components/progress-bar';
import { ResultsGrid, type ServiceEntry } from '@/components/results-grid';
import { SearchForm } from '@/components/search-form';
import { CheckStreamProvider, useCheckProgress } from '@/hooks/use-check-stream';
import { useBlobCache } from '@/hooks/use-blob-cache';

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

  return (
    <div className="noise dot-grid container mx-auto space-y-8 px-4 py-4 md:py-8">
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-10 text-center sm:px-8 md:px-16 md:py-24">
        <div className="relative z-10 mx-auto max-w-2xl space-y-4 sm:space-y-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Is your nick taken?
          </h1>
          <p className="text-base text-white/40 sm:text-lg">
            Find out across {services.length}+ platforms at once.
          </p>
          <div className="flex justify-center pt-2 sm:pt-4">
            <SearchForm
              onSearch={setSearchNick}
              onClear={() => setSearchNick(null)}
              currentSearch={searchNick}
            />
          </div>
        </div>
      </section>

      <CheckStreamProvider nick={searchNick} serviceNames={serviceNames}>
        <Results nickname={searchNick} services={services} />
      </CheckStreamProvider>
    </div>
  );
}
