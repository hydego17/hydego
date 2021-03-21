import { NextSeo } from 'next-seo';
import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';
import { getAboutMePage } from 'lib/api';

export default function About({ content }) {
  const SEO = {
    title: 'About Me – Umma Ahimsha',
    description: 'About me | Umma Ahimsha',
    canonical: 'https://hydego.me/about',
    openGraph: {
      title: 'About Me - Umma Ahimsha',
      url: 'https://hydego.me/about',
      description: 'About me | Umma Ahimsha',
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <AboutStyled>
        <h1>About Me</h1>
        <hr />

        <article>
          <BlockContent blocks={content.description} />
        </article>
      </AboutStyled>
    </>
  );
}

export async function getStaticProps() {
  const content = await getAboutMePage();

  return {
    props: {
      content,
    },
    revalidate: 1,
  };
}

const AboutStyled = styled.section`
  h1 {
    font-size: clamp(1.75rem, 2.5vw, 2rem);
    padding-bottom: 1rem;
  }

  article {
    max-width: 600px;
  }

  p {
    padding-top: 1rem;
  }
`;
