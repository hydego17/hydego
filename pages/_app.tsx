import 'styles/main.css';
import 'nprogress/nprogress.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import { SWRConfig } from 'swr';

import GlobalStyles from 'styles/globals';
import Layout from 'components/Layout';

const NProgress = dynamic(
  () => {
    return import('components/NProgress');
  },
  { ssr: false }
);

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <ThemeProvider defaultTheme="system">
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} key={router.route} />
        </Layout>
        <NProgress />
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
