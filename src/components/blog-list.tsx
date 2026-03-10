'use client';

import { useMemo, useEffect } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useQueryState, parseAsArrayOf, parseAsString, parseAsInteger } from 'nuqs';
import { Search, X, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { capitalize } from 'es-toolkit';
import type { PostMeta } from '@/lib/blog';

const PAGE_SIZE = 12;
const MotionLink = motion.create(NextLink);

type Props = {
  posts: PostMeta[];
};

export function BlogList({ posts }: Props) {
  const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''));
  const [activeTags, setActiveTags] = useQueryState('tag', parseAsArrayOf(parseAsString, ',').withDefault([]));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return counts;
  }, [posts]);

  const allTags = useMemo(() => {
    return Array.from(tagCounts.keys()).sort();
  }, [tagCounts]);

  useEffect(() => {
    setPage(null);
  }, [query, activeTags, setPage]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        post.content.toLowerCase().includes(q);

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((tag) => post.tags.includes(tag));

      return matchesQuery && matchesTags;
    });
  }, [posts, query, activeTags]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleTag(tag: string) {
    setActiveTags((prev) => {
      const next = prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag];
      return next.length === 0 ? null : next;
    });
  }

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value || null)}
          placeholder="Search posts..."
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 transition-colors focus:border-brand-400/50 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery(null)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-1.5">
          {allTags.map((tag) => {
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-2.5 py-1 text-xs transition-all ${
                  isActive
                    ? 'border-brand-400/40 bg-brand-400/20 text-brand-400'
                    : 'border-white/[0.08] bg-white/[0.04] text-white/50 hover:border-white/20 hover:text-white/70'
                }`}
              >
                {capitalize(tag)} <span className="opacity-50">{tagCounts.get(tag)}</span>
              </button>
            );
          })}
          {activeTags.length > 0 && (
            <button
              onClick={() => setActiveTags(null)}
              className="rounded-full px-2.5 py-1 text-xs text-white/30 transition-colors hover:text-white/60"
            >
              All
            </button>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-white/30">No posts found</p>
      ) : (
        <>
          <AnimatePresence mode="popLayout">
            <div className="grid gap-4">
              {paginated.map((post, i) => (
                <MotionLink
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="group block cursor-pointer overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  {post.image && (
                    <div className="overflow-hidden border-b border-white/[0.06] sm:hidden">
                      <Image
                        src={post.image.src}
                        alt={post.title}
                        width={post.image.width}
                        height={post.image.height}
                        placeholder="blur"
                        blurDataURL={post.image.blurDataURL}
                        className="aspect-[2.4/1] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                  <div className="flex gap-5 p-4 sm:p-5">
                    <div className="min-w-0 flex-1">
                      <h2 className="mb-1 text-base font-semibold text-white/90 transition-colors group-hover:text-white sm:text-lg">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="mb-2 line-clamp-2 text-sm text-white/40">{post.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-white/30">
                        <time>{post.date}</time>
                        <span className="text-sm text-white/30">&middot;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime} min read
                        </span>
                        <span className="hidden text-sm text-white/30 sm:inline">&middot;</span>
                        <span className="hidden sm:inline">{post.wordCount.toLocaleString()} words</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleTag(tag);
                            }}
                          >
                            <span
                              className={`rounded-full border px-2 py-0.5 text-xs transition-colors ${
                                activeTags.includes(tag)
                                  ? 'border-brand-400/40 bg-brand-400/20 text-brand-400'
                                  : 'border-white/[0.08] bg-white/[0.04] text-white/40 hover:border-white/[0.15] hover:text-white/60'
                              }`}
                            >
                              {capitalize(tag)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    {post.image && (
                      <div className="hidden w-36 shrink-0 self-center overflow-hidden rounded-lg border border-white/[0.06] sm:block">
                        <Image
                          src={post.image.src}
                          alt={post.title}
                          width={post.image.width}
                          height={post.image.height}
                          placeholder="blur"
                          blurDataURL={post.image.blurDataURL}
                          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}
                  </div>
                </MotionLink>
              ))}
            </div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(page <= 2 ? null : page - 1)}
                disabled={page === 1}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-white/50 transition-all hover:border-white/20 hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p === 1 ? null : p)}
                  className={`h-8 w-8 rounded-lg font-mono text-sm transition-all ${
                    p === page
                      ? 'border border-brand-400/40 bg-brand-400/20 text-brand-400'
                      : 'border border-white/[0.08] bg-white/[0.04] text-white/50 hover:border-white/20 hover:text-white/80'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-white/50 transition-all hover:border-white/20 hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
