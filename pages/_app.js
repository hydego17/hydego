import { ThemeProvider } from "next-themes";

import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";

import Layout from "components/Layout";
import GlobalStyles from "styles/GlobalStyles";

import "styles/main.css";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider>
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} key={router.route} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
