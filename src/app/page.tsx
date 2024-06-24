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
          a web developer from Indonesia, dedicated to creating web apps and seamless digital
          experiences.
        </p>
      </div>

      <div className='mt-10'>
        <h2 className='text-2xl font-bold'>Projects</h2>

        <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2'>
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
    <div className='group flex flex-col gap-6 rounded-md border p-4 shadow-slate-200 transition-shadow hover:shadow-md dark:shadow-zinc-800 md:p-5'>
      <div className='relative mt-0.5 aspect-video h-auto w-full'>
        <Image
          src={imageUrl}
          alt={project.title}
          priority
          fill
          sizes='300px, (min-width: 768px) 300px'
          className='h-auto w-auto rounded border object-cover'
        />
      </div>

      <div className='flex flex-1 flex-col justify-between gap-4 md:py-0.5'>
        <div>
          <Link href={`/projects/${project.slug}`}>
            <h3 className='text-lg font-bold group-hover:underline'>{project.title}</h3>
          </Link>
          <p className='mt-2 line-clamp-2 text-mini text-muted-foreground'>{project.subtitle}</p>
        </div>

        <div className='flex gap-3'>
          {project.link && (
            <Link href={project.link} target='_blank' rel='noreferrer'>
              <div className='rounded-md border border-transparent bg-secondary p-2 text-secondary-foreground hover:border-primary/10'>
                <Icons.globe className='h-3.5 w-3.5' />
                <span className='sr-only'>Link</span>
              </div>
            </Link>
          )}

          {project.repo && (
            <Link href={project.repo} target='_blank' rel='noreferrer'>
              <div className='rounded-md border border-transparent bg-secondary p-2 text-secondary-foreground hover:border-primary/10'>
                <Icons.gitHub className='h-3.5 w-3.5' />
                <span className='sr-only'>Repo</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
