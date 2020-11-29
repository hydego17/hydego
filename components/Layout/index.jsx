import styled from "@emotion/styled";
import { useRouter } from "next/router";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <Header />
      <LayoutStyled className="container">{children}</LayoutStyled>
      <Footer />
    </>
  );
}
// background: ${(props) => props.theme.dark.background};

const LayoutStyled = styled.main`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
