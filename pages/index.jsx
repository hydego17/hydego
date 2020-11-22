import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import styled from "@emotion/styled";

import { getInitialProjects } from "lib/api";

import Fade from "components/CardTransition";
import Projects from "components/Projects";
import PaginateBtn from "components/PaginateBtn";
import PreviewAlert from "components/PreviewAlert";

export default function Home({
  projects,
  firstData,
  lastData,
  maxPage,
  preview,
}) {
  //
  //
  const router = useRouter();

  // State for offset page query
  const [offset, setOffset] = useState(0);

  // State for the loading indicator
  const [isLoading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  // State for disabled buttons
  const [isFirst, setIsFirst] = useState(0);
  const [isLast, setIsLast] = useState(0);

  // Change pages based on query
  useEffect(() => {
    // Triggers fetch for new page
    const handlePagination = () => {
      const path = router.pathname;
      const query = router.query;
      query.page = offset;

      if (query.page >= maxPage) {
        setOffset(1);
      }

      router.push({
        pathname: path,
        query: query,
      });

      window.scrollTo(0, 0);
    };
    handlePagination();
  }, [offset, setOffset]);

  // Set Loading Based on router
  useEffect(() => {
    setIsMounted(!isLoading ? true : false);

    //After the component is mounted set router event handlers
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);
    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
    };
  }, [isLoading]);

  // Disable Pagination Button
  useEffect(() => {
    if (projects && firstData && lastData) {
      const firstDisplayed = projects[0]?.slug;
      const lastDisplayed = projects[projects.length - 1]?.slug;

      const isFirstTheSame = firstDisplayed === firstData;
      const isLastTheSame = lastDisplayed === lastData;

      setIsFirst(isFirstTheSame ? 1 : 0);
      setIsLast(isLastTheSame ? 1 : 0);
    }
  }, [projects, firstData, lastData]);

  // Conditional Rendering
  let content = null;
  if (isLoading) {
    content = <h3>Loading...</h3>;
  } else {
    content = (
      <>
        <h2>Projects</h2>
        <section className="projects-list">
          {isMounted &&
            projects.map((project, index) => (
              <Projects key={index} project={project} />
            ))}
        </section>

        <PaginateBtn isFirst={isFirst} isLast={isLast} setOffset={setOffset} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>hydego</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <HomeStyled>
        <section className="intro">
          <h1>Hi, I'm Umma Ahimsha</h1>
          <p>a web developer</p>
        </section>
        {preview && <PreviewAlert />}
        <article className="projects-wrapper">
          <Fade in={isMounted}>{content}</Fade>
        </article>
      </HomeStyled>
    </>
  );
}

export const getServerSideProps = async ({ query, preview = false }) => {
  const page = query.page || 0;
  const {
    data,
    firstData,
    lastData,
    currPage,
    maxPage,
  } = await getInitialProjects(page);

  // Pass data to the page via props
  return {
    props: {
      projects: data,
      firstData: firstData.current,
      lastData: lastData.current,
      currPage,
      maxPage,
      preview,
    },
  };
};

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
  .projects-wrapper {
    min-height: 80vh;
  }
  h2 {
    font-size: clamp(1.4rem, 5vw, 1.6rem);
  }
`;
