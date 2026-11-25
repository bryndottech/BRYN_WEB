'use client';

import { useState } from 'react';

const filters = ['All', 'New', 'Improved', 'Fixed'];

export default function ChangelogClient({ releases }) {
  const [filter, setFilter] = useState('All');

  return (
    <>
      <div className="chip-row" role="group" aria-label="Filter releases">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className="chip"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="release-list">
        {releases.map((release) => {
          const items = release.items.filter(([type]) => filter === 'All' || type === filter);
          if (!items.length) return null;
          return (
            <article className="release" key={release.version}>
              <div>
                <h2>{release.version}</h2>
                <span className="mono">{release.date}</span>
              </div>
              <ul className="release-items">
                {items.map(([type, text]) => (
                  <li key={text}>
                    <span
                      className={`badge${type === 'New' ? ' is-new' : ''}${
                        type === 'Fixed' ? ' is-fixed' : ''
                      }`}
                    >
                      {type}
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </>
  );
}
