'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import { copyText } from '@/lib/ui';

const allCategories = ['All', 'Engineering', 'Product', 'Security', 'Studio', 'Growth', 'Company'];

export default function JournalClient({ posts }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(-1);
  const searchId = useId();

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return posts
      .map((post, index) => ({ post, index }))
      .filter(
        ({ post }) =>
          (category === 'All' || post.category === category) &&
          `${post.title} ${post.excerpt}`.toLowerCase().includes(value),
      );
  }, [category, posts, query]);

  if (selected >= 0) {
    const post = posts[selected];
    const next = posts[(selected + 1) % posts.length];
    return (
      <article className="article">
        <button type="button" className="btn" onClick={() => setSelected(-1)}>
          ← Journal
        </button>
        <h2>{post.title}</h2>
        <span className="mono">
          {post.category} / {post.date} / {post.read} read
        </span>
        <p>{post.excerpt}</p>
        <p>
          The full write-up walks through the trade-offs, the numbers we measured and the mistakes
          we made along the way. Here are the three ideas that mattered most.
        </p>
        <ul>
          {post.takeaways.map((takeaway) => (
            <li key={takeaway}>{takeaway}</li>
          ))}
        </ul>
        <div className="article-actions">
          <button
            type="button"
            className="btn"
            onClick={() => copyText(window.location.href)}
          >
            Copy link
          </button>
          <Link className="btn btn-primary" href="/demo">
            Book a demo <i aria-hidden="true">→</i>
          </Link>
        </div>
        <div className="next-post">
          <span className="mono">Next up</span>
          <h3>{next.title}</h3>
          <button
            type="button"
            className="text-link"
            onClick={() => setSelected((selected + 1) % posts.length)}
          >
            Read next article <i aria-hidden="true">→</i>
          </button>
        </div>
      </article>
    );
  }

  return (
    <>
      <div className="filter-row">
        <div className="chip-row" role="group" aria-label="Filter by category">
          {allCategories.map((item) => (
            <button
              key={item}
              type="button"
              className="chip"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="search-field">
          <label className="sr-only" htmlFor={searchId}>
            Search articles
          </label>
          <input
            id={searchId}
            className="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
          />
        </div>
      </div>

      {filtered.length ? (
        <div className="post-grid">
          {filtered.map(({ post, index }) => (
            <article className="post-card" key={post.title}>
              <span className="tag">{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="mono">
                {post.date} / {post.read}
              </span>
              <button type="button" className="text-link" onClick={() => setSelected(index)}>
                Read article <i aria-hidden="true">→</i>
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="faq-empty">No articles match your search.</p>
      )}
    </>
  );
}
