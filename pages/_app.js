import ThemeProvider from "providers/ThemeProvider";

import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";

import Layout from "components/Layout";
import GlobalStyles from "components/GlobalStyles";

import "styles/globals.css";

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
