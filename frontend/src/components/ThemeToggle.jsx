import useTheme from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme} type="button">
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
};

export default ThemeToggle;
