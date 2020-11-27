import { Global, css } from "@emotion/core";
import { useTheme } from "providers/ThemeProvider";

const GlobalStyles = () => {
  const { theme } = useTheme();

  return (
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
          transition: background 0.3s ease;
          color: ${theme.color};
          background: ${theme.background};
          min-height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", Helvetica,
            sans-serif;

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

        nav {
          background-color: ${theme.navBg};
        }

        hr {
          padding: 0.5rem;
          border: 0;
          height: 0;
          border-top: 1px solid ${theme.divider};
        }

        nav a,
        .links a {
          &:hover {
            color: ${theme.hoverClr};
          }
        }

        .container {
          padding: 0 2rem;
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }

        .project-card {
          background: ${theme.cardBg};
          border: 1px solid ${theme.borderColor};

          &:hover {
            box-shadow: ${theme.boxShadow};
          }
        }

        .card-image,
        .detail-image {
          border: 1px solid ${theme.divider};
        }
        .preview-alert {
          background-color: ${theme.divider};
        }

        .paginate-btn {
          color: ${theme.color};
          background: ${theme.paginateBg};

          &:hover {
            background: ${theme.borderColor};
          }
        }

        .react-toggle {
          touch-action: pan-x;

          display: inline-block;
          position: relative;
          cursor: pointer;
          background-color: transparent;
          border: 0;
          padding: 0;

          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;

          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-tap-highlight-color: transparent;
        }

        .react-toggle-screenreader-only {
          border: 0;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
        }

        .react-toggle--disabled {
          cursor: not-allowed;
          opacity: 0.5;
          -webkit-transition: opacity 0.25s;
          transition: opacity 0.25s;
        }

        .react-toggle-track {
          width: 50px;
          height: 24px;
          padding: 0;
          border-radius: 30px;
          background-color: #4d4d4d;
          -webkit-transition: all 0.2s ease;
          -moz-transition: all 0.2s ease;
          transition: all 0.2s ease;
        }

        .react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
          background-color: #000000;
        }

        .react-toggle--checked:hover:not(.react-toggle--disabled)
          .react-toggle-track {
          background-color: #909497;
        }

        .react-toggle-track-check {
          position: absolute;
          width: 14px;
          height: 10px;
          top: 0px;
          bottom: 0px;
          margin-top: auto;
          margin-bottom: auto;
          line-height: 0;
          left: 8px;
          opacity: 0;
          -webkit-transition: opacity 0.25s ease;
          -moz-transition: opacity 0.25s ease;
          transition: opacity 0.25s ease;
        }

        .react-toggle--checked .react-toggle-track-check {
          opacity: 1;
          -webkit-transition: opacity 0.25s ease;
          -moz-transition: opacity 0.25s ease;
          transition: opacity 0.25s ease;
        }

        .react-toggle-track-x {
          position: absolute;
          width: 10px;
          height: 10px;
          top: 0px;
          bottom: 0px;
          margin-top: auto;
          margin-bottom: auto;
          line-height: 0;
          right: 10px;
          opacity: 1;
          -webkit-transition: opacity 0.25s ease;
          -moz-transition: opacity 0.25s ease;
          transition: opacity 0.25s ease;
        }

        .react-toggle--checked .react-toggle-track-x {
          opacity: 0;
        }

        .react-toggle-thumb {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
          position: absolute;
          top: 1px;
          left: 1px;
          width: 22px;
          height: 22px;
          border: 1px solid #4d4d4d;
          border-radius: 50%;
          background-color: #fafafa;

          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;

          -webkit-transition: all 0.25s ease;
          -moz-transition: all 0.25s ease;
          transition: all 0.25s ease;
        }

        .react-toggle--checked .react-toggle-thumb {
          left: 27px;
          background-color: #bbbbbb;
          border-color: #bdc3c7;
        }

        .react-toggle--focus .react-toggle-thumb {
        }

        .react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
          -webkit-box-shadow: 0px 0px 5px 5px #0099e0;
          -moz-box-shadow: 0px 0px 5px 5px #0099e0;
          box-shadow: 0px 0px 5px 5px #0099e0;
        }
      `}
    />
  );
};

export default GlobalStyles;
