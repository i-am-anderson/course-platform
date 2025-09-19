import useThemeContext from "@/src/contexts/ThemeContext";
import styles from "./styles.module.scss";
import { Moon, Sun } from "lucide-react";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={styles.toggleContainer}>
      <Sun color="#000" size={20} />
      <label htmlFor="toggle-theme" className={styles.toggleLabel}>
        <input
          type="checkbox"
          id="toggle-theme"
          onChange={toggleTheme}
          checked={theme === "light"}
          className={styles.toggleInput}
        />
        <span className={styles.toggleFakeButton}>{theme}</span>
      </label>
      <Moon color="#000" size={20} />
    </div>
  );
};

export default ToggleTheme;
