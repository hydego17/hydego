import type { Metadata } from 'next';
import Link from 'next/link';
import dayjs from 'dayjs';

import { getArchives } from '@/services/cms';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of writings, poetry and proses that I have ever written.',
};

export default async function ArchivesPage() {
  const archives = await getArchives();

  return (
    <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
      <div className='flex max-w-[980px] flex-col items-start gap-2'>
        <h1 className='text-3xl font-bold leading-tight tracking-tight md:text-4xl'>Archives</h1>
      </div>

      <div></div>

      <ul className='divide-y'>
        {archives.items.map((archive) => (
          <li className='space-y-1 py-3'>
            <p className='text-sm tracking-tight text-muted-foreground md:text-sm'>
              {dayjs(archive.date).format('ll')}
            </p>

            <Link
              href={`/archives/${archive.slug}`}
              className='inline-block font-semibold text-gray-700 hover:underline dark:text-gray-300 md:text-lg'
            >
              {archive.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
