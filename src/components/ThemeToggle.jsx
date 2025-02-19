import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // Using lucide-react for icons

const ThemeToggle = () => {
  const themes = ["light", "dark"];
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      aria-label="Toggle Theme"
    >
      {theme === "light" && <Moon className="text-gray-800" />}
      {theme === "dark" && <Sun className="text-yellow-500" />}
    </button>
  );
};

export default ThemeToggle;