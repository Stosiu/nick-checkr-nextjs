'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/check', label: 'Platforms' },
  { href: '/blog', label: 'Blog', showCount: true },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function NavbarClient({ blogCount }: { blogCount: number }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-2.5 md:py-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => { setOpen(false); window.scrollTo(0, 0); }}>
          <Image src="/favicon-32x32.png" alt="" width={24} height={24} className="shrink-0" />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Nick</span>
            <span className="text-brand-400">Checkr</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center md:flex">
          <div className="flex items-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-1 py-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-[13px] tracking-wide transition-all hover:bg-white/[0.06] hover:text-white/90 ${
                  pathname.startsWith(link.href)
                    ? 'bg-white/[0.06] text-white/90'
                    : 'text-white/40'
                }`}
              >
                {link.label}
                {link.showCount && blogCount > 0 && (
                  <span className="ml-1.5 font-mono text-[10px] text-white/20">
                    {blogCount}
                  </span>
                )}
              </Link>
            ))}
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="relative z-50 rounded-lg p-2 text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu overlay — positioned absolute so it floats over page content */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => { setOpen(false); window.scrollTo(0, 0); }}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute left-0 right-0 top-full z-50 border-t border-white/[0.06] bg-black md:hidden"
            >
            <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => { setOpen(false); window.scrollTo(0, 0); }}
                    className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm tracking-wide transition-colors hover:bg-white/[0.06] ${
                      pathname.startsWith(link.href)
                        ? 'bg-white/[0.04] text-white'
                        : 'text-white/50'
                    }`}
                  >
                    {link.label}
                    {link.showCount && blogCount > 0 && (
                      <span className="font-mono text-[10px] text-white/20">
                        {blogCount}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
                className="mt-2"
              >
                <Link
                  href="/"
                  onClick={() => { setOpen(false); window.scrollTo(0, 0); }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all hover:bg-brand-400"
                >
                  Check Nickname
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
