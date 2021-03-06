import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';

import { getSingleProject, getPaginatedProjects } from 'lib/api';
import { TProject, TProjects } from 'types/project';

import SeoContainer from 'components/SeoContainer';
import PreviewAlert from 'components/PreviewAlert';

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
            <BlockContent blocks={project.content} />
          </article>

          <article className="technology">
            <h2> Tools </h2>
            <small>{techStacks}</small>
          </article>

          <section className="links">
            <h2> Links </h2>
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
          </section>
        </section>

        <figure className="detail-image">
          <Image src={coverImage} alt={title} width={800} height={700} />
        </figure>
      </ProjectDetailStyled>
    </>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const project: TProject = await getSingleProject(params.slug, preview);

  return { props: { project, preview }, revalidate: 1 };
}

export async function getStaticPaths() {
  // Get all slugs from projects and provide it to paths
  const projects: TProjects = await getPaginatedProjects();

  const paths = projects?.map((p) => ({ params: { slug: p.slug } }));

  return { paths, fallback: true };
}

// Style
const ProjectDetailStyled = styled.section`
  padding: 0 0.5rem;

  .detail-image {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    padding: 0.25rem;
    /* width: 400px;
    height: 400px; */

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
