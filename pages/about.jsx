import { NextSeo } from "next-seo";
import styled from "@emotion/styled";

export default function About() {
  const SEO = {
    title: "About",
    description: "About me | Umma Ahimsha",

    openGraph: {
      title: "About",
      description: "About me | Umma Ahimsha",
    },
  };
  // Add sanity page
  return (
    <>
      <NextSeo {...SEO} />
      <AboutStyled>
        <h1>About Me</h1>

        <p></p>
      </AboutStyled>
    </>
  );
}

const AboutStyled = styled.section`
  min-height: 60vh;

  h1 {
    font-size: clamp(1.75rem, 2.5vw, 2rem);
  }
`;
