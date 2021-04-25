import { FC, useState } from 'react';

import styled from '@emotion/styled';

import { getAllProjects } from 'lib/api';
import { useGetProjects } from 'hooks/projects';

import Projects from 'components/Projects';
import PaginateBtn from 'components/PaginateBtn';
import PreviewAlert from 'components/PreviewAlert';
import SeoContainer from 'components/SeoContainer';

import { TProjects, TApiProject } from 'types/project';

type HomeProps = {
  initialData: TApiProject;
  preview: any;
};

const Home: FC<HomeProps> = ({ initialData, preview }) => {
  // State for offset page query
  const [offset, setOffset] = useState(0);

  // Loading Mutate state
  const [loadingMutate, setLoadingMutate] = useState(false);

  const { data: fetchedProjects, loading, error, mutate } = useGetProjects({
    offset,
    initialData,
  });

  const projects = fetchedProjects?.data;

  // Conditional Rendering
  let content = null;

  if (loading) {
    content = <h3>Loading...</h3>;
  } else {
    content = (
      <>
        <h2>Projects</h2>
        <article className="projects-list">
          <>
            {error ? (
              <div className="loading-info">Ups...Something went wrong</div>
            ) : loadingMutate ? (
              <div className="loading-info">Loading...</div>
            ) : (
              <> {projects && projects.map((project, index) => <Projects key={index} project={project} />)}</>
            )}
          </>
        </article>

        {!error && (
          <PaginateBtn
            initialData={initialData}
            setOffset={setOffset}
            fetchedProjects={fetchedProjects}
            mutate={mutate}
            setLoadingMutate={setLoadingMutate}
          />
        )}
      </>
    );
  }

  return (
    <>
      <SeoContainer />
      <HomeStyled>
        <section className="intro">
          <h1>Hi, I'm Umma Ahimsha</h1>
          <p>a web developer</p>
        </section>
        {preview && <PreviewAlert />}
        {content}
      </HomeStyled>
    </>
  );
};

export async function getStaticProps() {
  const result: TProjects = await getAllProjects();

  // Pass data to the page via props
  return {
    props: {
      initialData: {
        message: 'Fetched Projects',
        data: result?.slice(0, 3),
        dataCount: result?.length,
        firstData: result ? result[0].slug : null,
        lastData: result ? result[result.length - 1].slug : null,
        maxPage: Math.ceil(result?.length / 3),
      },
    },
    revalidate: 1,
  };
}

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

    .loading-info {
      margin-top: 1rem;
      animation: fadeIn ease 0.3s 1;
      -webkit-animation: fadeIn ease 0.3s 1;
    }
  }

  h2 {
    font-size: clamp(1.4rem, 5vw, 1.6rem);
  }
`;

export default Home;
