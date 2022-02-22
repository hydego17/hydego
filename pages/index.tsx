import { useRef, useCallback } from 'react';
import { NextPage } from 'next';
import { useTheme } from 'next-themes';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import styled from '@emotion/styled';

import { usePaginator } from '@/hooks/usePaginator';
import { getTotalProjects, getPaginatedProjects } from '@/lib/api';
import type { TProjects } from '@/types/project';

import Projects from '@/components/Projects';
import PreviewAlert from '@/components/PreviewAlert';
import SeoContainer from '@/components/SeoContainer';
import Pagination from '@/components/Pagination';

// set page size constant
const PAGE_SIZE = 3;

export const getStaticProps = async () => {
  const totalData = await getTotalProjects();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['projects', { offset: 0, limit: PAGE_SIZE }], async () => {
    const data = await getPaginatedProjects({ offset: 0, limit: PAGE_SIZE });
    return data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      totalData,
    },
    revalidate: 60,
  };
};

type HomeProps = {
  totalData: number;
  preview: boolean;
};

const Home: NextPage<HomeProps> = ({ totalData, preview }) => {
  // Access app theme
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Store page title in a ref
  const titleRef = useRef<HTMLDivElement>(null);

  // Invoke pagination hook to transform page size data
  const { currentPage, setCurrentPage, isDisabled, pagesQuantity, offset } = usePaginator({
    total: totalData,
    initialState: {
      pageSize: PAGE_SIZE,
      currentPage: 1,
      isDisabled: false,
    },
  });

  // Invoke react-query hook to handle get Projects data client-side
  const { data: fetchedProjects, isError, isLoading } = useQuery<TProjects>(
    ['projects', { offset, limit: PAGE_SIZE }],
    async () => {
      const data = await getPaginatedProjects({ offset, limit: PAGE_SIZE });
      return data;
    }
  );

  // Page change handlers
  const onPageChange = useCallback(
    async (nextPage: number) => {
      setCurrentPage(nextPage);

      window.scrollTo({
        top: titleRef.current.offsetTop - 150,
        behavior: 'smooth',
      });
    },
    [setCurrentPage]
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
          {isError && <div className="loading-info">Ups...Something went wrong</div>}

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
