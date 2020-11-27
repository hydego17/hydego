import styled from "@emotion/styled";
import Link from "next/link";
import { urlFor } from "lib/api";

export default function Projects({ project }) {
  const { title, subtitle, coverImage, slug, link } = project;

  return (
    <ProjectsStyled>
      <section className="project-card">
        <article className="card-body">
          <Link target="_blank" as={`projects/${slug}`} href="projects/[slug]">
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
            <small>
              <a href="#">Code</a>
            </small>
          </div>
        </article>
      </section>
    </ProjectsStyled>
  );
}

const ProjectsStyled = styled.article`
  .project-card {
    display: flex;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 1rem;
    padding: 1rem;
    transition: box-shadow 0.3s ease;

    .card-image {
      display: flex;
      align-items: center;
      padding: 0.2rem;
      flex-shrink: 1;
      overflow: hidden;
      border-radius: 5px;
      max-width: 225px;
      max-height: 160px;
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
  }
`;
