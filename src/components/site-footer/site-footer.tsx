import React from 'react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

import { Icons } from '../icons';
import { buttonVariants } from '../ui/button';

export default function SiteFooter() {
  return (
    <footer className='mt-10 w-full bg-background'>
      <div className='container flex flex-col items-center py-8'>
        <div>
          <Link
            href={siteConfig.links.twitter}
            target='_blank'
            rel='noreferrer'
            aria-label='twitter'
          >
            <div
              className={buttonVariants({
                size: 'icon',
                variant: 'ghost',
                className: 'text-muted-foreground',
              })}
            >
              <Icons.twitter className='h-5 w-5' />
              <span className='sr-only'>Twitter</span>
            </div>
          </Link>
          <Link href={siteConfig.links.github} target='_blank' rel='noreferrer' aria-label='github'>
            <div
              className={buttonVariants({
                size: 'icon',
                variant: 'ghost',
                className: 'text-muted-foreground',
              })}
            >
              <Icons.gitHub className='h-5 w-5' />
              <span className='sr-only'>GitHub</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target='_blank'
            rel='noreferrer'
            aria-label='linkedin'
          >
            <div
              className={buttonVariants({
                size: 'icon',
                variant: 'ghost',
                className: 'text-muted-foreground',
              })}
            >
              <Icons.linkedin className='h-5 w-5' />
              <span className='sr-only'>LinkedIn</span>
            </div>
          </Link>
        </div>
        <div>
          <div className='copyright text-muted-foreground'>
            <small> Copyright © {new Date().getFullYear()} Umma Ahimsha</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
