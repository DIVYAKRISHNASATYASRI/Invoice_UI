import React, { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
