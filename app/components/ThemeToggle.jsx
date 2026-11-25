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
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
