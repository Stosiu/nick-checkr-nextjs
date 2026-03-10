'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { getCategoryIcon, getCategorySlug, getPlatformIcon, getServiceSlug } from '@/lib/platform-utils';
type PlatformService = { name: string; category: string };
type CategoryGroup = { category: string; services: PlatformService[] };

export function PlatformSearch({ groups }: { groups: CategoryGroup[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        services: g.services.filter((s) => s.name.toLowerCase().includes(q)),
      }))
      .filter((g) => g.services.length > 0);
  }, [groups, query]);

  const totalShown = filtered.reduce((acc, g) => acc + g.services.length, 0);

  return (
    <>
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search platforms..."
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/30 transition-colors focus:border-brand-400/50 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query && (
        <p className="text-sm text-white/30">
          {totalShown} platform{totalShown !== 1 ? 's' : ''} found
        </p>
      )}

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-white/30">No platforms match &ldquo;{query}&rdquo;</p>
      ) : (
        filtered.map((group) => {
          const CatIcon = getCategoryIcon(group.category);
          return (
            <section
              key={group.category}
              id={group.category
                .toLowerCase()
                .replace(/\s+&\s+/g, '-')
                .replace(/\s+/g, '-')}
              className="space-y-3"
            >
              <h2 className="flex items-center gap-2 border-b border-white/[0.06] pb-2 text-lg font-bold text-white">
                <CatIcon className="h-4.5 w-4.5 text-brand-400" />
                <Link
                  href={`/check/category/${getCategorySlug(group.category)}`}
                  className="transition-colors hover:text-brand-400"
                >
                  {group.category}
                </Link>
                <span className="ml-1 text-sm font-normal text-white/30">
                  {group.services.length} platform{group.services.length !== 1 ? 's' : ''}
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {group.services.map((service) => {
                  const Icon = getPlatformIcon(service.name, service.category);
                  return (
                    <Link
                      key={service.name}
                      href={`/check/${getServiceSlug(service.name)}`}
                      className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:border-brand-400/30 hover:text-white"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-white/30" />
                      {service.name}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })
      )}
    </>
  );
}
