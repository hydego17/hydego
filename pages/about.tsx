import { InferGetStaticPropsType } from 'next';
import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';

import { getAboutMePage } from 'lib/api';
import { TAboutPage } from 'types/page';

import SeoContainer from 'components/SeoContainer';

export const getStaticProps = async () => {
  const content: TAboutPage = await getAboutMePage();

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
      <SeoContainer title={`About Me – Umma Ahimsha`} description={`About me | Umma Ahimsha`} type="Website" />
      <AboutStyled>
        <h1>{content.title}</h1>
        <hr />

        <article>
          <BlockContent blocks={content.description} />
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
