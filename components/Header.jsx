import styled from "@emotion/styled";
import Link from "next/link";

export default function Header() {
  return (
    <HeaderStyled>
      <header className="container">
        <div className="brand">
          <Link href="/">
            <a>
              <h3>Hydego</h3>
            </a>
          </Link>
        </div>

        <ul className="nav_header">
          <li>
            <Link href="/work">
              <a>Work</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
        </ul>
      </header>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.nav`
  position: sticky;
  z-index: 2;
  top: 0;
  padding: 2rem 0;
  margin-bottom: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(30px);

  @media screen and (min-width: 30em) {
    margin-top: 2rem;
  }

  a {
    &:hover {
      color: #123f68;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    ul.nav_header {
      display: flex;

      li {
        padding: 0.5rem;
      }
    }
  }
`;
