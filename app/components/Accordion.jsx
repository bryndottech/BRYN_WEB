'use client';

import { useId, useState } from 'react';

export default function Accordion({ items, defaultOpen = 0, emptyMessage }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();

  if (!items.length) {
    return <p className="faq-empty">{emptyMessage ?? 'No results.'}</p>;
  }

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div className={`accordion-item${isOpen ? ' is-open' : ''}`} key={item.title}>
            <button
              id={buttonId}
              type="button"
              className="accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              {item.title}
              <i aria-hidden="true">+</i>
            </button>
            <div
              id={panelId}
              className="accordion-panel"
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
            >
              <div>
                <p>{item.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
