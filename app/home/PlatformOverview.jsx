import { auditEvents, platformCards } from '@/lib/content';
import PermissionMatrix from './PermissionMatrix';

const chartPath =
  'M0 64 L15 58 L30 61 L45 52 L60 55 L75 48 L90 50 L105 44 L120 47 L135 40 L150 43 L165 36 L180 39 L195 33 L210 35 L225 30 L240 33 L255 27 L270 30 L285 25 L300 27';

function PlatformVisual({ kind }) {
  if (kind === 'latency') {
    return (
      <div className="card-visual">
        <div className="latency-value">
          11.8 <small>ms p95</small>
        </div>
        <svg className="mini-chart" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
          <path className="area" d={`${chartPath} L300 100 L0 100 Z`} />
          <path className="line" d={chartPath} />
        </svg>
      </div>
    );
  }

  if (kind === 'access') {
    return (
      <div className="card-visual">
        <PermissionMatrix />
      </div>
    );
  }

  if (kind === 'graph') {
    return (
      <div className="card-visual">
        <svg className="workflow-graph" viewBox="0 0 300 110" aria-hidden="true">
          <line x1="40" x2="120" y1="55" y2="30" />
          <line x1="40" x2="120" y1="55" y2="82" />
          <line x1="120" x2="200" y1="30" y2="55" />
          <line x1="120" x2="200" y1="82" y2="55" />
          <line x1="200" x2="262" y1="55" y2="55" />
          <circle className="graph-node is-accent" cx="40" cy="55" r="9" />
          <circle className="graph-node" cx="120" cy="30" r="9" />
          <circle className="graph-node" cx="120" cy="82" r="9" />
          <circle className="graph-node" cx="200" cy="55" r="9" />
          <circle className="graph-node" cx="262" cy="55" r="9" />
        </svg>
      </div>
    );
  }

  if (kind === 'regions') {
    return (
      <div className="card-visual region-list">
        <div>
          us-east <b>9ms</b>
        </div>
        <div>
          eu-west <b>12ms</b>
        </div>
        <div>
          ap-south <b>14ms</b>
        </div>
      </div>
    );
  }

  return (
    <div className="card-visual">
      <div className="audit-list">
        {auditEvents.map((event) => (
          <div key={`${event.time}-${event.event}`}>
            {event.time} <em>{event.event}</em> {event.who}
          </div>
        ))}
      </div>
      <p className="audit-note">Sample event stream</p>
    </div>
  );
}

export default function PlatformOverview() {
  return (
    <section className="section section-dark" id="platform">
      <div className="container">
        <div className="section-head">
          <h2>One platform. Every operational layer.</h2>
          <p>
            Each capability is built to be inspected, audited and scaled. Hover, click and see
            how it behaves.
          </p>
        </div>
        <div className="platform-grid">
          {platformCards.map((card) => (
            <article
              className={`platform-card${card.kind === 'latency' ? ' is-wide' : ''}`}
              key={card.title}
            >
              <span className="mono">{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <PlatformVisual kind={card.kind} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
