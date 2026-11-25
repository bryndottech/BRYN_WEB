import Link from 'next/link';
import PageHero from '@/app/components/PageHero';
import { aboutValues, leadership, milestones, offices } from '@/lib/content';

export const metadata = {
  title: 'About',
  description:
    'Bryn started with one belief: enterprise software should be calm, fast and accountable. Today we help hundreds of teams run on one backbone.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Bryn"
        title={['We build the systems', 'behind modern work.']}
        description="Bryn started with one belief: enterprise software should be calm, fast and accountable. Today we help hundreds of teams run on one backbone."
      />

      <section className="section section-tight">
        <div className="container">
          <p className="about-mission">
            Our mission is to make complex organizations feel simple to run.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <h2>What we believe.</h2>
          <div className="value-grid">
            {aboutValues.map(([title, body]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Milestones.</h2>
          <ul className="timeline">
            {milestones.map(([year, text]) => (
              <li key={year}>
                <b>{year}</b>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <h2 className="about-heading">Leadership.</h2>
          <div className="team-grid">
            {leadership.map(([name, role]) => (
              <div className="team-member" key={name}>
                <span className="avatar" aria-hidden="true">
                  {name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </span>
                <div>
                  <b>{name}</b>
                  <span>{role}</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="about-heading is-compact">Offices.</h2>
          <div className="office-list">
            {offices.map((office) => (
              <span key={office}>{office}</span>
            ))}
          </div>

          <div className="page-actions">
            <Link className="btn btn-primary" href="/careers">
              See open roles <span aria-hidden="true">→</span>
            </Link>
            <Link className="btn" href="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
