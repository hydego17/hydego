import { useState, useRef } from 'react';
import { NextPage } from 'next';
import styled from '@emotion/styled';

import { TProjects } from 'types/project';
import { getInitialProjects } from 'lib/api';
import { useGetProjects } from 'hooks/projects';
import { usePaginator } from 'hooks/usePaginator';

import Projects from 'components/Projects';
import PaginateBtn from 'components/PaginateBtn';
import PreviewAlert from 'components/PreviewAlert';
import SeoContainer from 'components/SeoContainer';
import { Paginator } from 'components/Pagination';
import { useTheme } from 'next-themes';

// set page size constant
const PAGE_SIZE = 3;

export async function getStaticProps() {
  const { initialData, totalData } = await getInitialProjects({ limit: PAGE_SIZE });

  // Pass data to the page via props
  return {
    props: {
      initialData,
      totalData,
    },
    revalidate: 30,
  };
}

type HomeProps = {
  initialData: TProjects;
  totalData: number;
  preview: boolean;
};

const Home: NextPage<HomeProps> = ({ initialData, totalData, preview }) => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const [isMutating, setIsMutating] = useState(false);
  const projectRef = useRef<HTMLDivElement>(null);

  const { currentPage, setCurrentPage, isDisabled, pagesQuantity, offset } = usePaginator({
    total: totalData,
    initialState: {
      pageSize: PAGE_SIZE,
      currentPage: 1,
      isDisabled: false,
    },
  });

  const { data: fetchedProjects, error, mutate } = useGetProjects({
    initialData,
    params: {
      offset,
      limit: PAGE_SIZE,
    },
  });

  // page change handlers
  const onPageChange = async (nextPage: number) => {
    await setCurrentPage(nextPage);

    setIsMutating(true);

    await mutate().then(() => setIsMutating(false));

    window.scrollTo({
      top: projectRef.current.offsetTop - 150,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <SeoContainer />

      <HomeStyled>
        <section className="intro">
          <h1>Hi, I'm Umma Ahimsha</h1>
          <p>a web developer</p>
        </section>

        {preview && <PreviewAlert />}

        <h2 ref={projectRef}>Projects</h2>

        <article className="projects-list">
          <>
            {error ? (
              <div className="loading-info">Ups...Something went wrong</div>
            ) : isMutating ? (
              <div className="loading-info">
                <img className="loader" src={isDark ? 'loader.svg' : 'loader-dark.svg'} alt="Loading..." />
              </div>
            ) : (
              <>
                {fetchedProjects.map((project) => (
                  <Projects key={project._id} project={project} />
                ))}
              </>
            )}
          </>
        </article>

        <Paginator
          isDisabled={isDisabled}
          currentPage={currentPage}
          pagesQuantity={pagesQuantity}
          onPageChange={onPageChange}
        >
          <PaginateBtn />
        </Paginator>
      </HomeStyled>
    </>
  );
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
    /* min-height: 438px; */

    .loading-info {
      margin-top: 1rem;
      animation: fadeIn ease 0.5s 1;

      img {
        animation: fadeIn ease 0.5s 1;
      }
    }
  }

  h2 {
    font-size: clamp(1.4rem, 5vw, 1.6rem);
  }
`;

export default Home;
