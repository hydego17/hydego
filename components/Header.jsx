import styled from "@emotion/styled";
import Link from "next/link";
import { useTheme } from "providers/ThemeProvider";
import Toggle from "react-toggle";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
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

        <ul className="nav-header">
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <label>
              <Toggle
                defaultChecked={theme.type === "dark"}
                icons={false}
                onChange={toggleTheme}
              />
            </label>
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

  backdrop-filter: saturate(180%) blur(30px);

  @media screen and (min-width: 30em) {
    margin-top: 2rem;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    ul.nav-header {
      display: flex;

      li {
        padding: 0.5rem;
      }
    }
  }
`;
