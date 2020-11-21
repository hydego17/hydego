import { createContext } from "react";

export const themes = {
  light: {
    type: "light",
    color: "#000000",
    background: "#ffffff",
    hoverClr: "#507496",
    cardBg: "white",
    navBg: `rgba(255, 255, 255, 0.8)`,
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
    background: "rgb(30,30,30)",
    cardBg: `linear-gradient(#242424, #242424 90%)`,
    hoverClr: "rgb(200, 200, 200)",
    navBg: `rgba(30, 30, 30, 0.8)`,
    divider: `rgba(50, 50, 50)`,
    borderColor: "rgb(40,40,40)",
    boxShadow: `
    0 2.8px 2.2px rgba(200, 200, 200, 0.034),
    0 6.7px 5.3px rgba(200, 200, 200, 0.048), 
    0 12.5px 10px rgba(200, 200, 200, 0.06)`,
  },
};

export const ThemeContext = createContext({});
