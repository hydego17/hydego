import type { Metadata } from 'next';
import Link from 'next/link';
import dayjs from 'dayjs';

import { siteConfig } from '@/config/site';
import { getArchivePost } from '@/services/cms';
import { Button } from '@/components/ui/button';
import BlockContent from '@/components/block-content';

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const post = await getArchivePost(slug);

  return {
    title: post.title,
    description:
      'an archive from a collection of writings, poetry and proses that I have ever written.',
    authors: [{ name: 'Umma Ahimsha', url: siteConfig.url }],
    creator: 'Umma Ahimsha',
    publisher: 'Umma Ahimsha',
    openGraph: {
      title: post.title,
      type: 'article',
      authors: ['Umma Ahimsha'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      creator: '@umma_ahimsha',
    },
  };
}

export default async function ArchivePostPage({ params }: PageProps) {
  const slug = params.slug;

  if (slug) {
    const post = await getArchivePost(slug);

    if (post) {
      return (
        <section className='container pb-8 pt-6 md:py-10'>
          <div className='flex max-w-[980px] flex-col items-start gap-2'>
            <h1 className='text-3xl font-bold leading-tight tracking-tight md:text-4xl'>
              {post.title}
            </h1>
            <p className='text-sm text-muted-foreground'>{dayjs(post.date).format('LL')}</p>
          </div>

          <div className='md:max-w-[650px]'>
            <hr className='my-6' />

            <BlockContent content={post.content} />
          </div>
        </section>
      );
    }
  }

  return (
    <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
      <h1 className='text-4xl font-bold'>Ooopss...</h1>
      <div>Post Not Found</div>

      <hr />

      <Link href='/archives'>
        <Button>Back to archives</Button>
      </Link>
    </section>
  );
}
