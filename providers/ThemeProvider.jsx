import { useState, useContext, useMemo, useEffect } from "react";
import { ThemeContext, themes } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    if (theme === themes.light) {
      window.localStorage.setItem("theme", "dark");
      setTheme(themes.dark);
    } else {
      window.localStorage.setItem("theme", "light");
      setTheme(themes.light);
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");

    if (localTheme === "light") {
      setTheme(themes.light);
    }
    if (localTheme === "dark") {
      setTheme(themes.dark);
    }
  }, []);

  const themeAPI = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={themeAPI}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
