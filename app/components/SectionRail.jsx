'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const SECTIONS = [
  { id: 'top', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'customers', label: 'What We Do' },
  { id: 'approach', label: 'Our process' },
  { id: 'faq', label: 'FAQs' },
  { id: 'cta', label: 'Start a project' },
];

export default function SectionRail() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('top');
  const [showRail, setShowRail] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => setShowRail(window.innerWidth >= 1440);

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      let current = 'top';
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    let frame = null;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        handleScroll();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!showRail || pathname !== '/') return null;

  return (
    <aside className="rail" id="rail" aria-label="Page sections">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={activeSection === section.id ? 'on' : ''}
        >
          <i aria-hidden="true" />
          <span>{section.label}</span>
        </a>
      ))}
    </aside>
  );
}
