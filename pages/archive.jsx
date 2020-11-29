import { NextSeo } from "next-seo";
import styled from "@emotion/styled";

export default function Archive() {
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
      <AboutStyled>
        <h1>Archive</h1>
        <hr />

        <article></article>
      </AboutStyled>
    </>
  );
}

const AboutStyled = styled.section`
  min-height: 60vh;

  h1 {
    font-size: clamp(1.75rem, 2.5vw, 2rem);
    padding-bottom: 1rem;
  }

  p {
    padding-top: 1rem;
  }
`;
