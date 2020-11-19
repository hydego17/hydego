import styled from "@emotion/styled";
import Head from "next/head";

import Layout from "components/Layout";
import Projects from "components/Projects";

import { getAllProjects } from "lib/api";

export default function Home({ projects }) {
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

      <h2>Projects</h2>
      {projects.map((project, index) => (
        <Projects key={index} project={project} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const projects = await getAllProjects();
  return { props: { projects } };
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
