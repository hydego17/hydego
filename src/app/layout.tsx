import '@/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';

import { siteConfig } from '@/config/site';
import { DayJsProvider } from '@/lib/dayjs';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    'umma ahimsha',
    'web developer',
    'react',
    'next.js',
    'node.js,',
    'indonesia,',
    'freelance',
    'digital services',
    'web solutions',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <DayJsProvider />
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <div className='relative flex min-h-screen flex-col'>
              <SiteHeader />
              <main className='flex-1'>{children}</main>
              <SiteFooter />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </>
  );
}
