import useThemeContext from "@/src/contexts/ThemeContext";
import styles from "./styles.module.scss";
import { Moon, Sun } from "lucide-react";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={styles.toggletheme}>
      <Sun className="icon-color-2" size={20} />
      <label htmlFor="toggle-theme" className={`${styles.toggletheme__label} border-color-2`}>
        <input
          type="checkbox"
          id="toggle-theme"
          onChange={toggleTheme}
          checked={theme === "dark"}
          className={styles.toggletheme__input}
        />
        <span className={`${styles.toggletheme__cta} bg-2`}>{theme}</span>
      </label>
      <Moon className="icon-color-2" size={20} />
    </div>
  );
};

export default ToggleTheme;
