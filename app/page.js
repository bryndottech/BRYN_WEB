import Link from 'next/link';
import { caseStudy, customerSectors, faqs, integrations, services } from '@/lib/content';
import ProductWindow from './components/ProductWindow';
import TerminalWindow from './components/TerminalWindow';
import PlatformOverview from './home/PlatformOverview';
import WorkflowShowcase from './home/WorkflowShowcase';
import ServicesAccordion from './home/ServicesAccordion';
import FaqSearch from './home/FaqSearch';

const trustStats = [
  {
    value: '99.99%',
    label: 'Uptime, trailing 12 months',
    icon: (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M3 20l5-6 4 4 7-9 6 5" />
        <path d="M3 25h22" />
      </svg>
    ),
  },
  {
    value: 'SOC 2',
    label: 'Type II, audited annually',
    icon: (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M14 3l9 3v7c0 6-4 10-9 12-5-2-9-6-9-12V6z" />
        <path d="M10 14l3 3 5-6" />
      </svg>
    ),
  },
  {
    value: '<12ms',
    label: 'Global p95 latency',
    icon: (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <circle cx="14" cy="14" r="10" />
        <path d="M14 8v6l4 3" />
      </svg>
    ),
  },
  {
    value: 'ISO 27001',
    label: 'Certified information security',
    icon: (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <rect x="5" y="12" width="18" height="12" rx="2" />
        <path d="M9 12V9a5 5 0 0110 0v3" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <Link className="tag" href="/changelog">
            <span className="tag-dot" aria-hidden="true" />
            Bryn Enterprise OS — Release 4.2 →
          </Link>
          <h1>
            <span className="line">We build digital</span>
            <span className="line">solutions that move</span>
            <span className="line">businesses forward.</span>
          </h1>
          <p className="hero-copy">
            Enterprise infrastructure, plus the web, mobile and growth teams to build on it. One
            partner from the first line of code to the millionth user.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/demo">
              Book a demo <span aria-hidden="true">→</span>
            </Link>
            <Link className="btn" href="/#platform">
              Explore the platform
            </Link>
          </div>
          <div className="hero-stage">
            <ProductWindow />
          </div>
        </div>
      </section>

      <div className="customer-band">
        <div className="container">
          <span className="mono">Trusted by teams running critical operations</span>
          <div className="customer-sectors">
            {customerSectors.map((sector) => (
              <span key={sector}>{sector}</span>
            ))}
          </div>
        </div>
      </div>

      <PlatformOverview />

      <WorkflowShowcase />

      <section className="section section-dark" id="services">
        <div className="container">
          <div className="section-head">
            <h2>Build with us, not just on us.</h2>
            <p>
              Bryn’s studio designs and ships the software around your infrastructure. Pick a
              discipline to see how we work.
            </p>
          </div>
          <ServicesAccordion services={services} />
        </div>
      </section>

      <section className="section" id="trust">
        <div className="container">
          <div className="section-head">
            <h2>Built for the audit, not just the demo.</h2>
            <p>
              Independent certification, measured uptime and latency you can verify on our public
              status page.
            </p>
          </div>
          <div className="trust-grid">
            {trustStats.map((stat) => (
              <div className="trust-item" key={stat.value}>
                {stat.icon}
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="audit-note">Illustrative metrics</p>
        </div>
      </section>

      <section className="section" id="dev">
        <div className="container dev-grid">
          <div>
            <h2>Ship from the command line.</h2>
            <p className="dev-copy">
              Deploy, roll back and audit from your terminal. Every command runs the same policies
              as the dashboard.
            </p>
            <div className="hero-actions is-start">
              <Link className="btn btn-dark" href="/docs">
                Read the docs <span aria-hidden="true">→</span>
              </Link>
              <Link className="btn" href="/changelog">
                See what shipped
              </Link>
            </div>
            <div className="integration-list" aria-label="Integrations">
              {integrations.map((integration) => (
                <span key={integration}>{integration}</span>
              ))}
            </div>
          </div>
          <TerminalWindow />
        </div>
      </section>

      <section className="section section-tight" id="customers">
        <div className="container case-study">
          <div>
            <span className="tag">Case study</span>
            <p className="audit-note case-label-note">Illustrative example</p>
          </div>
          <div>
            <blockquote>{caseStudy.quote}</blockquote>
            <div className="case-author">
              <span className="avatar" aria-hidden="true">
                {caseStudy.initials}
              </span>
              <div>
                <b>{caseStudy.name}</b>
                <span>{caseStudy.role}</span>
              </div>
            </div>
            <div className="case-metrics">
              {caseStudy.metrics.map(([value, label]) => (
                <div key={label}>
                  <b>{value}</b>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <Link className="text-link" href="/journal">
              Read case study <span aria-hidden="true">→</span>
            </Link>
            <p className="case-note">
              Sample scenario for layout preview. Replace with a verified customer story before
              launch.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <FaqSearch faqs={faqs} />
        </div>
      </section>

      <section className="section section-dark cta-band" id="cta">
        <div className="container">
          <h2>Run your business on one backbone.</h2>
          <p>See Bryn on your own workflows in a 30-minute walkthrough.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/demo">
              Book a demo <span aria-hidden="true">→</span>
            </Link>
            <Link className="btn" href="/demo">
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
