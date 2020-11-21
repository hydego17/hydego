import styled from "@emotion/styled";
import { useRouter } from "next/router";

import Transition from "components/Transition";
import Header from "components/Header";
import Footer from "components/Footer";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <Header />
      <Transition location={router.pathname}>
        <LayoutStyled>
          <div className="container">{children}</div>
        </LayoutStyled>
      </Transition>
      <Footer />
    </>
  );
}
// background: ${(props) => props.theme.dark.background};

const LayoutStyled = styled.main`
  min-height: 50vh;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
