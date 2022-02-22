import { useState, useRef, useCallback } from 'react';
import { NextPage } from 'next';
import { useTheme } from 'next-themes';
import useSWR from 'swr';
import styled from '@emotion/styled';

import { usePaginator } from 'hooks/usePaginator';
import { getInitialProjects } from 'lib/api';
import type { TProjects } from 'types/project';

import Projects from 'components/Projects';
import PreviewAlert from 'components/PreviewAlert';
import SeoContainer from 'components/SeoContainer';
import Pagination from 'components/Pagination';

// set page size constant
const PAGE_SIZE = 3;

export const getStaticProps = async () => {
  const { initialData, totalData } = await getInitialProjects({ limit: PAGE_SIZE });

  return {
    props: {
      initialData,
      totalData,
    },
    revalidate: 60,
  };
};

type HomeProps = {
  initialData: TProjects;
  totalData: number;
  preview: boolean;
};

// Store current page number in a Set Object
const pageSet = new Set();
pageSet.add(1);

const Home: NextPage<HomeProps> = ({ initialData, totalData, preview }) => {
  // Access app theme
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Store page title in a ref
  const titleRef = useRef<HTMLDivElement>(null);
  // Store initial data from server in a ref
  const dataRef = useRef<TProjects>(initialData);

  const [isMutating, setIsMutating] = useState(false);

  // Invoke pagination hook to transform page size data
  const { currentPage, setCurrentPage, isDisabled, pagesQuantity, offset } = usePaginator({
    total: totalData,
    initialState: {
      pageSize: PAGE_SIZE,
      currentPage: 1,
      isDisabled: false,
    },
  });

  // Invoke SWR hook to handle GET Projects data client-side
  const { data: fetchedProjects, error, mutate } = useSWR<TProjects>(
    `/api/projects?offset=${offset}&limit=${PAGE_SIZE}`,
    {
      isPaused: () => isMutating,
      fallbackData: dataRef.current,
      onSuccess: (data) => {
        // When data is fetched, update the current ref with the latest one,
        // to prevent initial data being rendered again.
        dataRef.current = data;
      },
    }
  );

  const isLoading = (!fetchedProjects && !error) || isMutating;

  // Page change handlers
  const onPageChange = useCallback(
    async (nextPage: number) => {
      if (!pageSet.has(nextPage)) {
        pageSet.add(nextPage);
        setIsMutating(true);
        setCurrentPage(nextPage);
        await mutate();
        setIsMutating(false);
      } else {
        setCurrentPage(nextPage);
        await mutate();
      }

      window.scrollTo({
        top: titleRef.current.offsetTop - 150,
        behavior: 'smooth',
      });
    },
    [mutate, setCurrentPage]
  );

  return (
    <>
      <SeoContainer />

      <HomeStyled>
        <section className="intro">
          <h1>{`Hi, I'm Umma Ahimsha`}</h1>
          <p>{`a web developer`}</p>
        </section>

        {preview && <PreviewAlert />}

        <h2 ref={titleRef}>Projects</h2>

        <article className="projects-list">
          {error && <div className="loading-info">Ups...Something went wrong</div>}

          {isLoading ? (
            <div className="loading-info">
              <img className="loader" src={isDark ? 'loader.svg' : 'loader-dark.svg'} alt="Loading..." />
            </div>
          ) : (
            <>
              {fetchedProjects?.map((project) => (
                <Projects key={project._id} project={project} />
              ))}
            </>
          )}
        </article>

        <Pagination
          isDisabled={isDisabled}
          currentPage={currentPage}
          pagesQuantity={pagesQuantity}
          onPageChange={onPageChange}
        />
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
