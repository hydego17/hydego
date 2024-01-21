import type { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { getSecretDetail } from '@/services/cms';
import { generateImageUrl } from '@/lib/pocketbase';
import { Button } from '@/components/ui/button';
import BlockContent from '@/components/block-content';

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: PageProps, parent?: any): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const data = await getSecretDetail(slug);

  let imageUrl = '';

  if (data.image) {
    imageUrl = generateImageUrl(data, data.image);
  }

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: data.title,
    description: data.description,
    authors: [{ name: 'Umma Ahimsha', url: siteConfig.url }],
    creator: 'Umma Ahimsha',
    publisher: 'Umma Ahimsha',
    openGraph: {
      images: [imageUrl],
      title: data.title,
      description: data.description,
      type: 'article',
      authors: ['Umma Ahimsha'],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      creator: '@umma_ahimsha',
      images: [imageUrl],
    },
  };
}

export default async function SecretDetailpage({ params }: PageProps) {
  const slug = params.slug;

  if (slug) {
    const data = await getSecretDetail(slug);
    console.log(data);

    if (data) {
      return (
        <section className='container pb-8 pt-6 md:py-10'>
          <div className='flex max-w-[980px] flex-col items-start gap-2'>
            <h1 className='text-3xl font-bold leading-tight tracking-tight md:text-4xl'>
              {data.title}
            </h1>
          </div>

          <div className='md:max-w-[650px]'>
            <hr className='my-6' />

            <BlockContent content={data.content} />
          </div>
        </section>
      );
    }
  }

  return (
    <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
      <h1 className='text-4xl font-bold'>Ooopss...</h1>
      <div>Not Found</div>

      <hr />

      <Link href='/'>
        <Button>Back to Home</Button>
      </Link>
    </section>
  );
}
