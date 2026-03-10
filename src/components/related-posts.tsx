import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { capitalize } from 'es-toolkit';
import type { PostMeta } from '@/lib/blog';

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-white/[0.08] pt-10">
      <h2 className="mb-6 text-lg font-semibold text-white/70">Related Posts</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 transition-all hover:border-white/[0.15] hover:bg-white/[0.04]"
          >
            <h3 className="mb-2 text-sm font-medium transition-colors group-hover:text-brand-400">
              {post.title}
            </h3>
            <div className="mb-3 flex items-center gap-2">
              <time className="font-mono text-xs text-white/30">{post.date}</time>
              <span className="text-xs text-white/30">&middot;</span>
              <span className="flex items-center gap-1 text-xs text-white/30">
                <Clock className="h-3 w-3" />
                {post.readingTime} min read
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/40"
                >
                  {capitalize(tag)}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-brand-400 opacity-0 transition-opacity group-hover:opacity-100">
              <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
