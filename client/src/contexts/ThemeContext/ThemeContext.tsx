
import { createContext, type ReactNode, useEffect, useState } from "react";
import type {ThemeContextProps, ThemeProps} from "@/types/theme"

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const localTheme = localStorage.getItem("theme");
  const isDark = localTheme === "dark" ? "dark" : "light";

  const [theme, setTheme] = useState<ThemeProps>(isDark);

  const toggleTheme = (): void => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  // Poderia ter pego o tema do sistema operacional do usuário
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
