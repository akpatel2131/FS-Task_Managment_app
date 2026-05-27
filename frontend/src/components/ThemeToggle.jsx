import useTheme from "../hooks/useTheme";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.themeToggle} onClick={toggleTheme} type="button">
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
};

export default ThemeToggle;
