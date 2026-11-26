import Link from 'next/link';

export default function PageHero({ eyebrow, title, description, children, aside }) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <section className="page-hero">
      <div className={`container${aside ? ' page-hero-grid' : ''}`}>
        <div>
          <span className="tag">
            <span className="tag-dot" aria-hidden="true" />
            <span data-sc>{eyebrow}</span>
          </span>
          <h1 className="in">
            {lines.map((line) => (
              <span className="m" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p data-r>{description}</p>
          {children}
        </div>
        {aside ? <div>{aside}</div> : null}
      </div>
    </section>
  );
}
