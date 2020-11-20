import { ThemeProvider } from "emotion-theming";

import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";

import Layout from "components/Layout";
import GlobalStyles from "components/GlobalStyles";
import "styles/globals.css";

const theme = {
  colors: {
    primary: "#222f3e",
    light_gray: "#ced6e0",
    dark_gray: "#a4b0be",
  },
};

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <DefaultSeo {...SEO} />

      <ThemeProvider theme={theme}>
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} key={router.route} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
