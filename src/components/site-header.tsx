import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-40 mt-8 w-full [backdrop-filter:saturate(100%)_blur(20px)]'>
      <div className='container flex items-center space-x-4 py-8 sm:justify-between sm:space-x-0'>
        <div className='flex gap-6 md:gap-10'>
          <nav className='flex gap-6'>
            {siteConfig.mainNav.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn('flex items-center font-medium text-muted-foreground hover:text-primary')}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-1'>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
