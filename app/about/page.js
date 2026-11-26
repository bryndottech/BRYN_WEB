import Link from 'next/link';
import PageHero from '@/app/components/PageHero';
import { aboutValues } from '@/lib/content';

export const metadata = {
  title: 'About BRYN',
  description:
    'BRYN Technologies brings development, design, marketing and technology services together to help businesses build and improve their digital presence.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About BRYN"
        title={['Digital expertise', 'for real business needs.']}
        description="BRYN Technologies brings development, design, marketing and technology services together to help businesses build and improve their digital presence."
      />

      <section className="section">
        <div className="container">
          <p className="big2" data-r>
            Our focus is practical digital work: understand the need, choose the right approach and
            deliver a solution that serves the business and its users.
          </p>
        </div>
      </section>

      <section className="section section-dark about-guide">
        <div className="container">
          <div className="hd">
            <h2 data-r>What guides our work.</h2>
            <p data-r>Clear communication, purposeful design and maintainable solutions.</p>
          </div>
          <div className="agency-grid">
            {aboutValues.map(([title, body]) => (
              <article className="agency-card" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="cta">
            <Link className="btn btn-primary" href="/#services">
              Explore services <i aria-hidden="true">→</i>
            </Link>
            <Link className="btn" href="/contact">
              Contact BRYN
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
