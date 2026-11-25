'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { showToast } from '@/lib/ui';

const emailPattern = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;
const urlPattern = /^https?:\/\/.+\..+/i;

export default function CareersClient({ roles, departments }) {
  const [department, setDepartment] = useState('All');
  const [query, setQuery] = useState('');
  const [applying, setApplying] = useState(null);
  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const linkRef = useRef(null);
  const titleId = useId();
  const searchId = useId();
  const baseId = useId();

  const visibleRoles = roles.filter(
    (role) =>
      (department === 'All' || role.department === department) &&
      `${role.title} ${role.description}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    if (!applying) return;
    const dialog = dialogRef.current;
    setErrors({});
    formRef.current?.reset();
    if (dialog && !dialog.open) dialog.showModal();
  }, [applying]);

  const close = () => {
    dialogRef.current?.close();
  };

  const submit = (event) => {
    event.preventDefault();
    const name = nameRef.current?.value.trim() ?? '';
    const email = emailRef.current?.value.trim() ?? '';
    const link = linkRef.current?.value.trim() ?? '';
    const nextErrors = {};

    if (name.length < 2) nextErrors.name = 'Enter your full name.';
    if (!emailPattern.test(email)) nextErrors.email = 'Enter a valid email.';
    if (!urlPattern.test(link)) nextErrors.link = 'Enter a full URL starting with https://';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else linkRef.current?.focus();
      return;
    }

    const roleTitle = applying?.title;
    close();
    showToast(`Application sent for ${roleTitle}. We reply within 5 working days.`);
  };

  return (
    <>
      <div className="filter-row">
        <div className="chip-row" role="group" aria-label="Filter roles by department">
          {departments.map((item) => (
            <button
              key={item}
              type="button"
              className="chip"
              aria-pressed={department === item}
              onClick={() => setDepartment(item)}
            >
              {item}
              <small>
                {item === 'All'
                  ? roles.length
                  : roles.filter((role) => role.department === item).length}
              </small>
            </button>
          ))}
        </div>
        <div className="search-field">
          <label className="sr-only" htmlFor={searchId}>
            Search roles
          </label>
          <input
            id={searchId}
            className="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search roles"
          />
        </div>
      </div>

      {visibleRoles.length ? (
        <div className="role-list">
          {visibleRoles.map((role) => (
            <article className="role-row" key={role.title}>
              <div>
                <h3>{role.title}</h3>
                <span className="mono">
                  {role.department} / {role.location}
                </span>
                <p>{role.description}</p>
              </div>
              <button type="button" className="btn" onClick={() => setApplying(role)}>
                Apply <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="faq-empty">
          No open roles match. Email{' '}
          <a className="text-link" href="mailto:careers@bryn.com">
            careers@bryn.com
          </a>{' '}
          and we’ll keep your details on file.
        </p>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setApplying(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="dialog-card">
          <button type="button" className="dialog-close" aria-label="Close" onClick={close}>
            ×
          </button>
          <h2 id={titleId}>Apply: {applying?.title}</h2>
          <p>We reply within five working days.</p>
          <p className="form-note">Preview only — no application is sent.</p>
          <form ref={formRef} onSubmit={submit} noValidate>
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
              <label htmlFor={`${baseId}-email`}>Email</label>
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
            <div className={`field${errors.link ? ' is-invalid' : ''}`}>
              <label htmlFor={`${baseId}-link`}>LinkedIn or portfolio URL</label>
              <input
                ref={linkRef}
                id={`${baseId}-link`}
                name="link"
                type="url"
                placeholder="https://"
                aria-invalid={Boolean(errors.link)}
                aria-describedby={errors.link ? `${baseId}-link-error` : undefined}
              />
              <span className="field-error" id={`${baseId}-link-error`} aria-live="polite">
                {errors.link ?? ''}
              </span>
            </div>
            <div className="field">
              <label htmlFor={`${baseId}-resume`}>Résumé (PDF)</label>
              <input id={`${baseId}-resume`} name="resume" type="file" accept=".pdf,.doc,.docx" />
              <span className="field-hint">Optional in this preview.</span>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Send application <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
