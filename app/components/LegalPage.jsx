import PageHero from './PageHero';

export default function LegalPage({ title, sections, idPrefix }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description="Sample text for this preview. Replace it with counsel-reviewed language before launch."
      >
        <span className="mono legal-date">Last updated Nov 22, 2026</span>
      </PageHero>

      <section className="section section-tight">
        <div className="container legal-layout">
          <nav className="toc" aria-label="On this page">
            {sections.map(([heading], index) => (
              <a key={heading} href={`#${idPrefix}-${index}`}>
                {heading}
              </a>
            ))}
          </nav>
          <div className="legal-body">
            {sections.map(([heading, body], index) => (
              <section key={heading}>
                <h2 id={`${idPrefix}-${index}`}>{heading}</h2>
                <p>{body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
