import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import styled from "@emotion/styled";

import { getAllProjects, getPaginatedProjects } from "lib/api";
import { useGetProjects } from "actions/projects";

import Projects from "components/Projects";
import PaginateBtn from "components/PaginateBtn";
import PreviewAlert from "components/PreviewAlert";

export default function Home({ initialData, preview }) {
  // State for offset page query
  const [offset, setOffset] = useState(0);

  // State for disabled buttons
  const [isFirst, setIsFirst] = useState(0);
  const [isLast, setIsLast] = useState(0);

  const { data: fetchedProjects, loading, error, mutate } = useGetProjects({
    offset,
    initialData,
  });

  const projects = fetchedProjects?.data;

  const { maxPage, firstData, lastData } = initialData;

  // Set Loading Based on router

  // Disable Pagination Button
  useEffect(() => {
    if (projects) {
      const firstDisplayed = projects[0]?.slug;
      const lastDisplayed = projects[projects.length - 1]?.slug;
      const isFirstTheSame = firstDisplayed === firstData;
      const isLastTheSame = lastDisplayed === lastData;

      setIsFirst(isFirstTheSame ? 1 : 0);
      setIsLast(isLastTheSame ? 1 : 0);
    }
  }, [projects]);

  // Conditional Rendering
  let content = null;
  if (loading) {
    content = <h3>Loading...</h3>;
  } else {
    content = (
      <>
        <h2>Projects</h2>
        <article className="projects-list">
          {fetchedProjects &&
            projects &&
            projects.map((project, index) => (
              <Projects key={index} project={project} />
            ))}
        </article>

        <PaginateBtn
          isFirst={isFirst}
          isLast={isLast}
          setOffset={setOffset}
          offset={offset}
          fetchedProjects={fetchedProjects}
          mutate={mutate}
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <HomeStyled>
        <section className="intro">
          <h1>Hi, I'm Umma Ahimsha</h1>
          <p>a web developer</p>
        </section>
        {/* {preview && <PreviewAlert />} */}
        {content}
      </HomeStyled>
    </>
  );
}

export const getStaticProps = async ({ preview = false }) => {
  const result = await getAllProjects();
  // Pass data to the page via props
  return {
    props: {
      initialData: {
        message: "Fetched Projects",
        data: result?.slice(0, 3),
        dataCount: result?.length,
        firstData: result ? result[0].slug : null,
        lastData: result ? result[result.length - 1].slug : null,
        maxPage: Math.ceil(result?.length / 3),
      },
    },
  };
};

const HomeStyled = styled.section`
  .intro {
    margin-bottom: 4rem;
    h1 {
      padding-right: 2rem;
      margin-bottom: 1rem;
    }
    p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
  }

  .projects-list {
    min-height: 30vh;
  }

  h2 {
    font-size: clamp(1.4rem, 5vw, 1.6rem);
  }
`;
