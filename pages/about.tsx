import type { InferGetStaticPropsType } from 'next';
import styled from '@emotion/styled';
import { PortableText } from '@portabletext/react';

import { getAboutMePage } from '@/data/pages';

import SeoContainer from '@/components/seo-container';

export const getStaticProps = async () => {
  const content = await getAboutMePage();

  return {
    props: {
      content,
    },
    revalidate: 60,
  };
};

export default function About({ content }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SeoContainer title={`About Me - Umma Ahimsha`} description={`About me | Umma Ahimsha`} type="Website" />
      <AboutStyled>
        <h1>{content.title}</h1>
        <hr />

        <article>
          <PortableText value={content.description} />
        </article>
      </AboutStyled>
    </>
  );
}

const AboutStyled = styled.section`
  h1 {
    font-size: clamp(1.75rem, 2.5vw, 2rem);
    padding-bottom: 1rem;
  }

  article {
    max-width: 600px;

    a {
      color: var(--hoverClr);
    }
  }

  p {
    padding-top: 1rem;
  }
`;
