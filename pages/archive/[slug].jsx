import styled from "@emotion/styled";
import { getAllArchives, getSingleArchive } from "lib/archive";
import BlockContent from "@sanity/block-content-to-react";
import PreviewAlert from "components/PreviewAlert";
import Link from "next/link";

export default function Archive({ archive, preview }) {
  return (
    <ArchiveStyled>
      {preview && <PreviewAlert />}

      <header>
        <h1>{archive.title}</h1>

        <Link href="/archive">
          <a>Back</a>
        </Link>
      </header>

      <hr />

      <article>
        <BlockContent blocks={archive.content} />
      </article>
    </ArchiveStyled>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const archive = await getSingleArchive(params.slug, preview);

  return {
    props: {
      archive,
      preview,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const archives = await getAllArchives();

  const paths = archives?.map((p) => ({
    params: {
      slug: p.slug,
    },
  }));

  return { paths, fallback: false };
}

// Style
const ArchiveStyled = styled.article`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
  }
  h1 {
    font-size: clamp(1.4rem, 2.5vw, 1.75rem);
  }
`;
