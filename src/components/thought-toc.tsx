'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link2, Check, ArrowLeft } from 'lucide-react';
import { FaXTwitter, FaLinkedinIn, FaRedditAlien, FaHackerNews } from 'react-icons/fa6';
import { FaRegCopy } from 'react-icons/fa';
import type { TocEntry } from '@/lib/thoughts';

type Props = {
  entries: TocEntry[];
  title: string;
  backHref: string;
  backLabel: string;
  desktop?: boolean;
};

export function ThoughtToc({ entries, title, backHref, backLabel, desktop }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const shareUrl = useMemo(() => typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '', []);
  const shareTitle = useMemo(() => encodeURIComponent(title), [title]);

  useEffect(() => {
    const headings = entries.map((e) => document.getElementById(e.id)).filter(Boolean) as HTMLElement[];
    if (headings.length === 0) return;

    const update = () => {
      let current: string | null = null;
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= 120) {
          current = el.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [entries]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const copyAnchor = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }, []);

  if (entries.length === 0) return null;

  if (desktop) {
    return (
      <aside className="sticky top-28 hidden self-start xl:block">
        <a
          href={backHref}
          className="mb-5 inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/50 transition-all hover:border-white/[0.15] hover:text-white/70"
        >
          <ArrowLeft className="h-3 w-3" />
          {backLabel}
        </a>

        <nav>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">Contents</p>
          <ul className="space-y-0.5 border-l border-white/[0.10]">
            {entries.map((entry) => (
              <li key={entry.id} className="group relative">
                <span
                  className={`absolute bottom-0 left-0 top-0 w-0.5 rounded-full transition-colors duration-200 ${
                    activeId === entry.id ? 'bg-brand-400' : 'bg-transparent'
                  }`}
                />
                <div className="flex items-center">
                  <button
                    onClick={() => scrollTo(entry.id)}
                    className={`block flex-1 py-1 text-left text-xs leading-snug transition-colors ${
                      entry.level === 3 ? 'pl-5' : 'pl-3'
                    } ${activeId === entry.id ? 'text-brand-400' : 'text-white/50 hover:text-white/70'}`}
                  >
                    {entry.text}
                  </button>
                  <button
                    onClick={(e) => copyAnchor(e, entry.id)}
                    className="shrink-0 p-1 text-white/25 opacity-0 transition-all hover:text-white/60 group-hover:opacity-100"
                    title="Copy link to section"
                  >
                    {copiedId === entry.id ? (
                      <Check className="h-3 w-3 text-brand-400" />
                    ) : (
                      <Link2 className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <TocShareButtons shareUrl={shareUrl} shareTitle={shareTitle} onCopyLink={copyLink} copiedLink={copiedLink} />
      </aside>
    );
  }

  return (
    <nav className="mb-8 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 xl:hidden">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">Contents</p>
      <ul className="space-y-1.5">
        {entries.map((entry) => (
          <li key={entry.id}>
            <button
              onClick={() => scrollTo(entry.id)}
              className={`block text-left text-sm transition-colors ${
                entry.level === 3 ? 'pl-4' : ''
              } ${activeId === entry.id ? 'text-brand-400' : 'text-white/40 hover:text-white/70'}`}
            >
              {entry.text}
            </button>
          </li>
        ))}
      </ul>
      <TocShareButtons shareUrl={shareUrl} shareTitle={shareTitle} onCopyLink={copyLink} copiedLink={copiedLink} />
    </nav>
  );
}

function TocShareButtons({
  shareUrl,
  shareTitle,
  onCopyLink,
  copiedLink,
}: {
  shareUrl: string;
  shareTitle: string;
  onCopyLink: () => void;
  copiedLink: boolean;
}) {
  return (
    <div className="mt-5 border-t border-white/[0.06] pt-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">Share</p>
      <div className="flex flex-wrap items-center gap-1.5">
        <a
          href={`https://x.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/40 transition-all hover:border-white/[0.15] hover:text-white/70"
          aria-label="Share on X"
        >
          <FaXTwitter size={12} />
          <span>Post</span>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/40 transition-all hover:border-white/[0.15] hover:text-white/70"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedinIn size={12} />
          <span>Share</span>
        </a>
        <a
          href={`https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/40 transition-all hover:border-white/[0.15] hover:text-white/70"
          aria-label="Share on Reddit"
        >
          <FaRedditAlien size={12} />
          <span>Reddit</span>
        </a>
        <a
          href={`https://news.ycombinator.com/submitlink?u=${shareUrl}&t=${shareTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/40 transition-all hover:border-white/[0.15] hover:text-white/70"
          aria-label="Share on Hacker News"
        >
          <FaHackerNews size={12} />
          <span>HN</span>
        </a>
        <button
          onClick={onCopyLink}
          className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/40 transition-all hover:border-white/[0.15] hover:text-white/70"
          aria-label="Copy link"
        >
          {copiedLink ? (
            <>
              <Check className="h-3 w-3 text-brand-400" />
              <span className="text-brand-400">Copied</span>
            </>
          ) : (
            <>
              <FaRegCopy size={11} />
              <span>Copy link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
