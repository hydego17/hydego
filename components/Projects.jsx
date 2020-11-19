import styled from "@emotion/styled";
import Link from "next/link";
import { urlFor } from "lib/api";

export default function Projects({ project }) {
  const { title, subtitle, coverImage, slug, link } = project;

  return (
    <ProjectsStyled>
      <section className="project-card">
        <figure className="card-image">
          <img src={urlFor(coverImage).url()} alt={title} />
        </figure>

        <article className="card-body">
          <Link target="_blank" as={`projects/${slug}`} href="projects/[slug]">
            <a className="project-title">
              <h3>{title}</h3>
            </a>
          </Link>

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
    border: 1px solid #ededed;
    padding: 1rem;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
    }

    .card-image {
      padding: 0.2rem;
      border: 1px solid #ededed;
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
      margin-bottom: 0.5rem;
      border-bottom: 1px solid #ededed;
    }

    .links {
      display: flex;
      margin-top: 1rem;

      small {
        padding-right: 0.5rem;
      }
      a {
        &:hover {
          color: #507496;
        }
      }
    }
  }
`;
