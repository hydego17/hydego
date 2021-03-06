import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

type SeoContainerProps = {
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  type?: string;
  author?: string;
  tag?: string;
};

const SeoContainer: FC<SeoContainerProps> = props => {
  const { ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: 'Umma Ahimsha - Developer, Designer, Geeks',
    description: `Front-End Developer and Graphic Designer based in Jakarta, Indonesia.`,
    type: 'website',
    ...customMeta,
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{meta.title}</title>
        <meta name="title" content={meta.title} />
        <meta name="description" content={meta.description} />
        <meta name="robots" content="follow, index" />
        <link rel="canonical" href={`https://hydego.me${router.asPath}`} />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Umma Ahimsha" />
        <meta property="og:image" content={meta.image} />
        <meta
          property="og:url"
          content={`https://hydego.me${router.asPath}`}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@umma_ahimsha" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />

        {/* Article meta */}
        {/* {meta.author && (
          <meta property="article:author" content={meta.author} />
        )}
        {meta.tag && <meta property="article:tag" content={meta.tag} />}
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )} */}
      </Head>
    </>
  );
};

export default SeoContainer;
