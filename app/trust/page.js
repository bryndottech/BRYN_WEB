import Link from 'next/link';
import Accordion from '@/app/components/Accordion';
import PageHero from '@/app/components/PageHero';
import { controls, subprocessors, trustPillars } from '@/lib/content';

export const metadata = {
  title: 'Trust center',
  description:
    'Independent audits, clear controls and a public list of subprocessors, so your security team can review us before the first call.',
};

export default function TrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust center"
        title={['Security you can', 'verify, not just read.']}
        description="Independent audits, clear controls and a public list of subprocessors, so your security team can review us before the first call."
      />

      <section className="section section-dark">
        <div className="container">
          <span className="tag tag-accent">Certifications and practices</span>
          <div className="trust-pillars">
            {trustPillars.map(([title, body]) => (
              <div key={title}>
                <h2>{title}</h2>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <div className="page-actions">
            <Link className="btn btn-primary" href="/contact?topic=Security">
              Request audit report <i aria-hidden="true">→</i>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Controls.</h2>
          <div className="trust-controls">
            <Accordion items={controls.map(([title, body]) => ({ title, body }))} />
          </div>

          <h2 className="section-subhead">Subprocessors.</h2>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Purpose</th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                {subprocessors.map(([vendor, purpose, region]) => (
                  <tr key={vendor}>
                    <td>{vendor}</td>
                    <td>{purpose}</td>
                    <td>{region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="subprocessor-note">
            Found a vulnerability? Email{' '}
            <a className="text-link" href="mailto:security@bryn.com">
              security@bryn.com
            </a>
            . We acknowledge reports within one business day and won’t pursue good-faith
            researchers.
          </p>
        </div>
      </section>
    </>
  );
}
