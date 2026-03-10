'use client';

import { useCallback, useMemo, useState } from 'react';
import { ChevronDown, Mail } from 'lucide-react';

import { type CheckState, NicknameCheckCard } from './nickname-check-card';

const PREVIEW_LIMIT = 8;

export interface ServiceEntry {
  name: string;
  url: string;
  category: string;
}

interface Props {
  nickname: string | null;
  services: ServiceEntry[];
  onStatusChange?: (service: string, state: CheckState) => void;
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

export function ResultsGrid({ nickname, services, onStatusChange }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  const grouped = useMemo(() => {
    const map = new Map<string, ServiceEntry[]>();
    for (const s of filteredServices) {
      const list = map.get(s.category) ?? [];
      list.push(s);
      map.set(s.category, list);
    }
    return Array.from(map.entries());
  }, [filteredServices]);

  return (
    <div className="space-y-6">
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

      {grouped.map(([category, categoryServices]) => {
        const isExpanded = !!nickname || expandedCategories.has(category);
        const visibleServices = isExpanded
          ? categoryServices
          : categoryServices.slice(0, PREVIEW_LIMIT);
        const hiddenCount = categoryServices.length - PREVIEW_LIMIT;

        return (
          <div key={category} className="space-y-3">
            {!activeCategory && (
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
                    onStatusChange={onStatusChange}
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
