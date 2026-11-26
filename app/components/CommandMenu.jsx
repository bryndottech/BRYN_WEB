'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { commandPages } from '@/lib/content';
import { copyText, openCookieSettings, toggleTheme } from '@/lib/ui';

const actions = [
  { label: 'Toggle theme', group: 'Action', run: toggleTheme },
  { label: 'Copy BRYN email', group: 'Action', run: () => copyText('bryndottech@gmail.com') },
  { label: 'Cookie settings', group: 'Action', run: openCookieSettings },
];

export default function CommandMenu() {
  const router = useRouter();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(() => {
    const pages = commandPages.map((page) => ({
      ...page,
      run: () => router.push(page.href),
    }));
    return [...pages, ...actions];
  }, [router]);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return items;
    return items.filter((item) => item.label.toLowerCase().includes(value));
  }, [items, query]);

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setQuery('');
    setActiveIndex(0);
    dialog.showModal();
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const close = () => dialogRef.current?.close();

  const run = (index) => {
    const item = filtered[index];
    if (!item) return;
    close();
    item.run();
  };

  useEffect(() => {
    const onCommand = () => open();
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        const dialog = dialogRef.current;
        if (dialog?.open) dialog.close();
        else open();
      }
    };
    window.addEventListener('bryn:command', onCommand);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('bryn:command', onCommand);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const onInputKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (filtered.length ? (index + 1) % filtered.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) =>
        filtered.length ? (index - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      run(activeIndex);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="command-dialog"
      aria-label="Command menu"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      onClose={() => setQuery('')}
    >
      <input
        ref={inputRef}
        className="command-input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={onInputKeyDown}
        placeholder="Search pages and actions"
        aria-label="Search pages and actions"
        autoComplete="off"
        role="combobox"
        aria-expanded="true"
        aria-controls="command-results"
        aria-activedescendant={filtered[activeIndex] ? `command-item-${activeIndex}` : undefined}
      />
      <div className="command-list" id="command-results" role="listbox" aria-label="Results">
        {filtered.length ? (
          filtered.map((item, index) => (
            <button
              key={`${item.group}-${item.label}`}
              id={`command-item-${index}`}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              className={index === activeIndex ? 'is-active' : ''}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => run(index)}
            >
              {item.label}
              <small>{item.group}</small>
            </button>
          ))
        ) : (
          <p className="command-empty">No results.</p>
        )}
      </div>
    </dialog>
  );
}
