'use client';

import Link from 'next/link';

import { PageContainer, Panel } from '@/components/page-shell';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <PageContainer>
      <Panel className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="font-mono text-sm text-brand-400">404</p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">This page doesn&apos;t exist</h1>
        <p className="max-w-md text-white/70">
          The link may be old, or the platform may have been removed from the catalogue.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonVariants()}>
            Check a nickname
          </Link>
          <Link href="/check" className={buttonVariants({ variant: 'outline' })}>
            Browse platforms
          </Link>
        </div>
      </Panel>
    </PageContainer>
  );
}
