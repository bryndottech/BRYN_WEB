import PageHero from '@/app/components/PageHero';
import NewsletterForm from '@/app/components/NewsletterForm';
import { incidents, statusComponents } from '@/lib/content';

export const metadata = {
  title: 'System status',
  description: 'Real-time health for every Bryn component, with incident history.',
};

const SAMPLE_AS_OF = 'Nov 25, 2026';

function degradedDays(componentIndex) {
  const days = new Set();
  for (let day = 0; day < 90; day += 1) {
    if ((day * 37 + componentIndex * 53 + 11) % 97 === 0) days.add(day);
  }
  return days;
}

export default function StatusPage() {
  const components = statusComponents.map((name, index) => {
    const degraded = degradedDays(index);
    const uptime = (99.99 - degraded.size * 0.04).toFixed(2);
    return { name, degraded, uptime };
  });

  return (
    <>
      <PageHero
        eyebrow="System status"
        title={['Live uptime,', 'last 90 days.']}
        description="Real-time health for every Bryn component, with incident history."
      />

      <section className="section section-tight">
        <div className="container">
          <div className="status-banner">
            <span className="status-ok">All systems operational</span>
            <span className="tag">Sample data · as of {SAMPLE_AS_OF}</span>
          </div>
          <p className="sample-note">
            Illustrative 90-day sample. This page is not connected to live monitoring.
          </p>

          <div className="status-list">
            {components.map((component) => (
              <div className="status-row" key={component.name}>
                <div>
                  <span>{component.name}</span>
                  <span className="mono">{component.uptime}% uptime</span>
                </div>
                <div className="status-bars" aria-hidden="true">
                  {Array.from({ length: 90 }, (_, day) => (
                    <i
                      key={day}
                      className={component.degraded.has(day) ? 'is-degraded' : undefined}
                    />
                  ))}
                </div>
                <span className="sr-only">
                  {component.degraded.size} degraded {component.degraded.size === 1 ? 'day' : 'days'}{' '}
                  in the 90-day sample.
                </span>
              </div>
            ))}
          </div>

          <h2 className="section-subhead">Past incidents.</h2>
          <div className="incident-list">
            {incidents.map(([date, title, body]) => (
              <article className="incident" key={title}>
                <div className="incident-head">
                  <span>{title}</span>
                  <span className="mono">{date}</span>
                </div>
                <p>{body}</p>
              </article>
            ))}
          </div>

          <div className="status-subscribe">
            <h2 className="subscribe-title">Get incident alerts.</h2>
            <p className="sample-note">Preview form — no alerts are sent yet.</p>
            <NewsletterForm
              placeholder="Get incident alerts by email"
              buttonLabel="Subscribe"
              successMessage="Subscribed. We’ll email you when an incident opens."
              toastMessage="Subscribed. We’ll email you when an incident opens."
            />
          </div>
        </div>
      </section>
    </>
  );
}
