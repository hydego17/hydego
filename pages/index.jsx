import { useState, useEffect } from "react";

import styled from "@emotion/styled";
import Head from "next/head";

import Layout from "components/Layout";
import Projects from "components/Projects";

import { getAllProjects } from "lib/api";
import { useGetProjects } from "hooks";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function Home({ initialData, testData }) {
  const [isLast, setIsLast] = useState(0);
  const [isFirst, setIsFirst] = useState(0);

  const [offset, setOffset] = useState(0);

  const { data: projects, error, loading } = useGetProjects({
    pageNum: offset,
    testData,
  });

  useEffect(() => {
    if (projects) {
      const firstProject = projects[0];
      const firstInit = initialData[0];
      const lastProject = projects[projects.length - 1];
      const lastInit = initialData[initialData.length - 1];
      const isFirstTheSame = firstProject.slug === firstInit.slug;
      const isLastTheSame = lastProject.slug === lastInit.slug;

      setIsFirst(isFirstTheSame ? 1 : 0);
      setIsLast(isLastTheSame ? 1 : 0);
    }
  }, [projects, initialData]);

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
        {error && <h2>Something is wrong...</h2>}
        {projects && (
          <>
            <h2>Projects</h2>

            <section className="projects-list">
              {projects.map((project, index) => (
                <Projects key={index} project={project} />
              ))}
            </section>

            <section className="pagination">
              <button onClick={() => setOffset(offset - 3)} disabled={isFirst}>
                <FaChevronLeft />
              </button>
              <button onClick={() => setOffset(offset + 3)} disabled={isLast}>
                <FaChevronRight />
              </button>
            </section>
          </>
        )}
      </HomeStyled>
    </Layout>
  );
}

const projectFields = `
title,
subtitle,
content,
techStacks,
coverImage,
link,
'slug':slug.current,
`;

export async function getStaticProps() {
  const initialData = await getAllProjects();
  const testData = await initialData.slice(0, 3);
  return { props: { initialData, testData } };
}

const HomeStyled = styled.section`
  .intro {
    margin-bottom: 2rem;
    h1 {
      font-size: clamp(1.85rem, 2.5vw, 4rem);
      padding-right: 2rem;
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
      padding: 0.3rem 0.4rem;
      margin-left: 0.5rem;
      border-radius: 2px;
      border: 0;
      outline: 0;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #8d8d8d;
      }
    }
  }

  h2 {
    font-size: clamp(1.4rem, 5vw, 1.6rem);
  }
`;
