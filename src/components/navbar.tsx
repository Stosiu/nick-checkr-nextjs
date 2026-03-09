import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPostCount } from '@/lib/blog-count';

export function Navbar() {
  const blogCount = getPostCount();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="text-white">Nick</span>
          <span className="text-brand-400">Checkr</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-white/50 transition-all hover:border-white/[0.15] hover:text-white/70"
          >
            Blog
            {blogCount > 0 && (
              <>
                <span className="text-white/20">&middot;</span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
                  {blogCount}
                </span>
              </>
            )}
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-1.5 text-xs font-medium text-white shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all hover:bg-brand-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]"
          >
            Check Nickname
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
