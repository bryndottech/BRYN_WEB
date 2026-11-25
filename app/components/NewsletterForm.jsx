'use client';

import { useId, useRef, useState } from 'react';
import { showToast } from '@/lib/ui';

const emailPattern = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;

export default function NewsletterForm({
  placeholder = 'you@company.com',
  buttonLabel = 'Subscribe',
  successMessage = 'Subscribed. One email a month, no filler.',
  toastMessage = 'Subscribed. One email a month, no filler.',
}) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);
  const errorId = useId();
  const inputId = useId();

  const submit = (event) => {
    event.preventDefault();
    const value = inputRef.current?.value.trim() ?? '';
    if (!emailPattern.test(value)) {
      setError('Enter a valid email address.');
      setSuccess(false);
      return;
    }
    setError('');
    setSuccess(true);
    event.currentTarget.reset();
    showToast(toastMessage);
    window.setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      <form className={`newsletter-form${success ? ' is-success' : ''}`} onSubmit={submit} noValidate>
        <label className="sr-only" htmlFor={inputId}>
          Email
        </label>
        <input
          ref={inputRef}
          id={inputId}
          name="email"
          type="email"
          placeholder={placeholder}
          autoComplete="email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        <button type="submit">{success ? 'Subscribed ✓' : buttonLabel}</button>
      </form>
      <span className="field-error newsletter-error" id={errorId} aria-live="polite">
        {error}
      </span>
      <span className="sr-only" aria-live="polite">
        {success ? successMessage : ''}
      </span>
    </>
  );
}
