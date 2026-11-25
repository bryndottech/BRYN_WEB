import PageHero from '@/app/components/PageHero';
import { benefits, careersStats, departments, roles } from '@/lib/content';
import CareersClient from './CareersClient';

export const metadata = {
  title: 'Careers',
  description:
    'We’re a remote-first team of engineers, designers and marketers shipping infrastructure and the products around it. Small teams, real ownership, clear goals.',
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow={`We’re hiring: ${roles.length} open roles`}
        title={['Build the backbone', 'of modern work.']}
        description="We’re a remote-first team of engineers, designers and marketers shipping infrastructure and the products around it. Small teams, real ownership, clear goals."
      >
        <div className="stat-grid">
          {careersStats.map(([value, label]) => (
            <div className="stat-item" key={label}>
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="section section-dark">
        <div className="container">
          <h2>How we work.</h2>
          <div className="benefit-grid">
            {benefits.map(([title, body]) => (
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
          <h2>Open roles.</h2>
          <div className="roles-block">
            <CareersClient roles={roles} departments={departments} />
          </div>
        </div>
      </section>
    </>
  );
}
