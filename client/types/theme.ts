export type ThemeProps = "dark" | "light";

export type ThemeContextProps = {
  toggleTheme: () => void;
  theme: ThemeProps;
};