import { Global, css } from '@emotion/react';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        html,
        body {
          color: var(--color);
          background: var(--background);
        }

        body {
          min-height: 80vh;
          transition: background 0.3s ease;
          min-height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', Helvetica, sans-serif;

          &::-webkit-scrollbar {
            height: 13px;
            width: 13px;
            border-radius: 20px;
          }

          &::-webkit-scrollbar-track {
            border-radius: 20px;
            background: padding-box rgb(204, 204, 204);
            border-width: 2px;
            border-style: solid;
            border-color: rgb(239, 241, 244);
            border-image: initial;
          }

          &::-webkit-scrollbar-thumb {
            background: rgb(239, 241, 244);
          }
        }

        h1 {
          font-size: clamp(1.85rem, 2.5vw, 4rem);
        }
        button {
          border: 0;
          outline: 0;
          cursor: pointer;
          background-color: var(--button-bg);
          transition: background-color 0.2s ease;

          &:hover {
            background-color: var(--button-bg-hover);
          }

          &:disabled {
            cursor: not-allowed;
            color: #858585;
            background-color: transparent;

            &:hover {
              background-color: transparent;
            }
          }
        }

        a {
          color: inherit;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
            color: var(--hoverClr);
          }
        }

        ul {
          list-style: none;
        }

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        nav {
          background-color: var(--navBg);
        }

        article p {
          line-height: 1.625;
        }

        hr {
          padding: 0.5rem;
          border: 0;
          height: 0;
          border-top: 1px solid var(--divider);
        }

        .container {
          padding: 0 2rem;
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }

        .project-card {
          background: var(--cardBg);
          border: 1px solid var(--borderColor);

          &:hover {
            box-shadow: var(--boxShadow);
          }
        }

        .card-image,
        .detail-image {
          border: 1px solid var(--divider);
        }
        .preview-alert {
          background-color: var(--divider);
        }

        .detail-body .description a {
          color: var(--hoverClr);
        }

        .loader {
          width: 70px;
          height: 70px;
          margin: 0 10px;
          display: inline-block;
        }
      `}
    />
  );
};

export default GlobalStyles;
