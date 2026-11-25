import Link from 'next/link';

export default function PageHero({ eyebrow, title, description, children, aside }) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <section className="page-hero">
      <div className={`container${aside ? ' page-hero-grid' : ''}`}>
        <div>
          <span className="tag">
            <span className="tag-dot" aria-hidden="true" />
            {eyebrow}
          </span>
          <h1>
            {lines.map((line) => (
              <span className="line" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p>{description}</p>
          {children}
        </div>
        {aside ? <div>{aside}</div> : null}
      </div>
    </section>
  );
}
