import { Global, css } from "@emotion/core";

const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        body {
          min-height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", Helvetica,
            sans-serif;

          &::-webkit-scrollbar {
            width: 0.9rem;
          }

          &::-webkit-scrollbar-track {
            background: #dfe4ea;
          }

          &::-webkit-scrollbar-thumb {
            background: #a4b0be;
          }
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        ul {
          list-style: none;
        }

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .container {
          padding: 0 2rem;
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }
      `}
    />
  </>
);

export default GlobalStyles;
