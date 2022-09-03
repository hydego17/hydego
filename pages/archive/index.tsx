import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import styled from '@emotion/styled';

import { getAllArchives } from '@/data/archive';

import SeoContainer from '@/components/seo-container';

export const getStaticProps = async () => {
  const archives = await getAllArchives();
  return {
    props: { archives },
    revalidate: 60,
  };
};

export default function Archive({ archives }: InferGetStaticPropsType<typeof getStaticProps>) {
  const format = (date) => {
    return date.substring(0, 10);
  };

  return (
    <>
      <SeoContainer title="Archive - Umma Ahimsha" description="Some of my writing, poems and proses" />
      <ArchiveStyled>
        <h1>Archive</h1>
        <hr />

        <table>
          <tbody>
            {archives?.map((archive, index) => (
              <tr key={archive.slug} className="archive">
                <td className="archive_title">
                  <Link href="/archive/[slug]" as={`/archive/${archive.slug}`}>
                    <a> {archive.title} </a>
                  </Link>
                </td>
                <td className="archive_date">
                  <time dateTime={format(archive.date)}>{format(archive.date)}</time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ArchiveStyled>
    </>
  );
}

const ArchiveStyled = styled.section`
  table {
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;

    td {
      padding: 0.4rem 0;

      &.archive_date {
        text-align: right;
      }
    }
  }

  h1 {
    font-size: clamp(1.75rem, 2.5vw, 2rem);
    padding-bottom: 1rem;
  }

  p {
    padding-top: 1rem;
  }
`;
