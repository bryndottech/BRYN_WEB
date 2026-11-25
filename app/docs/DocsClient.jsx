'use client';

import { useId, useMemo, useState } from 'react';
import { copyText } from '@/lib/ui';

export default function DocsClient({ sections, content }) {
  const [activeKey, setActiveKey] = useState('quick');
  const [activeLanguage, setActiveLanguage] = useState(
    Object.keys(content.quick.samples)[0],
  );
  const [query, setQuery] = useState('');
  const searchId = useId();

  const doc = content[activeKey];
  const languages = useMemo(() => Object.keys(doc.samples), [doc]);
  const language = languages.includes(activeLanguage) ? activeLanguage : languages[0];
  const code = doc.samples[language];

  const openDoc = (key) => {
    setActiveKey(key);
    setActiveLanguage(Object.keys(content[key].samples)[0]);
  };

  const value = query.trim().toLowerCase();

  return (
    <div className="docs-layout">
      <nav className="docs-nav" aria-label="Docs">
        <label className="sr-only" htmlFor={searchId}>
          Search docs
        </label>
        <input
          id={searchId}
          className="search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search docs"
        />
        {sections.map((section) => (
          <div key={section.heading}>
            <h3>{section.heading}</h3>
            {section.items.map((item) => (
              <button
                key={item.key}
                type="button"
                className={item.key === activeKey ? 'is-active' : undefined}
                aria-pressed={item.key === activeKey}
                hidden={Boolean(value) && !item.label.toLowerCase().includes(value)}
                onClick={() => openDoc(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="docs-body">
        <h2>{doc.title}</h2>
        <p>{doc.body}</p>

        <div className="code-block">
          <div className="code-tabs" role="group" aria-label="Code samples">
            {languages.map((item) => (
              <button
                key={item}
                type="button"
                className={item === language ? 'is-active' : undefined}
                aria-pressed={item === language}
                onClick={() => setActiveLanguage(item)}
              >
                {item}
              </button>
            ))}
            <button
              type="button"
              className="copy-button"
              onClick={() => copyText(code)}
              aria-label={`Copy ${language} sample`}
            >
              Copy
            </button>
          </div>
          <pre aria-live="polite">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
