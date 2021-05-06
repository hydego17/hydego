import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'next-themes';
import 'nprogress/nprogress.css';

import Layout from 'components/Layout';

const NProgress = dynamic(
  () => {
    return import('components/NProgress');
  },
  { ssr: false },
);

import 'styles/main.css';
import GlobalStyles from 'styles/globals';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ThemeProvider defaultTheme="system">
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} key={router.route} />
        </Layout>
        <NProgress />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
