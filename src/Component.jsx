import { useContext, useEffect } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

export default function Component() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const root = document.getElementById("root");

    if (theme === "light") {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
    } else {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    toggleTheme();
  };

  return (
    <div className="card">
      <p>Current Theme: {theme}</p>
    </div>
  );
}
