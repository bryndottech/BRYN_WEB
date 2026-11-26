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
    <div className="faq-layout fq">
      <div>
        <h2 data-r>Questions, answered.</h2>
        <label className="sr-only" htmlFor="fs">
          Search questions
        </label>
        <input
          id="fs"
          className="faq-search sx"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search questions"
        />
        <p className="faq-help">
          Can’t find it?{' '}
          <Link className="ln" href="/contact">
            Talk to us
          </Link>
        </p>
      </div>
      <div id="fq">
        <Accordion
          key={query}
          items={filtered.map((faq) => ({ title: faq.question, body: faq.answer }))}
          defaultOpen={0}
          emptyMessage="No match. Email bryndottech@gmail.com for assistance."
          variant="live"
        />
      </div>
    </div>
  );
}
