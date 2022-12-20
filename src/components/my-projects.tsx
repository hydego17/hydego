import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';

import type { TProject } from '@/types/project';

type ProjectProps = {
  project: TProject;
};

export default function Projects({ project }: ProjectProps) {
  return (
    <ProjectsStyled className="project-card">
      <figure className="card-image">
        <Image src={project.coverImage} alt={project.title} width={200} height={100} />
      </figure>

      <article className="card-body">
        <Link as={`/projects/${project.slug}`} href="/projects/[slug]" className="project-title">
          <h3>{project.title}</h3>
        </Link>

        <hr />

        <p>{project.subtitle}</p>

        <div className="links">
          <small>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Site
            </a>
          </small>

          {project.code && (
            <small>
              <a href={project.code} target="_blank" rel="noopener noreferrer">
                Code
              </a>
            </small>
          )}
        </div>
      </article>
    </ProjectsStyled>
  );
}

const ProjectsStyled = styled.article`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 1rem;
  padding: 1rem;
  transition: box-shadow 0.5s ease;
  animation: fadeIn ease 0.5s 1;
  -webkit-animation: fadeIn ease 0.5s 1;

  .card-body {
    width: 100%;

    p {
      line-height: 1.5;
    }
  }

  .card-image {
    display: flex;
    width: 165px;
    aspect-ratio: 4/3;
    overflow: hidden;
    border-radius: 5px;

    @media screen and (max-width: 678px) {
      display: none;
    }
  }

  .project-title {
    display: block;

    &:hover {
      text-decoration: underline;
    }

    padding-bottom: 0.5rem;
  }

  .links {
    display: flex;
    margin-top: 1rem;

    small {
      padding-right: 0.5rem;
    }
  }

  hr {
    padding: 0.25rem;
  }
`;
