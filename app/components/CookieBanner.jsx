'use client';

import { useEffect, useRef, useState } from 'react';
import { showToast } from '@/lib/ui';

const STORAGE_KEY = 'bryn-ck';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const bannerRef = useRef(null);

  const reveal = () => {
    setVisible(true);
    window.setTimeout(() => setShowPreferences(true), 0);
    window.setTimeout(() => bannerRef.current?.querySelector('button')?.focus(), 0);
  };

  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (!stored) {
      const timer = window.setTimeout(() => setVisible(true), 1600);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, []);

  useEffect(() => {
    const onSettings = (event) => {
      event.preventDefault();
      reveal();
    };
    const onClick = (event) => {
      if (event.target.closest('[data-cookie-settings]')) {
        event.preventDefault();
        reveal();
      }
    };
    window.addEventListener('bryn:cookies', onSettings);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('bryn:cookies', onSettings);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const save = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Preferences still apply for this visit.
    }
    setVisible(false);
    showToast('Cookie preferences saved.');
  };

  const acceptAll = () => save('all');
  const rejectOptional = () => save('essential');
  const saveChoices = () => {
    const value = `${analytics ? 'a' : ''}${marketing ? 'm' : ''}` || 'essential';
    save(value);
  };

  if (!visible) return null;

  return (
    <aside
      ref={bannerRef}
      className="cookie-banner"
      aria-labelledby="cookie-title"
      aria-live="polite"
    >
      <h2 id="cookie-title">We use cookies</h2>
      <p>
        Essential cookies keep the site working. Analytics and marketing cookies are optional.
        You choose.
      </p>
      {showPreferences ? (
        <div className="cookie-preferences">
          <label>
            Analytics
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
            />
          </label>
          <label>
            Marketing
            <input
              type="checkbox"
              checked={marketing}
              onChange={(event) => setMarketing(event.target.checked)}
            />
          </label>
        </div>
      ) : null}
      <div className="cookie-actions">
        <button type="button" className="btn btn-primary" onClick={acceptAll}>
          Accept all
        </button>
        <button type="button" className="btn" onClick={rejectOptional}>
          Reject optional
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => (showPreferences ? saveChoices() : setShowPreferences(true))}
        >
          {showPreferences ? 'Save choices' : 'Preferences'}
        </button>
      </div>
    </aside>
  );
}
