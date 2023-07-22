import React from 'react';
import { getArchivePost } from '@/services/cms';
import dayjs from 'dayjs';

import BlockContent from '@/components/block-content';

export default async function ArchivePostPage({
  params,
}: {
  params: { slug?: string };
  searchParams: Record<string, any>;
}) {
  const slug = params.slug;

  if (slug) {
    const post = await getArchivePost(slug);

    if (post) {
      return (
        <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
          <div className='flex max-w-[980px] flex-col items-start gap-2'>
            <h1 className='text-3xl font-bold leading-tight tracking-tight md:text-4xl'>
              {post.title}
            </h1>
            <p className='text-sm text-muted-foreground'>{dayjs(post.date).format('LL')}</p>
          </div>

          <hr />

          <div>
            <BlockContent content={post.content} />
          </div>
        </section>
      );
    }
  }

  return (
    <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
      <div>Post Not Found</div>
    </section>
  );
}
