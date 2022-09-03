import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { useTheme } from 'next-themes';

import { FaMoon } from 'react-icons/fa';
import { BsSun } from 'react-icons/bs';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HeaderStyled>
      <div className="container">
        <ul className="nav-header">
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/archive">
              <a>Archive</a>
            </Link>
          </li>
        </ul>

        {mounted && (
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="toggle-button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <span>{theme === 'dark' ? <BsSun size={14} /> : <FaMoon size={14} />}</span>
          </button>
        )}
      </div>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.nav`
  position: sticky;
  z-index: 2;
  top: 0;
  padding: 2rem 0;
  margin-bottom: 3rem;

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
      gap: 1rem;
    }

    button.toggle-button {
      cursor: pointer;
      aspect-ratio: 1;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: fit-content;
      border: none;
      border-radius: 4px;
    }
  }
`;
