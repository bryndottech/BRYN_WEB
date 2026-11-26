'use client';

import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import { demoSizes, demoTimes } from '@/lib/content';
import { showToast } from '@/lib/ui';

const emailPattern = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;

export default function DemoClient({ services, days, initialService }) {
  const [service, setService] = useState(initialService);
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState({});
  const [booked, setBooked] = useState(null);
  const baseId = useId();
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const companyRef = useRef(null);
  const dayRef = useRef(null);
  const timeRef = useRef(null);
  const messageRef = useRef(null);

  const submit = (event) => {
    event.preventDefault();
    const name = nameRef.current?.value.trim() ?? '';
    const email = emailRef.current?.value.trim() ?? '';
    const company = companyRef.current?.value.trim() ?? '';
    const message = messageRef.current?.value.trim() ?? '';
    const nextErrors = {};

    if (name.length < 2) nextErrors.name = 'Enter your full name.';
    if (!emailPattern.test(email)) nextErrors.email = 'Enter a valid work email.';
    if (!company) nextErrors.company = 'Enter your company.';
    if (!day) nextErrors.day = 'Pick a day.';
    if (!time) nextErrors.time = 'Pick a time.';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.company) companyRef.current?.focus();
      else if (nextErrors.day) dayRef.current?.querySelector('button')?.focus();
      else timeRef.current?.querySelector('button')?.focus();
      return;
    }

    const reference = `BRN-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setBooked({ name, email, day, time, service, message, reference });
    showToast(`Demo booked. Reference ${reference}.`);
  };

  const reset = () => {
    formRef.current?.reset();
    setDay('');
    setTime('');
    setErrors({});
    setBooked(null);
  };

  if (booked) {
    return (
      <div className="form-card form-success" role="status" aria-live="polite">
        <span className="success-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2>You’re booked, {booked.name.split(' ')[0]}.</h2>
        <p>
          {booked.day} at {booked.time} PT, {booked.service}.
          <br />
          A calendar invite is on its way to {booked.email}.
        </p>
        <span className="mono">Reference {booked.reference}</span>
        <p className="form-note">Preview only — no calendar invite is sent.</p>
        <div className="page-actions is-centered">
          <Link className="btn btn-primary" href="/">
            Back to home
          </Link>
          <button type="button" className="btn" onClick={reset}>
            Book another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" ref={formRef} onSubmit={submit} noValidate>
      <p className="form-note">Preview form — no booking is created yet.</p>

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

      <div className="form-grid">
        <div className={`field${errors.company ? ' is-invalid' : ''}`}>
          <label htmlFor={`${baseId}-company`}>Company</label>
          <input
            ref={companyRef}
            id={`${baseId}-company`}
            name="company"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? `${baseId}-company-error` : undefined}
          />
          <span className="field-error" id={`${baseId}-company-error`} aria-live="polite">
            {errors.company ?? ''}
          </span>
        </div>
        <div className="field">
          <label htmlFor={`${baseId}-size`}>Team size</label>
          <select id={`${baseId}-size`} name="size">
            {demoSizes.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="field choice-field">
        <legend className="field-label">I’m interested in</legend>
        <div className="choice-grid">
          {services.map((item) => (
            <button
              key={item}
              type="button"
              className="chip"
              aria-pressed={service === item}
              onClick={() => setService(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset
        ref={dayRef}
        className={`field choice-field${errors.day ? ' is-invalid' : ''}`}
        aria-describedby={errors.day ? `${baseId}-day-error` : undefined}
      >
        <legend className="field-label">Day</legend>
        <div className="choice-grid">
          {days.map((item) => (
            <button
              key={item}
              type="button"
              className="chip"
              aria-pressed={day === item}
              onClick={() => {
                setDay(item);
                setErrors((current) => ({ ...current, day: undefined }));
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="field-error" id={`${baseId}-day-error`} aria-live="polite">
          {errors.day ?? ''}
        </span>
      </fieldset>

      <fieldset
        ref={timeRef}
        className={`field choice-field${errors.time ? ' is-invalid' : ''}`}
        aria-describedby={errors.time ? `${baseId}-time-error` : undefined}
      >
        <legend className="field-label">Time (PT)</legend>
        <div className="choice-grid">
          {demoTimes.map((item) => (
            <button
              key={item}
              type="button"
              className="chip"
              aria-pressed={time === item}
              onClick={() => {
                setTime(item);
                setErrors((current) => ({ ...current, time: undefined }));
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="field-error" id={`${baseId}-time-error`} aria-live="polite">
          {errors.time ?? ''}
        </span>
      </fieldset>

      <div className="field">
        <label htmlFor={`${baseId}-message`}>What should we cover? (optional)</label>
        <textarea ref={messageRef} id={`${baseId}-message`} name="message" />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Confirm booking <i aria-hidden="true">→</i>
      </button>
    </form>
  );
}
