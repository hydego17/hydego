import styled from '@emotion/styled';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <FooterStyled>
        <div className="container">
          <div className="social-links">
            <a title="Twitter" href="https://twitter.com/umma_ahimsha" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a title="Github" href="https://github.com/hydego17" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>

            <a title="LinkedIn" href="https://linkedin.com/in/umma-ahimsha" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>

          <div className="copyright">
            <small> Copyright © {new Date().getFullYear()} Umma Ahimsha</small>
          </div>
        </div>
      </FooterStyled>
    </>
  );
}

const FooterStyled = styled.footer`
  text-align: center;
  padding: 4rem 0 2rem 0;

  .container {
    .social-links {
      padding-bottom: 1rem;
      svg {
        color: #747d8c;
        font-size: 1.2rem;
        margin-right: 1rem;
      }
    }
  }
`;
