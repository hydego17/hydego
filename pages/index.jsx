import { useState } from "react";

import styled from "@emotion/styled";
import Head from "next/head";

import Layout from "components/Layout";
import Projects from "components/Projects";

import { getAllProjects } from "lib/api";
import { useGetProjects } from "hooks";

export default function Home({ initialData }) {
  const [pageIndex, setPageIndex] = useState(0);

  const { data: projects, loading, error } = useGetProjects(initialData);

  return (
    <Layout>
      <Head>
        <title>hydego</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <HomeStyled>
        <h1>Hi, I'm Umma Ahimsha</h1>
        <p>a web developer</p>
      </HomeStyled>

      {loading && <h2> Loading...</h2>}

      {projects && (
        <>
          <h2>Projects</h2>
          {projects.map((project, index) => (
            <Projects key={index} project={project} />
          ))}
        </>
      )}

      {error && <h2> No data at the moment, Sorry... </h2>}
    </Layout>
  );
}

export async function getStaticProps() {
  const initialData = await getAllProjects({ offset: 0 });

  // Sort projects based on createdAt (newest to oldest )
  // const initialData = projects?.sort(
  //   (newest, oldest) =>
  //     new Date(oldest._createdAt) - new Date(newest._createdAt)
  // );
  return { props: { initialData } };
}

const HomeStyled = styled.section`
  margin-bottom: 2rem;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
`;
