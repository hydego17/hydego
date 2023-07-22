import type { Metadata } from 'next';
import { getAboutPage } from '@/services/cms';

import BlockContent from '@/components/block-content';

export const metadata: Metadata = {
  title: 'About Me',
};

export default async function AboutPage() {
  const aboutPage = await getAboutPage();

  return (
    <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
      <div className='flex max-w-[980px] flex-col items-start gap-2'>
        <h1 className='text-3xl font-bold leading-tight tracking-tight md:text-4xl'>
          {aboutPage.title}
        </h1>
      </div>

      <hr />

      <div className='flex gap-4'>
        <BlockContent content={aboutPage.description} />
      </div>
    </section>
  );
}
