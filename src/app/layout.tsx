import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Providers } from '@/components/providers';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${siteConfig.url}/blog/feed.xml`,
    },
  },
  title: {
    default: 'NickCheckr | Is your nick available?',
    template: '%s | NickCheckr',
  },
  description:
    'Check if your nickname is available on 100+ websites instantly. Scan social media, developer platforms, and more.',
  openGraph: {
    siteName: 'NickCheckr',
    type: 'website',
    locale: 'en_US',
    images: ['/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          inter.variable,
          jetbrainsMono.variable,
        )}
      >
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
