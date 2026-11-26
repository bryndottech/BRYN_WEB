'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
import { services } from '@/lib/content';
import { withBasePath } from '@/lib/paths';
import ThemeToggle from './ThemeToggle';

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [active, setActive] = useState('/');
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const wasMenuOpen = useRef(false);
  const lastScrollY = useRef(0);
  const navProgressRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setServiceMenuOpen(false);
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
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setServiceMenuOpen(false);
      }
    };
    const onDocumentClick = (event) => {
      if (!event.target.closest?.('.service-nav')) setServiceMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onDocumentClick);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
      navProgressRef.current?.style.setProperty('--p', String(progress));

      const navElement = document.querySelector('.nav-shell');
      if (menuOpen || serviceMenuOpen || !navElement) return;
      const scrollDiff = y - lastScrollY.current;
      if (y > 500 && scrollDiff > 0) navElement.classList.add('hd2');
      else if (scrollDiff < 0) navElement.classList.remove('hd2');
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen, serviceMenuOpen]);

  useEffect(() => {
    const sections = [
      ['top', '/'],
      ['services', '/#services'],
      ['customers', '/#customers'],
      ['faq', '/#faq'],
    ];
    const update = () => {
      if (pathname !== '/') {
        setActive(pathname);
        return;
      }
      let next = '/';
      sections.forEach(([id, href]) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top < window.innerHeight * 0.48) {
          next = href;
        }
      });
      const hashHref = window.location.hash ? `/${window.location.hash}` : '';
      if (sections.some(([, href]) => href === hashHref)) next = hashHref;
      setActive(next);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('hashchange', update);
    };
  }, [pathname]);

  const closeMenus = () => {
    setMenuOpen(false);
    setServiceMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Primary">
          <Link className="brand" href="/" aria-label="BRYN Technologies home">
            <Image
              src={withBasePath('/brand/bryn-mark.png')}
              alt=""
              width={200}
              height={174}
              priority
            />
            BRYN
          </Link>{' '}
          <div className="nav-links" aria-label="Main navigation">
            <Link href="/" className={active === '/' ? 'is-active' : undefined}>
              Home
            </Link>{' '}
            <div className={`service-nav${serviceMenuOpen ? ' is-open' : ''}`}>
              <Link
                id="services-toggle"
                href="/#services"
                className={`service-nav-toggle${active === '/#services' ? ' is-active' : ''}`}
                aria-haspopup="true"
                aria-expanded={serviceMenuOpen}
                aria-controls="nav-services-menu"
                onClick={(event) => {
                  event.preventDefault();
                  setServiceMenuOpen((open) => !open);
                }}
              >
                Services <span aria-hidden="true">▾</span>
              </Link>{' '}
              <div
                className="service-nav-menu"
                id="nav-services-menu"
                role="menu"
                aria-label="Services"
              >
                {services.map((service, index) => (
                  <Fragment key={service.title}>
                    <Link
                      href="/#services"
                      role="menuitem"
                      data-svc={String(index)}
                      onClick={closeMenus}
                    >
                      <b>{service.title}</b>
                    </Link>{' '}
                  </Fragment>
                ))}
              </div>
            </div>{' '}
            <Link
              href="/#customers"
              className={active === '/#customers' ? 'is-active' : undefined}
            >
              What We Do
            </Link>{' '}
            <Link href="/about" className={active === '/about' ? 'is-active' : undefined}>
              About Us
            </Link>{' '}
            <Link href="/contact" className={active === '/contact' ? 'is-active' : undefined}>
              Contact
            </Link>{' '}
          </div>{' '}
          <div className="nav-actions">
            <ThemeToggle />{' '}
            <Link className="btn btn-dark btn-sm mag" href="/contact">
              Start a Project <i aria-hidden="true">→</i>
            </Link>{' '}
            <button
              ref={menuButtonRef}
              type="button"
              className="icon-button menu-toggle"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menu-lines" aria-hidden="true" />
            </button>
          </div>
          <i className="nav-progress" aria-hidden="true" ref={navProgressRef} />
        </nav>
      </header>

      <div
        ref={drawerRef}
        id="mobile-menu"
        className={`mobile-drawer${menuOpen ? ' is-open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <Link href="/" onClick={closeMenus} className={active === '/' ? 'is-active' : undefined}>
          Home
        </Link>{' '}
        <div className="drawer-services">
          <button
            type="button"
            className={`drawer-service-toggle${active === '/#services' ? ' is-active' : ''}`}
            aria-expanded={serviceMenuOpen}
            aria-controls="mobile-service-links"
            onClick={() => setServiceMenuOpen((open) => !open)}
          >
            Services <span aria-hidden="true">{serviceMenuOpen ? '－' : '＋'}</span>
          </button>{' '}
          <div className="drawer-service-links" id="mobile-service-links" hidden={!serviceMenuOpen}>
            {services.map((service, index) => (
              <Fragment key={service.title}>
                <Link
                  href="/#services"
                  data-svc={String(index)}
                  onClick={closeMenus}
                >
                  {service.title}
                </Link>{' '}
              </Fragment>
            ))}
          </div>
        </div>{' '}
        <Link
          href="/#customers"
          onClick={closeMenus}
          className={active === '/#customers' ? 'is-active' : undefined}
        >
          What We Do
        </Link>{' '}
        <Link
          href="/about"
          onClick={closeMenus}
          className={active === '/about' ? 'is-active' : undefined}
        >
          About Us
        </Link>{' '}
        <Link
          href="/contact"
          onClick={closeMenus}
          className={active === '/contact' ? 'is-active' : undefined}
        >
          Contact
        </Link>{' '}
        <Link className="btn btn-primary" href="/contact" onClick={closeMenus}>
          Start a Project →
        </Link>{' '}
      </div>
    </>
  );
}
