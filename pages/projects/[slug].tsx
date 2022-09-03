import type { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { PortableText } from '@portabletext/react';

import { getSingleProject, getPaginatedProjects } from '@/data/projects';

import SeoContainer from '@/components/seo-container';
import PreviewAlert from '@/components/perview-alert';

export const getStaticProps = async ({ params, preview = false, previewData }) => {
  const project = await getSingleProject(params.slug, preview);

  return { props: { project, preview }, revalidate: 60 };
};

export const getStaticPaths = async () => {
  // Get all slugs from projects and provide it to paths
  const projects = await getPaginatedProjects();

  const paths = projects?.map((p) => ({ params: { slug: p.slug } }));

  return { paths, fallback: true };
};

export default function ProjectDetail({ project, preview }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <h2> Loading... </h2>;
  }

  const { title, techStacks, coverImage, link, code, subtitle } = project;

  return (
    <>
      <SeoContainer title={`${title} - Umma Ahimsha`} description={`${subtitle}`} image={coverImage} />

      <ProjectDetailStyled>
        <section className="detail-body">
          {preview && <PreviewAlert />}
          <header className="title">
            <h1>{title} </h1>
          </header>

          <hr />

          {!code && <h2>(Private Contract)</h2>}

          <article className="description">
            <h2> Case Study </h2>
            <PortableText value={project.content} />
          </article>

          <article className="technology">
            <h2> Tools </h2>
            <small>{techStacks}</small>
          </article>

          <section className="links">
            <h2> Links </h2>
            <small>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Site
              </a>
            </small>

            {code && (
              <small>
                <a href={code} target="_blank" rel="noopener noreferrer">
                  Code
                </a>
              </small>
            )}
          </section>
        </section>

        <figure className="detail-image">
          <Image src={coverImage} alt={title} width={800} height={700} />
        </figure>
      </ProjectDetailStyled>
    </>
  );
}

// Style
const ProjectDetailStyled = styled.section`
  .detail-image {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    padding: 0.25rem;

    @media screen and (min-width: 678px) {
      margin-right: 2rem;
      max-width: 250px;
      max-height: 200px;
    }
  }

  .detail-body {
    margin-bottom: 3rem;

    .title {
      padding-bottom: 1rem;
    }

    .description {
      padding: 1rem 0;

      p {
        padding: 0.5rem 0;
      }

      ul,
      ol {
        padding: 1rem 2rem;
        list-style: initial;

        li {
          padding: 0.2rem 0;
        }
      }
    }

    .technology {
      padding: 1rem 0;
    }

    .links {
      padding-top: 1rem;
      small {
        font-size: 1rem;
        padding-right: 0.5rem;
      }
    }
  }

  small {
    font-size: 14px;
  }

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
  }
`;
