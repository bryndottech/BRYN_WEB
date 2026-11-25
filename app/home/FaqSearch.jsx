'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import Accordion from '@/app/components/Accordion';

export default function FaqSearch({ faqs }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return faqs;
    return faqs.filter((faq) =>
      `${faq.question} ${faq.answer}`.toLowerCase().includes(value),
    );
  }, [faqs, query]);

  return (
    <div className="faq-layout">
      <div>
        <h2>Questions, answered.</h2>
        <label className="sr-only" htmlFor="faq-search">
          Search questions
        </label>
        <input
          id="faq-search"
          className="faq-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search questions"
        />
        <p className="faq-help">
          Can’t find it?{' '}
          <Link className="text-link" href="/demo">
            Talk to us
          </Link>
        </p>
      </div>
      <div>
        <Accordion
          key={query}
          items={filtered.map((faq) => ({ title: faq.question, body: faq.answer }))}
          emptyMessage="No match. Email hello@bryn.com and we’ll answer within a day."
        />
      </div>
    </div>
  );
}
