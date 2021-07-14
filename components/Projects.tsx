import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';
import { TProject } from 'types/project';

type ProjectProps = {
  project: TProject;
};

const Projects: FC<ProjectProps> = ({ project }) => {
  const { title, subtitle, coverImage, slug, link, code } = project;

  return (
    <ProjectsStyled className="project-card">
      <figure className="card-image">
        <Image src={coverImage} alt={title} width={150} height={120} />
      </figure>
      <article className="card-body">
        <Link as={`projects/${slug}`} href="projects/[slug]">
          <a className="project-title">
            <h3>{title}</h3>
          </a>
        </Link>

        <hr />

        <p>{subtitle}</p>

        <div className="links">
          <small>
            <a href={link} target="_blank" rel="noopener">
              Site
            </a>
          </small>

          {code && (
            <small>
              <a href={code} target="_blank" rel="noopener">
                Code
              </a>
            </small>
          )}
        </div>
      </article>
    </ProjectsStyled>
  );
};

const ProjectsStyled = styled.article`
  width: 100%;
  display: flex;
  align-items: center;
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
    align-items: center;
    padding: 0.2rem;
    flex-shrink: 1;
    overflow: hidden;
    border-radius: 5px;
    margin-right: 2rem;

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

export default Projects;
