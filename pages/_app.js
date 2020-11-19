import { ThemeProvider } from "emotion-theming";

import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";

import GlobalStyles from "components/GlobalStyles";
import "styles/globals.css";

const theme = {
  colors: {
    primary: "#222f3e",
    light_gray: "#ced6e0",
    dark_gray: "#a4b0be",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />

      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
