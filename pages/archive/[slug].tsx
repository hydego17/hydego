import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';

import { getAllArchives, getSingleArchive } from 'lib/archive';
import { TArchive, TArchives } from 'types/archive';

import SeoContainer from 'components/SeoContainer';
import PreviewAlert from 'components/PreviewAlert';

export const getStaticProps = async ({ params, preview = false, previewData }) => {
  const archive: TArchive = await getSingleArchive(params.slug, preview);

  return {
    props: {
      archive,
      preview,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const archives: TArchives = await getAllArchives();

  const paths = archives?.map((p) => ({
    params: {
      slug: p.slug,
    },
  }));

  return { paths, fallback: true };
};

export default function Archive({ archive, preview }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <h2> Loading... </h2>;
  }

  const { title, content, date } = archive;

  return (
    <>
      <SeoContainer
        title={`${title} – Umma Ahimsha`}
        description={`${title} - Archive`}
        date={date}
        type="article"
        author={`Umma Ahimsha`}
      />

      <ArchiveStyled>
        {preview && <PreviewAlert />}

        <header>
          <h1>{title}</h1>
        </header>

        <hr />

        <BlockContent blocks={content} />
      </ArchiveStyled>
    </>
  );
}

// Style
const ArchiveStyled = styled.article`
  /* max-width: 600px; */
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
  }

  h1 {
    font-size: clamp(1.75rem, 2.5vw, 2rem);
  }

  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;
