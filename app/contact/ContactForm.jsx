'use client';

import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import { showToast } from '@/lib/ui';

const emailPattern = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;

export default function ContactForm({ topics, initialTopic = 'Project enquiry' }) {
  const [topic, setTopic] = useState(initialTopic);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const baseId = useId();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const submit = (event) => {
    event.preventDefault();
    const name = nameRef.current?.value.trim() ?? '';
    const email = emailRef.current?.value.trim() ?? '';
    const message = messageRef.current?.value.trim() ?? '';
    const nextErrors = {};

    if (name.length < 2) nextErrors.name = 'Enter your full name.';
    if (!emailPattern.test(email)) nextErrors.email = 'Enter a valid email.';
    if (message.length < 10) nextErrors.message = 'Write at least 10 characters.';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    const reference = `TKT-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setSent({ topic, email, reference });
    showToast('Message sent. Reference ' + reference + '.');
  };

  if (sent) {
    return (
      <div className="form-card form-success" role="status" aria-live="polite">
        <span className="success-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2>Message sent.</h2>
        <p>
          The {sent.topic} team replies to {sent.email} within one business day.
        </p>
        <span className="mono">Reference {sent.reference}</span>
        <p className="form-note">Preview only — no message was sent.</p>
        <Link className="btn btn-primary" href="/">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <p className="form-note">Preview form — this demo does not send messages yet.</p>

      <fieldset className="field choice-field">
        <legend className="field-label">Topic</legend>
        <div className="choice-grid">
          {topics.map((item) => (
            <button
              key={item}
              type="button"
              className="chip"
              aria-pressed={topic === item}
              onClick={() => setTopic(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="form-grid">
        <div className={`field${errors.name ? ' is-invalid' : ''}`}>
          <label htmlFor={`${baseId}-name`}>Full name</label>
          <input
            ref={nameRef}
            id={`${baseId}-name`}
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
          />
          <span className="field-error" id={`${baseId}-name-error`} aria-live="polite">
            {errors.name ?? ''}
          </span>
        </div>
        <div className={`field${errors.email ? ' is-invalid' : ''}`}>
          <label htmlFor={`${baseId}-email`}>Work email</label>
          <input
            ref={emailRef}
            id={`${baseId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
          />
          <span className="field-error" id={`${baseId}-email-error`} aria-live="polite">
            {errors.email ?? ''}
          </span>
        </div>
      </div>

      <div className={`field${errors.message ? ' is-invalid' : ''}`}>
        <label htmlFor={`${baseId}-message`}>Message</label>
        <textarea
          ref={messageRef}
          id={`${baseId}-message`}
          name="message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${baseId}-message-error` : undefined}
        />
        <span className="field-error" id={`${baseId}-message-error`} aria-live="polite">
          {errors.message ?? ''}
        </span>
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Send message <i aria-hidden="true">→</i>
      </button>
    </form>
  );
}
