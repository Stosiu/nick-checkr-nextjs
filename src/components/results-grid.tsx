'use client';

import { useCallback, useMemo, useState } from 'react';
import { ChevronDown, Mail } from 'lucide-react';

import { useCheckProgress, useServiceStatusLookup } from '@/hooks/use-check-stream';
import { AvailabilityStatus } from '@/services';

import { NicknameCheckCard } from './nickname-check-card';

const PREVIEW_LIMIT = 8;

export type StatusFilter = 'available' | 'taken' | 'unknown' | 'issues';

const STATUS_MATCHERS: Record<StatusFilter, (status: AvailabilityStatus) => boolean> = {
  available: (s) => s === AvailabilityStatus.Available,
  taken: (s) => s === AvailabilityStatus.Taken,
  unknown: (s) => s === AvailabilityStatus.Unknown,
  issues: (s) => s === AvailabilityStatus.Error || s === AvailabilityStatus.Timeout,
};

const STATUS_LABELS: Record<StatusFilter, string> = {
  available: 'Available',
  taken: 'Taken',
  unknown: "Can't verify",
  issues: 'Issues',
};

const STATUS_ACTIVE_CLASS: Record<StatusFilter, string> = {
  available: 'bg-brand-500 text-white',
  taken: 'bg-red-500/80 text-white',
  unknown: 'bg-white/25 text-white',
  issues: 'bg-amber-500/80 text-white',
};

export interface ServiceEntry {
  name: string;
  url: string;
  category: string;
}

interface Props {
  nickname: string | null;
  services: ServiceEntry[];
}

function ServicePreviewCard({ name }: { name: string }) {
  return (
    <div className="rounded-lg border border-white/[0.04] bg-white/[0.015] px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-sm font-medium text-white/25">{name}</span>
        <span className="h-1.5 w-10 rounded-full bg-white/[0.04]" />
      </div>
    </div>
  );
}

function StatusFilterBar({
  active,
  onChange,
}: {
  active: StatusFilter | null;
  onChange: (next: StatusFilter | null) => void;
}) {
  const progress = useCheckProgress();
  const counts: Record<StatusFilter, number> = {
    available: progress.available,
    taken: progress.taken,
    unknown: progress.unknown,
    issues: progress.errors,
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
          active === null ? 'bg-white/20 text-white' : 'bg-white/[0.04] text-white/40 hover:text-white/70'
        }`}
      >
        Any status ({progress.checked})
      </button>
      {(Object.keys(STATUS_LABELS) as StatusFilter[]).map((key) => (
        <button
          key={key}
          type="button"
          disabled={counts[key] === 0}
          onClick={() => onChange(key === active ? null : key)}
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
            active === key
              ? STATUS_ACTIVE_CLASS[key]
              : 'bg-white/[0.04] text-white/40 hover:text-white/70'
          }`}
        >
          {STATUS_LABELS[key]} ({counts[key]})
        </button>
      ))}
    </div>
  );
}

