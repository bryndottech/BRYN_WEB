'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const chars = 'ABCDEF0123456789<>/_';
const CURTAIN_ID = 'route-curtain';

export default function InteractionEffects() {
  const pathname = usePathname();
  const firstRoute = useRef(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Scroll reveals. [data-r] is only hidden when JS is available.
    let revealObserver = null;
    if (!reduced && 'IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.15 }
      );
    }

    const observeReveals = () => {
      document.querySelectorAll('[data-r], .m, .sp').forEach((element) => {
        if (element.classList.contains('in')) return;
        if (reduced || !revealObserver) element.classList.add('in');
        else revealObserver.observe(element);
      });
      document.querySelectorAll('.hero .m').forEach((element) => element.classList.add('in'));
    };
    observeReveals();

    // Page-header eyebrow scramble.
    document.querySelectorAll('[data-sc]').forEach((element) => {
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
        }
      }, 28);
    });

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

    // Card spotlight and tilt.
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
          card.style.setProperty('--x', `${px * 100}%`);
          card.style.setProperty('--y', `${py * 100}%`);
          card.style.setProperty('--spot-x', `${px * 100}%`);
          card.style.setProperty('--spot-y', `${py * 100}%`);
          card.style.setProperty('--rx', `${(0.5 - py) * 4}deg`);
          card.style.setProperty('--ry', `${(px - 0.5) * 5}deg`);
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

    // Count-up metrics.
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

    // Start the curtain before internal navigation.
    const curtain = document.getElementById(CURTAIN_ID);
    if (curtain) {
      document.addEventListener(
        'click',
        (event) => {
          if (reduced || event.defaultPrevented || event.button !== 0) return;
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          const link = event.target.closest?.('a[href]');
          if (!link) return;
          const href = link.getAttribute('href');
          if (!href || href.startsWith('#') || link.target === '_blank') return;
          const url = new URL(href, window.location.href);
          if (url.origin !== window.location.origin) return;
          if (url.pathname === window.location.pathname && url.hash) return;
          curtain.classList.remove('out');
          curtain.classList.add('in');
        },
        { signal }
      );
    }

    return () => {
      controller.abort();
      revealObserver?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return undefined;
    }
    const curtain = document.getElementById(CURTAIN_ID);
    if (!curtain || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    curtain.className = 'in';
    const outTimer = window.setTimeout(() => {
      curtain.className = 'out';
    }, 580);
    const doneTimer = window.setTimeout(() => {
      curtain.className = '';
    }, 1300);
    return () => {
      window.clearTimeout(outTimer);
      window.clearTimeout(doneTimer);
    };
  }, [pathname]);

  return null;
}
