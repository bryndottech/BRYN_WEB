'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import ServiceArt from '@/app/components/ServiceArt';

export default function ServicesAccordion({ services }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className="services-list">
      {services.map((service, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-service-${index}`;
        const panelId = `${baseId}-service-panel-${index}`;
        return (
          <div className={`service-item${isOpen ? ' is-open' : ''}`} key={service.title}>
            <button
              id={buttonId}
              type="button"
              className="service-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              {service.title}
              <i aria-hidden="true">+</i>
            </button>
            <div
              id={panelId}
              className="service-panel"
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
            >
              <div>
                <div className="service-content">
                  <div>
                    <p>{service.description}</p>
                    <div className="service-tags">
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <Link
                      className="btn btn-primary"
                      href={`/demo?service=${encodeURIComponent(service.title)}`}
                    >
                      Start a project <span aria-hidden="true">→</span>
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
