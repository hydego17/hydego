import styled from "@emotion/styled";
import { useRouter } from "next/router";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <Header />
      <LayoutStyled>{children}</LayoutStyled>
      <Footer />
    </>
  );
}
// background: ${(props) => props.theme.dark.background};

const LayoutStyled = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;
