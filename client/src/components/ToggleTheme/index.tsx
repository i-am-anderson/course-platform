import useThemeContext from "@/src/contexts/ThemeContext";
import styles from "./styles.module.scss";
import { Moon, Sun } from "lucide-react";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={styles.toggleContainer}>
      <Sun className="icon-color-2" size={20} />
      <label htmlFor="toggle-theme" className={`${styles.toggleLabel} border-color-2`}>
        <input
          type="checkbox"
          id="toggle-theme"
          onChange={toggleTheme}
          checked={theme === "light"}
          className={styles.toggleInput}
        />
        <span className={`${styles.toggleFakeButton} bg-2`}>{theme}</span>
      </label>
      <Moon className="icon-color-2" size={20} />
    </div>
  );
};

export default ToggleTheme;
