'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { basePath } from '@/lib/paths';

const chars = 'ABCDEF0123456789<>/_';
const CURTAIN_ID = 'route-curtain';
const CURTAIN_HOLD_MS = 580;
const CURTAIN_RESET_AFTER_OUT_MS = 720;

function removeBasePath(path) {
  if (!basePath) return path;
  if (path === basePath) return '/';
  if (path.startsWith(`${basePath}/`)) return path.slice(basePath.length);
  return path;
}

export default function InteractionEffects() {
  const pathname = usePathname();
  const router = useRouter();
  const firstRoute = useRef(true);
  const pendingNavigation = useRef(false);
  const startRevealsRef = useRef(() => {});

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const timers = new Set();

    const later = (fn, ms) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        fn();
      }, ms);
      timers.add(timer);
      return timer;
    };

    // Scroll reveals. [data-r] is only hidden when JS is available.
    const revealObserver =
      !reduced && 'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
              });
            },
            { threshold: 0.15 }
          )
        : null;

    const scramble = (element) => {
      if (reduced || element.dataset.scrambled === '1') return;
      element.dataset.scrambled = '1';
      const text = element.textContent || '';
      let frame = 0;
      const timer = window.setInterval(() => {
        element.textContent = text
          .split('')
          .map((character, index) =>
            character === ' ' || index < frame / 2
              ? character
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join('');
        if (++frame > text.length * 2) {
          element.textContent = text;
          window.clearInterval(timer);
          timers.delete(timer);
        }
      }, 28);
      timers.add(timer);
    };

    const startCountUps = () => {
      document.querySelectorAll('[data-n]').forEach((element) => {
        if (element.dataset.countBound === '1') return;
        element.dataset.countBound = '1';
        const target = Number.parseFloat(element.dataset.n || '0');
        const decimals = Number.parseInt(element.dataset.d || '0', 10);
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';
        const render = (value) => {
          element.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
        };
        if (reduced || !('IntersectionObserver' in window)) {
          render(target);
          return;
        }
        const countObserver = new IntersectionObserver(
          (entries) => {
            if (!entries[0].isIntersecting) return;
            countObserver.disconnect();
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min(1, (now - start) / 1600);
              render(target * (1 - Math.pow(1 - progress, 4)));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          },
          { threshold: 0.6 }
        );
        countObserver.observe(element);
        signal.addEventListener('abort', () => countObserver.disconnect(), { once: true });
      });
    };

    // With a route curtain, the new page's entrance starts as the logo exits,
    // never while it is still covering the screen.
    const startReveals = () => {
      document.querySelectorAll('[data-r], .m, .sp').forEach((element) => {
        if (element.classList.contains('in')) return;
        if (reduced || !revealObserver) element.classList.add('in');
        else revealObserver.observe(element);
      });
      document.querySelectorAll('[data-sc]').forEach(scramble);
      startCountUps();
    };
    startRevealsRef.current = startReveals;

    // Listeners from the previous route were aborted, so allow clean rebinding.
    document
      .querySelectorAll('[data-mag-bound], [data-tilt-bound], [data-agency-bound]')
      .forEach((element) => {
        delete element.dataset.magBound;
        delete element.dataset.tiltBound;
        delete element.dataset.agencyBound;
      });

    // Magnetic buttons.
    document.querySelectorAll('.mag').forEach((button) => {
      if (button.dataset.magBound === '1') return;
      button.dataset.magBound = '1';
      button.addEventListener(
        'pointermove',
        (event) => {
          if (reduced || !finePointer) return;
          const rect = button.getBoundingClientRect();
          const x = (event.clientX - rect.left - rect.width / 2) * 0.2;
          const y = (event.clientY - rect.top - rect.height / 2) * 0.3;
          button.style.transform = `translate(${x}px, ${y}px)`;
        },
        { signal }
      );
      const reset = () => {
        button.style.transform = '';
      };
      button.addEventListener('pointerleave', reset, { signal });
      button.addEventListener('blur', reset, { signal });
    });

    // Latest-main card tilt and spotlight.
    document.querySelectorAll('.cd, .pc, .platform-card').forEach((card) => {
      if (card.dataset.tiltBound === '1') return;
      card.dataset.tiltBound = '1';
      const reset = () => {
        card.style.setProperty('--x', '50%');
        card.style.setProperty('--y', '0%');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--spot-x', '50%');
        card.style.setProperty('--spot-y', '50%');
      };
      card.addEventListener(
        'pointermove',
        (event) => {
          if (reduced || !finePointer) return;
          const rect = card.getBoundingClientRect();
          const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
          const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
          card.style.setProperty('--x', `${event.clientX - rect.left}px`);
          card.style.setProperty('--y', `${event.clientY - rect.top}px`);
          card.style.setProperty('--spot-x', `${px * 100}%`);
          card.style.setProperty('--spot-y', `${py * 100}%`);
          card.style.setProperty('--rx', `${(0.5 - py) * 5}deg`);
          card.style.setProperty('--ry', `${(px - 0.5) * 6}deg`);
        },
        { signal }
      );
      card.addEventListener('pointerleave', reset, { signal });
      card.addEventListener('blur', reset, { signal });
    });

    // Latest-main glass agency-card spotlight and tilt.
    document.querySelectorAll('.agency-grid .agency-card').forEach((card) => {
      if (card.dataset.agencyBound === '1') return;
      card.dataset.agencyBound = '1';
      let frame = 0;
      const reset = () => {
        window.cancelAnimationFrame(frame);
        card.style.setProperty('--card-x', '0px');
        card.style.setProperty('--card-y', '0px');
        card.style.setProperty('--card-rx', '0deg');
        card.style.setProperty('--card-ry', '0deg');
        card.style.setProperty('--spot-x', '50%');
        card.style.setProperty('--spot-y', '50%');
      };
      card.addEventListener(
        'pointermove',
        (event) => {
          if (reduced || !finePointer) return;
          const rect = card.getBoundingClientRect();
          const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
          const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
          window.cancelAnimationFrame(frame);
          frame = window.requestAnimationFrame(() => {
            card.style.setProperty('--spot-x', `${px * 100}%`);
            card.style.setProperty('--spot-y', `${py * 100}%`);
            card.style.setProperty('--card-x', `${(px - 0.5) * 5}px`);
            card.style.setProperty('--card-y', `${(py - 0.5) * 5}px`);
            card.style.setProperty('--card-rx', `${(0.5 - py) * 4}deg`);
            card.style.setProperty('--card-ry', `${(px - 0.5) * 5}deg`);
          });
        },
        { signal }
      );
      card.addEventListener('pointerleave', reset, { signal });
      card.addEventListener('blur', reset, { signal });
    });

    // Internal navigation must finish covering the screen before the route changes.
    const curtain = document.getElementById(CURTAIN_ID);
    if (curtain) {
      document.addEventListener(
        'click',
        (event) => {
          if (event.defaultPrevented || event.button !== 0) return;
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          const link = event.target.closest?.('a[href]');
          if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
          const href = link.getAttribute('href');
          if (!href || href.startsWith('#')) return;
          const url = new URL(href, window.location.href);
          if (url.origin !== window.location.origin) return;

          const currentPath = window.location.pathname;
          if (url.pathname === currentPath && url.hash) return;
          if (url.pathname === currentPath && url.search === window.location.search && !url.hash) {
            event.preventDefault();
            event.stopPropagation();
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
            return;
          }
          if (pendingNavigation.current) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          document.documentElement.removeAttribute('data-initial-mask');
          const target = `${removeBasePath(url.pathname)}${url.search}${url.hash}`;

          if (reduced) {
            router.push(target);
            return;
          }
          pendingNavigation.current = true;
          curtain.classList.remove('out');
          curtain.classList.add('in');
          later(() => router.push(target), CURTAIN_HOLD_MS);
        },
        { signal, capture: true }
      );
    }

    return () => {
      controller.abort();
      revealObserver?.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [pathname, router]);

  useEffect(() => {
    const curtain = document.getElementById(CURTAIN_ID);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isInitialRoute = firstRoute.current;
    firstRoute.current = false;
    if (!isInitialRoute) document.documentElement.removeAttribute('data-initial-mask');
    const timers = new Set();
    const later = (fn, ms) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        fn();
      }, ms);
      timers.add(timer);
      return timer;
    };

    if (isInitialRoute) {
      if (!reduced) {
        later(() => {
          document.querySelectorAll('.hero .m').forEach((element) => element.classList.add('in'));
        }, 120);
        later(() => document.documentElement.removeAttribute('data-initial-mask'), 1500);
      } else {
        document.documentElement.removeAttribute('data-initial-mask');
      }
      startRevealsRef.current();
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }

    if (pendingNavigation.current) {
      pendingNavigation.current = false;
      if (curtain && !reduced) {
        curtain.className = 'out';
        later(() => {
          curtain.className = '';
        }, CURTAIN_RESET_AFTER_OUT_MS);
      }
      startRevealsRef.current();
    } else if (curtain && !reduced) {
      // Browser back/forward changes the route before we can cover it. Show the
      // same logo hold, then reveal with the curtain exit.
      curtain.className = 'in';
      later(() => {
        curtain.className = 'out';
        startRevealsRef.current();
      }, CURTAIN_HOLD_MS);
      later(() => {
        curtain.className = '';
      }, CURTAIN_HOLD_MS + CURTAIN_RESET_AFTER_OUT_MS);
    } else {
      startRevealsRef.current();
    }

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [pathname]);

  return null;
}
