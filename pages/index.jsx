import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import axios from "axios";

import styled from "@emotion/styled";
import Head from "next/head";

import Projects from "components/Projects";
import Fade from "components/CardTransition";

export default function Home({ projects, firstData, lastData }) {
  const router = useRouter();

  const [offset, setOffset] = useState(0);

  //State for the loading indicator
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  // State for disabled buttons
  const [isFirst, setIsFirst] = useState(0);
  const [isLast, setIsLast] = useState(0);

  // Set Loading Based on router
  useEffect(() => {
    //After the component is mounted set router event handlers
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  // Change pages based on query
  useEffect(() => {
    // Triggers fetch for new page
    const handlePagination = () => {
      const path = router.pathname;
      const query = router.query;
      query.page = offset;

      router.push({
        pathname: path,
        query: query,
      });

      window.scrollTo(0, 0);
    };
    handlePagination();
  }, [offset]);

  // Disable Pagination Button
  useEffect(() => {
    const firstDisplayed = projects[0].slug;
    const lastDisplayed = projects[projects.length - 1].slug;

    const isFirstTheSame = firstDisplayed === firstData;
    const isLastTheSame = lastDisplayed === lastData;

    setIsFirst(isFirstTheSame ? 1 : 0);
    setIsLast(isLastTheSame ? 1 : 0);
  }, [projects, firstData, lastData]);

  //Generating projects list

  let content = null;
  if (isLoading) {
    content = <h3>Loading...</h3>;
  } else {
    content = (
      <>
        <h2>Projects</h2>
        <section className="projects-list">
          {projects &&
            projects.map((project, index) => (
              <Projects key={index} project={project} />
            ))}
        </section>

        <div className="pagination">
          <button disabled={isFirst} onClick={() => setOffset(offset - 1)}>
            Prev
          </button>
          <button disabled={isLast} onClick={() => setOffset(offset + 1)}>
            Next
          </button>
        </div>
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
        <article className="projects-wrapper">
          <Fade in={!isLoading}>{content}</Fade>
        </article>
      </HomeStyled>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  // Fetch the first page as default
  const page = query.page || 0;
  let projectsData = null;
  // Fetch data from API
  try {
    const { data } = await axios.get(
      `${process.env.FETCH_URL}/api/projects?page=${page}`
    );
    projectsData = data;
  } catch (err) {
    projectsData = { error: { message: err.message } };
  }
  // Pass data to the page via props
  return {
    props: {
      projects: projectsData.data,
      firstData: projectsData.firstData.current,
      lastData: projectsData.lastData.current,
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
      font-size: 0.9rem;

      &:hover {
        background: #d4d4d4;
      }

      &:disabled {
        color: #c9c9c9;
      }
    }
  }

  .projects-wrapper {
    min-height: 80vh;
  }
  h2 {
    font-size: clamp(1.4rem, 5vw, 1.6rem);
  }
`;
