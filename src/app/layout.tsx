import '@/styles/globals.css';
import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import DayJsProvider from '@/lib/dayjs';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'web developer',
    'React',
    'Next.js',
    'Node.js,',
    'Indonesia,',
    'freelance',
    'digital services',
    'web solutions',
  ],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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
        </body>
      </html>
    </>
  );
}
