import { useState, useEffect } from "react";
import MoonIcon from "../../../assets/svg/mode/MoonIcon.jsx";
import SunIcon from "../../../assets/svg/mode/SunIcon.jsx";

const ModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="hover:bg-light-bg2 dark:hover:bg-dark-bg dark:bg-dark-bg2 flex h-6 w-6 items-center justify-center rounded-xl transition-all duration-300"
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ModeToggle;
