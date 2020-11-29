import { NextSeo } from "next-seo";
import styled from "@emotion/styled";
import { useGetArchive } from "actions/archive";
import Link from "next/link";
import { getAllArchives } from "lib/archive";

export default function Archive({ initialData }) {
  const { data, loading } = useGetArchive({ initialData });

  const format = (date) => {
    return date.substring(0, 10);
  };

  const SEO = {
    title: "Archives",
    description: "Some of my poems and proses | Umma Ahimsha",

    openGraph: {
      title: "Archives",
      description: "Some of my poems and proses | Umma Ahimsha",
    },
  };
  // Add sanity page
  return (
    <>
      <NextSeo {...SEO} />
      <ArchiveStyled>
        <h1>Archive</h1>
        <hr />

        {loading && <h3>Loading...</h3>}

        <table>
          <tbody>
            {data &&
              data.map((archive, index) => (
                <tr key={index} className="archive">
                  <td className="archive_title">
                    <Link
                      href="/archive/[slug]"
                      as={`/archive/${archive.slug}`}
                    >
                      <a> {archive.title} </a>
                    </Link>
                  </td>
                  <td className="archive_date">
                    <time dateTime={format(archive.date)}>
                      {format(archive.date)}
                    </time>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </ArchiveStyled>
    </>
  );
}

export async function getStaticProps() {
  const initialData = await getAllArchives();
  return { props: { initialData }, revalidate: 1 };
}

const ArchiveStyled = styled.section`
  font-size: 15px;
  min-height: 60vh;

  table {
    width: 100%;

    td {
      padding: 0.5rem 0;

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