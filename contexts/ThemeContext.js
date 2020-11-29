import { createContext } from "react";

export const themes = {
  light: {
    type: "light",
    color: "#000000",
    background: "#ffffff",
    hoverClr: "#507496",
    cardBg: "white",
    navBg: `rgba(255, 255, 255, 0.8)`,
    paginateBg: `#e4e4e4`,
    divider: `rgba(237, 237, 237)`,
    borderColor: "rgba(233, 233, 233)",
    boxShadow: `
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 
    0 12.5px 10px rgba(0, 0, 0, 0.06)`,
  },
  dark: {
    type: "dark",
    color: "rgba(250, 250, 250)",
    background: "rgb(38, 39, 46)",
    cardBg: `linear-gradient(rgb(48, 49, 58), rgb(38, 42, 46) 90%)`,
    hoverClr: "#88c5ff",
    navBg: `rgba(38, 39, 46, 0.8)`,
    paginateBg: `#3f3f3f`,
    divider: `#3c3c3c`,
    borderColor: "rgb(65, 64, 68)",
    boxShadow: `
    0 2.8px 2.2px rgba(200, 200, 200, 0.034),
    0 6.7px 5.3px rgba(200, 200, 200, 0.048), 
    0 12.5px 10px rgba(200, 200, 200, 0.06)`,
  },
};

export const ThemeContext = createContext({});