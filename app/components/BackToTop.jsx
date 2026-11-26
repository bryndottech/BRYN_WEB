'use client';

import { useEffect, useRef } from 'react';

export default function BackToTop() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return undefined;

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      button.classList.toggle('on', y > 700);
      button.style.setProperty('--p', max > 0 ? String(y / max) : '0');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      id="bt"
      className="bt"
      aria-label="Back to top"
      onClick={toTop}
    >
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" opacity=".18" strokeWidth="2" />
        <circle className="rg2" cx="22" cy="22" r="20" />
        <path d="M16 25l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  );
}
