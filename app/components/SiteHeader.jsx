'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { mobileNav, primaryNav } from '@/lib/content';
import { showToast } from '@/lib/ui';
import ThemeToggle from './ThemeToggle';

const emailPattern = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const wasMenuOpen = useRef(false);
  const signInRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen) {
      wasMenuOpen.current = true;
      const firstLink = drawerRef.current?.querySelector('a');
      firstLink?.focus();
    } else if (wasMenuOpen.current) {
      wasMenuOpen.current = false;
      menuButtonRef.current?.focus({ preventScroll: true });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!signInOpen) return;
    const dialog = signInRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, [signInOpen]);

  const openSignIn = () => {
    setMenuOpen(false);
    setErrors({});
    setSignInOpen(true);
  };

  const closeSignIn = () => {
    signInRef.current?.close();
    setSignInOpen(false);
  };

  const submitSignIn = (event) => {
    event.preventDefault();
    const email = emailRef.current?.value.trim() ?? '';
    const password = passwordRef.current?.value ?? '';
    const nextErrors = {};
    if (!emailPattern.test(email)) nextErrors.email = 'Enter a valid work email.';
    if (password.length < 6) nextErrors.password = 'Use at least 6 characters.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    closeSignIn();
    event.currentTarget.reset();
    showToast('Signed in. Welcome back to Bryn.');
  };

  const isActive = (href) => href === pathname;

  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Primary">
          <Link className="brand" href="/" aria-label="BRYN home">
            <Image src="/brand/bryn-mark.png" alt="" width={200} height={174} priority />
            BRYN
          </Link>

          <div className="nav-links">
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="command-trigger"
              aria-label="Open command menu"
              onClick={() => window.dispatchEvent(new CustomEvent('bryn:command'))}
            >
              ⌘K
            </button>
            <ThemeToggle />
            <button type="button" className="sign-in" onClick={openSignIn}>
              Sign in
            </button>
            <Link className="btn btn-dark btn-sm" href="/demo">
              Book a demo <span aria-hidden="true">→</span>
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="icon-button menu-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menu-lines" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={drawerRef}
        id="mobile-menu"
        className={`mobile-drawer${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        {mobileNav.map((item) => (
          <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link className="btn btn-primary" href="/demo" onClick={() => setMenuOpen(false)}>
          Book a demo →
        </Link>
      </div>

      <dialog
        ref={signInRef}
        aria-labelledby="signin-title"
        onClose={() => setSignInOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeSignIn();
        }}
      >
        <div className="dialog-card">
          <button type="button" className="dialog-close" aria-label="Close" onClick={closeSignIn}>
            ×
          </button>
          <h2 id="signin-title">Sign in to Bryn</h2>
          <p>Preview only. No account is created.</p>
          <form onSubmit={submitSignIn} noValidate>
            <div className={`field${errors.email ? ' is-invalid' : ''}`}>
              <label htmlFor="signin-email">Work email</label>
              <input
                ref={emailRef}
                id="signin-email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'signin-email-error' : undefined}
              />
              <span className="field-error" id="signin-email-error" aria-live="polite">
                {errors.email ?? ''}
              </span>
            </div>
            <div className={`field${errors.password ? ' is-invalid' : ''}`}>
              <label htmlFor="signin-password">Password</label>
              <input
                ref={passwordRef}
                id="signin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'signin-password-error' : undefined}
              />
              <span className="field-error" id="signin-password-error" aria-live="polite">
                {errors.password ?? ''}
              </span>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Sign in <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
