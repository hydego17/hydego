import styled from "@emotion/styled";

export default function About() {
  // Add sanity page
  return (
    <AboutStyled>
      <h1>About Me</h1>

      <p></p>
    </AboutStyled>
  );
}

const AboutStyled = styled.section`
  min-height: 60vh;

  h1 {
    padding-right: 2rem;
    margin-bottom: 1rem;
  }
`;
