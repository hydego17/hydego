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
        <hr />

        <article>
          <p>
            I found that writing a personal bio is hard, so this is going to be
            a short one.
          </p>

          <p>
            My name is Umma Ahimsha, I'm a web developer based in Jakarta,
            Indonesia.
          </p>

          <p>
            Though I spend most of my time writing code for building User
            Interfaces, I've also fiddled around with books and games.
          </p>

          <p>
            If you're into literary stuff, I used to write poems and proses. You
            can read them in the archive.
          </p>

          <p>
            You can reach me at{" "}
            <a href="mailto:uahimsha@gmail.com">uahimsha@gmail.com</a>
          </p>
        </article>
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
