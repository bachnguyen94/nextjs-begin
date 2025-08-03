'use client';

import { useContext } from "react";
// import { useTheme } from 'next-themes';
import { ThemeContext } from "./themeProvider";

export default function ThemeSwitcher() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme, toggleTheme } = context;
  console.log('Current theme:', theme);

  return (
    <div className="space-x-2">
      <button onClick={toggleTheme}>🌞 theme</button>
    </div>
  );
}