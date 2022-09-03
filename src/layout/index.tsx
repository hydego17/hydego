import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import NProgress from 'nprogress';

import GlobalStyles from '@/styles/globals';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router.events]);

  return (
    <>
      <GlobalStyles />

      <Navbar />

      <LayoutStyled className="container">{children}</LayoutStyled>

      <Footer />
    </>
  );
}

const LayoutStyled = styled.main`
  min-height: 75vh;
  display: flex;
  flex-direction: column;
`;
