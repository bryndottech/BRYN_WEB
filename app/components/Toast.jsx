'use client';

import { useEffect, useRef, useState } from 'react';

export default function Toast() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    const onToast = (event) => {
      setMessage(event.detail);
      setVisible(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setVisible(false), 3400);
    };
    window.addEventListener('bryn:toast', onToast);
    return () => {
      window.removeEventListener('bryn:toast', onToast);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className={`toast${visible ? ' is-visible' : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
