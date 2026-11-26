'use client';

import { useEffect, useState } from 'react';
import { getTheme, toggleTheme } from '@/lib/ui';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(getTheme());
    const onChange = (event) => setTheme(event.detail);
    window.addEventListener('bryn:theme', onChange);
    return () => window.removeEventListener('bryn:theme', onChange);
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      <span aria-hidden="true" />
    </button>
  );
}
