'use client';

import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <div className="space-x-2">
      <button onClick={() => setTheme('light')}>🌞 Light</button>
      <button onClick={() => setTheme('dark')}>🌙 Dark</button>
      <button onClick={() => setTheme('system')}>🖥 System</button>
    </div>
  );
}