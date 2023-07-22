import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/services/cms';

import { generateImageUrl } from '@/lib/pocketbase';
import { Icons } from '@/components/icons';

export default async function IndexPage() {
  const projects = await getProjects();

  return (
    <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
      <div className='flex max-w-[980px] flex-col items-start gap-2'>
        <h1 className='text-3xl font-bold leading-tight tracking-tight md:text-4xl'>{`Hi, I'm Umma Ahimsha`}</h1>
        <p className='max-w-[700px] text-lg text-muted-foreground'>
          a web developer from Indonesia, dedicated to creating web apps and seamless digital experiences.
        </p>
      </div>

      <div className='mt-10'>
        <h2 className='text-2xl font-bold md:text-3xl'>Projects</h2>

        <div className='mt-8 space-y-6'>
          {projects.items.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ project }: { project: Project }) {
  const imageUrl = generateImageUrl(project, project.cover_image);

  return (
    <div className='group flex gap-4 rounded-md border p-4 shadow-slate-200 transition-all hover:shadow-md dark:shadow-slate-800 md:gap-6 md:p-5'>
      <div className='mt-0.5 aspect-square h-auto w-[17%]'>
        <Image
          src={imageUrl}
          alt={project.title}
          width={250}
          height={200}
          className='aspect-square h-auto w-full rounded-lg border object-cover'
        />
      </div>

      <div className='flex flex-1 flex-col justify-between gap-4 md:py-0.5'>
        <div>
          <Link href={`/projects/${project.slug}`}>
            <h3 className='text-mini font-bold group-hover:underline md:text-lg'>
              {project.title}
            </h3>
          </Link>
          <p className='mt-2 line-clamp-2 text-xs text-muted-foreground md:text-sm'>
            {project.subtitle}
          </p>
        </div>

        <div className='flex gap-3'>
          {project.link && (
            <Link href={project.link} target='_blank' rel='noreferrer'>
              <div className='rounded-md border border-transparent bg-secondary p-2 text-secondary-foreground hover:border-primary/10'>
                <Icons.globe className='h-3 w-3 md:h-3.5 md:w-3.5' />
                <span className='sr-only'>Link</span>
              </div>
            </Link>
          )}

          {project.repo && (
            <Link href={project.repo} target='_blank' rel='noreferrer'>
              <div className='rounded-md border border-transparent bg-secondary p-2 text-secondary-foreground hover:border-primary/10'>
                <Icons.gitHub className='h-3 w-3 md:h-3.5 md:w-3.5' />
                <span className='sr-only'>Repo</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
