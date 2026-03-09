'use client';

import { useCallback, useState } from 'react';
import { parseAsString, useQueryState } from 'nuqs';

import type { CheckState } from '@/components/nickname-check-card';
import { ProgressBar } from '@/components/progress-bar';
import { ResultsGrid, type ServiceEntry } from '@/components/results-grid';
import { SearchForm } from '@/components/search-form';

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

  return (
    <div className="noise dot-grid container mx-auto space-y-8 px-4 py-8">
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-16 text-center sm:px-16 md:py-24">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Is your nick taken?
          </h1>
          <p className="text-lg text-white/40">
            Find out across {services.length}+ platforms at once.
          </p>
          <div className="flex justify-center pt-4">
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
        <ResultsGrid
          nickname={searchNick}
          services={services}
          onStatusChange={handleStatusChange}
        />
      </section>
    </div>
  );
}
