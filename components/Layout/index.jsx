import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import Header from './Header';
import Footer from './Footer';

import Transition from 'components/Transition';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Header />
      <Transition location={router.pathname}>
        <LayoutStyled className="container">{children}</LayoutStyled>
      </Transition>
      <Footer />
    </>
  );
}

const LayoutStyled = styled.div`
  min-height: 75vh;
  display: flex;
  flex-direction: column;
`;
