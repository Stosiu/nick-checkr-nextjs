'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import type { PostImage } from '@/lib/blog';

type Props = {
  html: string;
  coverImage?: PostImage | null;
  coverAlt?: string;
  coverCaption?: string;
};

type LightboxState = {
  src: string;
  alt: string;
  naturalWidth?: number;
  naturalHeight?: number;
};

export function BlogContent({ html, coverImage, coverAlt, coverCaption }: Props) {
  const proseRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [visible, setVisible] = useState(false);

  const openLightbox = useCallback((src: string, alt: string, naturalWidth?: number, naturalHeight?: number) => {
    setLightbox({ src, alt, naturalWidth, naturalHeight });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setVisible(false);
    setTimeout(() => setLightbox(null), 200);
  }, []);

  useEffect(() => {
    const el = proseRef.current;
    if (!el) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const img = target as HTMLImageElement;
        openLightbox(img.src, img.alt, img.naturalWidth, img.naturalHeight);
      }
    };

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [openLightbox]);

  useEffect(() => {
    const el = proseRef.current;
    if (!el) return;

    const headings = el.querySelectorAll('h2[id], h3[id], h4[id]');
    headings.forEach((heading) => {
      const id = heading.getAttribute('id');
      if (!id) return;

      heading.classList.add('group', 'relative');
      const anchor = document.createElement('a');
      anchor.href = `#${id}`;
      anchor.className = 'blog-heading-anchor';
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '14');
      svg.setAttribute('height', '14');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path1.setAttribute('d', 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71');
      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path2.setAttribute('d', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71');
      svg.appendChild(path1);
      svg.appendChild(path2);
      anchor.appendChild(svg);
      anchor.setAttribute('aria-label', `Link to ${heading.textContent}`);
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(url);
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        window.history.replaceState(null, '', `#${id}`);
      });
      heading.prepend(anchor);
    });
  }, [html]);

  useEffect(() => {
    if (!lightbox) return;

    const preventScroll = (e: Event) => e.preventDefault();
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightbox, closeLightbox]);

  return (
    <>
      {coverImage && (
        <figure className="mb-8 text-center">
          <div
            className="inline-block cursor-zoom-in overflow-hidden rounded-lg border border-white/[0.06]"
            onClick={() => {
              openLightbox(coverImage.src, coverAlt ?? '', coverImage.width, coverImage.height);
            }}
          >
            <Image
              src={coverImage.src}
              alt={coverAlt ?? ''}
              width={coverImage.width}
              height={coverImage.height}
              placeholder="blur"
              blurDataURL={coverImage.blurDataURL}
              className="h-auto w-full transition-opacity hover:opacity-90"
              priority
            />
          </div>
          {coverCaption && (
            <figcaption className="mt-2 text-sm italic text-white/40">{coverCaption}</figcaption>
          )}
        </figure>
      )}

      <div
        ref={proseRef}
        className="prose prose-invert prose-blog max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          naturalWidth={lightbox.naturalWidth}
          naturalHeight={lightbox.naturalHeight}
          visible={visible}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

type LightboxProps = {
  src: string;
  alt: string;
  naturalWidth?: number;
  naturalHeight?: number;
  visible: boolean;
  onClose: () => void;
};

function Lightbox({ src, alt, naturalWidth, naturalHeight, visible, onClose }: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-[99990] flex cursor-zoom-out items-center justify-center p-10"
      onClick={onClose}
      style={{
        background: visible ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0)',
        backdropFilter: visible ? 'blur(8px)' : 'blur(0px)',
        transition: 'background 0.2s ease, backdrop-filter 0.2s ease',
      }}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-10 rounded-lg border border-white/[0.15] bg-white/[0.08] p-2 text-white/60 transition-all hover:bg-white/[0.12] hover:text-white"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <img
        src={src}
        alt={alt}
        className="rounded-lg"
        style={{
          maxWidth: naturalWidth ? Math.min(naturalWidth, typeof window !== 'undefined' ? window.innerWidth - 80 : 1200) : undefined,
          maxHeight: naturalHeight ? Math.min(naturalHeight, typeof window !== 'undefined' ? window.innerHeight - 80 : 800) : undefined,
          objectFit: 'contain',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      />
    </div>
  );
}
