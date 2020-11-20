import { useState, useEffect } from "react";

import styled from "@emotion/styled";
import Head from "next/head";

import Layout from "components/Layout";
import Projects from "components/Projects";

import { useGetProjects } from "hooks";
import { getAllProjects } from "lib/api";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function Home({ initialData }) {
  const { data: projects, loading, error } = useGetProjects(initialData);

  const [myProjects, setMyProjects] = useState([]);
  const [isLast, setIsLast] = useState(0);
  const [isFirst, setIsFirst] = useState(0);

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (projects) {
      const pages = [...projects.slice(page, page + 3)];
      setMyProjects(pages);

      const disabledNext =
        pages[pages.length - 1] === projects[projects.length - 1];

      const disabledPrev = pages[0] === projects[0];

      setIsLast(disabledNext ? 1 : 0);
      setIsFirst(disabledPrev ? 1 : 0);
    }
  }, [projects, page, setIsLast]);

  return (
    <Layout>
      <Head>
        <title>hydego</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <HomeStyled>
        <section className="intro">
          <h1>Hi, I'm Umma Ahimsha</h1>
          <p>a web developer</p>
        </section>

        {loading && <h2>Loading...</h2>}
        {error && <h2>Oops...something is wrong</h2>}
        {projects && (
          <>
            <h2>Projects</h2>

            <section className="projects-list">
              {myProjects.map((project, index) => (
                <Projects key={index} project={project} />
              ))}
            </section>

            <section className="pagination">
              <button onClick={() => setPage(page - 3)} disabled={isFirst}>
                <FaChevronLeft />
              </button>
              <button onClick={() => setPage(page + 3)} disabled={isLast}>
                <FaChevronRight />
              </button>
            </section>
          </>
        )}
      </HomeStyled>
    </Layout>
  );
}

export async function getStaticProps() {
  const initialData = await getAllProjects();

  return { props: { initialData } };
}

const HomeStyled = styled.section`
  .intro {
    margin-bottom: 2rem;
    h1 {
      font-size: 2.2rem;
      margin-bottom: 1rem;
    }
    p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
  }

  .pagination {
    float: right;
    padding: 2rem 0;

    button {
      outline: 0;
      background: #000000;
      color: #ffffff;
      border-radius: 2px;
      border: 0;
      margin-left: 0.5rem;
      cursor: pointer;
      font-size: 1rem;
      padding: 0.3rem;

      &:hover {
        background: #383838;
      }

      &:disabled {
        background: #f0f0f0;
        color: #424242;
      }
    }
  }
`;
