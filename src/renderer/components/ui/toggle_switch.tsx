import React from "react";
import { useTheme, ThemeType } from "../theme-provider";

const ToggleSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === "dark"}
        onChange={handleToggle}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:orang  dark:peer-focus:ring-orange-800  dark:bg-gray-700 peer-checked:bg-orange-600">
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-full dark:border-gray-600"></div>
      </div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </span>
    </label>
  );
};

export default ToggleSwitch;
