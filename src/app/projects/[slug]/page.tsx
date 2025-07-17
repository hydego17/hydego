import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { getProjectDetail } from '@/services/cms';
import { generateImageUrl } from '@/lib/pocketbase';
import { Button } from '@/components/ui/button';
import BlockContent from '@/components/block-content';
import { Icons } from '@/components/icons';

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent?: any
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const project = await getProjectDetail(slug);

  const imageUrl = generateImageUrl(project, project.cover_image);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: project.title,
    description: project.subtitle,
    authors: [{ name: 'Umma Ahimsha', url: siteConfig.url }],
    creator: 'Umma Ahimsha',
    publisher: 'Umma Ahimsha',
    openGraph: {
      images: [imageUrl, ...previousImages],
      title: project.title,
      description: project.description,
      type: 'article',
      authors: ['Umma Ahimsha'],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      creator: '@umma_ahimsha',
      images: [imageUrl],
    },
  };
}

export default async function ProjectDetailpage({
  params,
}: {
  params: { slug?: string };
  searchParams: Record<string, any>;
}) {
  const slug = params.slug;

  if (slug) {
    const project = await getProjectDetail(slug);

    if (project) {
      return (
        <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
          <div className='flex max-w-[980px] flex-col items-start gap-2'>
            <h1 className='text-2xl font-bold leading-tight tracking-tight md:text-3xl'>
              {project.title}
            </h1>
          </div>

          <hr />

          <section className='space-y-10'>
            <div className='space-y-4'>
              <h2 className='text-lg font-bold'>Case Study</h2>
              <BlockContent content={project.description} />
            </div>

            {project.techs && (
              <div className='space-y-2'>
                <h2 className='text-lg font-bold'>Tools</h2>
                <p>{project.techs}</p>
              </div>
            )}

            <div className='space-y-2'>
              <h2 className='text-lg font-bold'>Links</h2>
              <div className='flex items-center gap-4'>
                {project.link && (
                  <div>
                    <Link href={project.link} target='_blank' rel='noreferrer'>
                      <div className='flex items-center gap-2 rounded-md border border-transparent bg-secondary p-2.5 text-secondary-foreground hover:border-primary/10'>
                        <Icons.globe className='h-4 w-4' />
                        <span className='sr-only'>Link</span>
                      </div>
                    </Link>
                  </div>
                )}

                {project.repo && (
                  <Link href={project.repo} target='_blank' rel='noreferrer'>
                    <div className='rounded-md border border-transparent bg-secondary p-2.5 text-secondary-foreground hover:border-primary/10'>
                      <Icons.gitHub className='h-4 w-4' />
                      <span className='sr-only'>Repo</span>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            <div className='space-y-2'>
              <h2 className='text-lg font-bold'>Preview</h2>

              <div className='mt-3 grid grid-cols-1 gap-4 rounded bg-muted p-4 sm:grid-cols-2'>
                <div className='relative aspect-video'>
                  <Image
                    src={generateImageUrl(project, project.cover_image)}
                    alt={project.title}
                    fill
                    sizes='(max-width: 640px) 200px, 300px'
                    className='border object-cover'
                  />
                </div>
                {project.images.map((image, idx) => (
                  <div key={image} className='relative aspect-video'>
                    <Image
                      src={generateImageUrl(project, image)}
                      alt=''
                      fill
                      sizes='(max-width: 640px) 200px, 300px'
                      className='aspect-video object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
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
