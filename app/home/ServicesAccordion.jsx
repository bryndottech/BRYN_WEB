'use client';

import { useId, useState, useEffect } from 'react';
import Link from 'next/link';
import ServiceArt from '@/app/components/ServiceArt';

export default function ServicesAccordion({ services }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  // Deep links from footer service links carry a data-svc index and open the target service.
  useEffect(() => {
    const openService = (index) => {
      const svcIndex = Number(index);
      if (svcIndex >= 0 && svcIndex < services.length) {
        setOpenIndex(svcIndex);
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    const onDeepService = (event) => {
      const target = event.target;
      const anchor = target instanceof Element ? target.closest('[data-svc]') : null;
      if (!anchor) return;
      event.preventDefault();
      openService(anchor.getAttribute('data-svc'));
    };
    document.addEventListener('click', onDeepService);
    return () => document.removeEventListener('click', onDeepService);
  }, [services.length]);

  return (
    <div className="sv">
      {services.map((service, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-service-${index}`;
        const panelId = `${baseId}-service-panel-${index}`;
        return (
          <div className={`sr${isOpen ? ' on' : ''}`} key={service.title}>
            <button
              id={buttonId}
              type="button"
              className="sh"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              {service.title}
              <i aria-hidden="true">+</i>
            </button>
            <div
              id={panelId}
              className="sbd"
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
            >
              <div>
                <div className="sbi">
                  <div>
                    <p>{service.description}</p>
                    <div className="tags">
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <Link
                      className="btn btn-primary"
                      href={`/demo?service=${encodeURIComponent(service.title)}`}
                    >
                      Start a project <i aria-hidden="true">→</i>
                    </Link>
                  </div>
                  <ServiceArt type={service.art} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
