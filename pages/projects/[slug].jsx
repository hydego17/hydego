import styled from "@emotion/styled";
import BlockContent from "@sanity/block-content-to-react";

import { urlFor } from "lib/api";
import { getSingleProject, getAllProjects } from "lib/api";

import Layout from "components/Layout";

export default function ProjectDetail({ project }) {
  const { title, techStacks, coverImage, link } = project;
  return (
    <Layout>
      <ProjectDetailStyled>
        <section className="detail-body">
          <header className="title">
            <h2>{title}</h2>
          </header>

          <article className="description">
            <h3> Case Study </h3>
            <BlockContent blocks={project.content} />
          </article>

          <article className="technology">
            <h3> Stack </h3>
            <small>{techStacks}</small>
          </article>

          <section className="links">
            <small>
              <a href={link} target="_blank" rel="noopener">
                Site
              </a>
            </small>
            <small>
              <a href="#">Code</a>
            </small>
          </section>
        </section>

        <figure className="detail-image">
          <img src={urlFor(coverImage)} alt={title} />
        </figure>
      </ProjectDetailStyled>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const project = await getSingleProject(params.slug);

  return { props: { project } };
}

export async function getStaticPaths() {
  // Get all slugs from projects and provide it to paths
  const projects = await getAllProjects();

  const paths = projects?.map((p) => {
    return {
      params: { slug: p.slug },
    };
  });

  return { paths, fallback: false };
}

const ProjectDetailStyled = styled.section`
  padding: 0 0.5rem;

  .detail-image {
    overflow: hidden;
    border-radius: 5px;
    padding: 0.25rem;
    border: 1px solid #ededed;

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
      border-bottom: 1px solid #ededed;
    }

    .description {
      padding: 1.5rem 0 1rem 0;

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
        padding-right: 0.5rem;
      }
    }
  }

  small {
    font-size: 14px;
  }

  h3 {
    padding-bottom: 0.5rem;
  }
`;
