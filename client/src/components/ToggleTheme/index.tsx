import useThemeContext from "../../contexts/ThemeContext";
import styles from "./styles.module.scss";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={styles.toggleContainer}>
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
    </div>
  );
};

export default ToggleTheme;
