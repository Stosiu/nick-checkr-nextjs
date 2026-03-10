import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getPostCount } from '@/lib/blog-count';

export function Navbar() {
  const blogCount = getPostCount();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5"
        >
          <Image
            src="/favicon-32x32.png"
            alt=""
            width={24}
            height={24}
            className="shrink-0"
          />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Nick</span>
            <span className="text-brand-400">Checkr</span>
          </span>
        </Link>

        <div className="flex items-center">
          <div className="flex items-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-1 py-1">
            <Link
              href="/check"
              className="rounded-full px-4 py-1.5 text-[13px] tracking-wide text-white/40 transition-all hover:bg-white/[0.06] hover:text-white/90"
            >
              Platforms
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] tracking-wide text-white/40 transition-all hover:bg-white/[0.06] hover:text-white/90"
            >
              Blog
              {blogCount > 0 && (
                <span className="font-mono text-[10px] text-white/20">
                  {blogCount}
                </span>
              )}
            </Link>
            <Link
              href="/about"
              className="rounded-full px-4 py-1.5 text-[13px] tracking-wide text-white/40 transition-all hover:bg-white/[0.06] hover:text-white/90"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-4 py-1.5 text-[13px] tracking-wide text-white/40 transition-all hover:bg-white/[0.06] hover:text-white/90"
            >
              Contact
            </Link>
          </div>

          <div className="mx-3 h-5 w-px bg-white/[0.08]" />

          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2 text-[13px] font-semibold tracking-wide text-white shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all hover:bg-brand-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            Check Nickname
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