function CategorySections({
  grouped,
  nickname,
  showHeadings,
  allowPreview,
  expandedCategories,
  toggleExpanded,
}: {
  grouped: Array<[string, ServiceEntry[]]>;
  nickname: string | null;
  showHeadings: boolean;
  allowPreview: boolean;
  expandedCategories: Set<string>;
  toggleExpanded: (category: string) => void;
}) {
  if (grouped.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] px-5 py-6 text-center text-sm text-white/40">
        No platforms match this filter yet.
      </p>
    );
  }

  return (
    <>
      {grouped.map(([category, categoryServices]) => {
        const isExpanded = !allowPreview || expandedCategories.has(category);
        const visibleServices = isExpanded
          ? categoryServices
          : categoryServices.slice(0, PREVIEW_LIMIT);
        const hiddenCount = categoryServices.length - PREVIEW_LIMIT;

        return (
          <div key={category} className="space-y-3">
            {showHeadings && (
              <h3 className="border-b border-white/[0.06] pb-2 text-sm font-medium text-white/60">
                {category}
              </h3>
            )}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {visibleServices.map((service) =>
                nickname ? (
                  <NicknameCheckCard
                    key={service.name}
                    nickname={nickname}
                    service={service.name}
                    profileUrl={service.url}
                  />
                ) : (
                  <ServicePreviewCard key={service.name} name={service.name} />
                ),
              )}
            </div>
            {!isExpanded && hiddenCount > 0 && (
              <button
                type="button"
                onClick={() => toggleExpanded(category)}
                className="flex items-center gap-1.5 text-sm font-medium text-white/30 transition-colors hover:text-white/50"
              >
                <ChevronDown className="h-3.5 w-3.5" />
                Show {hiddenCount} more
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}

function groupByCategory(services: ServiceEntry[]): Array<[string, ServiceEntry[]]> {
  const map = new Map<string, ServiceEntry[]>();
  for (const s of services) {
    const list = map.get(s.category) ?? [];
    list.push(s);
    map.set(s.category, list);
  }
  return Array.from(map.entries());
}

function StatusFilteredSections({
  services,
  status,
  nickname,
  showHeadings,
  expandedCategories,
  toggleExpanded,
}: {
  services: ServiceEntry[];
  status: StatusFilter;
  nickname: string | null;
  showHeadings: boolean;
  expandedCategories: Set<string>;
  toggleExpanded: (category: string) => void;
}) {
  const lookup = useServiceStatusLookup();
  const matches = STATUS_MATCHERS[status];
  const filtered = services.filter((s) => {
    const result = lookup(s.name);
    return result !== undefined && matches(result);
  });

  return (
    <CategorySections
      grouped={groupByCategory(filtered)}
      nickname={nickname}
      showHeadings={showHeadings}
      allowPreview={false}
      expandedCategories={expandedCategories}
      toggleExpanded={toggleExpanded}
    />
  );
}

export function ResultsGrid({ nickname, services }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<StatusFilter | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleExpanded = useCallback((category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const s of services) {
      counts.set(s.category, (counts.get(s.category) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [services]);

  const filteredServices = activeCategory
    ? services.filter((s) => s.category === activeCategory)
    : services;

  const grouped = useMemo(() => groupByCategory(filteredServices), [filteredServices]);

  const showHeadings = !activeCategory;
  const allowPreview = !nickname;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === null
                ? 'bg-brand-500 text-white'
                : 'bg-white/[0.06] text-white/50 hover:text-white/70'
            }`}
          >
            All ({services.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat.name
                  ? 'bg-brand-500 text-white'
                  : 'bg-white/[0.06] text-white/50 hover:text-white/70'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {nickname && <StatusFilterBar active={activeStatus} onChange={setActiveStatus} />}
      </div>

      {activeStatus ? (
        <StatusFilteredSections
          services={filteredServices}
          status={activeStatus}
          nickname={nickname}
          showHeadings={showHeadings}
          expandedCategories={expandedCategories}
          toggleExpanded={toggleExpanded}
        />
      ) : (
        <CategorySections
          grouped={grouped}
          nickname={nickname}
          showHeadings={showHeadings}
          allowPreview={allowPreview}
          expandedCategories={expandedCategories}
          toggleExpanded={toggleExpanded}
        />
      )}

      <div className="rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] px-5 py-6 text-center">
        <p className="mb-3 text-sm text-white/40">
          Missing a platform? Let us know and we&apos;ll add it.
        </p>
        <a
          href="mailto:nickcheckr@stosiu.dev?subject=Platform suggestion for NickCheckr"
          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:border-brand-400/30 hover:bg-brand-400/[0.06] hover:text-brand-400"
        >
          <Mail className="h-4 w-4" />
          Suggest a service
        </a>
      </div>
    </div>
  );
}
