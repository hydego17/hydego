import styled from "@emotion/styled";
import Header from "components/Header";
import Footer from "components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <LayoutStyled>
        <div className="container">{children}</div>
      </LayoutStyled>
      <Footer />
    </>
  );
}

const LayoutStyled = styled.main`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
