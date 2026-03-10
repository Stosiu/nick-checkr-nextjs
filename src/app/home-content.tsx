'use client';

import { useCallback, useEffect, useState } from 'react';
import { parseAsString, useQueryState } from 'nuqs';

import { CheckSummary } from '@/components/check-summary';
import type { CheckState } from '@/components/nickname-check-card';
import { ProgressBar } from '@/components/progress-bar';
import { ResultsGrid, type ServiceEntry } from '@/components/results-grid';
import { SearchForm } from '@/components/search-form';
import { useBlobCache } from '@/hooks/use-blob-cache';

interface Props {
  services: ServiceEntry[];
}

export function HomeContent({ services }: Props) {
  const [searchNick, setSearchNick] = useQueryState('nick', parseAsString);
  const [statuses, setStatuses] = useState<Record<string, CheckState>>({});

  const handleSearch = (nick: string) => {
    setStatuses({});
    setSearchNick(nick);
  };

  const handleClear = () => {
    setStatuses({});
    setSearchNick(null);
  };

  const handleStatusChange = useCallback((service: string, state: CheckState) => {
    setStatuses((prev) => {
      if (prev[service] === state) return prev;
      return { ...prev, [service]: state };
    });
  }, []);

  const counts = {
    total: services.length,
    available: Object.values(statuses).filter((s) => s === 'available').length,
    taken: Object.values(statuses).filter((s) => s === 'taken').length,
    errors: Object.values(statuses).filter((s) => s === 'error').length,
  };

  const { checkCount, saveResults } = useBlobCache(searchNick);
  const checked = counts.available + counts.taken + counts.errors;
  const isComplete = !!searchNick && checked === counts.total && counts.total > 0;

  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    if (isComplete && !hasSaved) {
      setHasSaved(true);
      saveResults(statuses);
    }
  }, [isComplete, hasSaved, saveResults, statuses]);

  useEffect(() => {
    setHasSaved(false);
  }, [searchNick]);

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
              onSearch={handleSearch}
              onClear={handleClear}
              currentSearch={searchNick}
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        {searchNick && <ProgressBar {...counts} />}
        {searchNick && <CheckSummary checkCount={checkCount} isComplete={isComplete} />}
        <ResultsGrid
          nickname={searchNick}
          services={services}
          onStatusChange={handleStatusChange}
        />
      </section>
    </div>
  );
}
