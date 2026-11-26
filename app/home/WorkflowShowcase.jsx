'use client';

import { useEffect, useRef, useState } from 'react';
import { workflowSteps } from '@/lib/content';

const heights = ['40%', '62%', '48%', '78%', '56%', '88%', '70%', '94%'];

function WorkflowGraph() {
  return (
    <svg className="workflow-graph" viewBox="0 0 400 260" aria-label="Release pipeline graph">
      <line x1="80" x2="170" y1="130" y2="70" />
      <line x1="80" x2="170" y1="130" y2="190" />
      <line className="is-accent" x1="170" x2="300" y1="70" y2="130" />
      <line x1="170" x2="300" y1="190" y2="130" />
      <rect x="20" y="112" width="70" height="36" rx="8" />
      <rect x="130" y="52" width="80" height="36" rx="8" />
      <rect x="130" y="172" width="80" height="36" rx="8" />
      <rect className="is-accent" x="290" y="112" width="90" height="36" rx="8" />
      <text x="34" y="135">Merge</text>
      <text x="146" y="75">Test</text>
      <text x="142" y="195">Review</text>
      <text x="306" y="135">Deploy</text>
    </svg>
  );
}

function ObserveBars() {
  return (
    <div className="observe-bars" aria-label="Sample observability chart">
      {heights.map((height, index) => (
        <i style={{ '--h': height }} key={`${height}-${index}`} />
      ))}
    </div>
  );
}

function PolicyList() {
  return (
    <div className="policy-list">
      <label>
        Require two approvals
        <input type="checkbox" defaultChecked />
      </label>
      <label>
        Block unsigned builds
        <input type="checkbox" defaultChecked />
      </label>
      <label>
        Restrict deploys to business hours
        <input type="checkbox" />
      </label>
      <label>
        Mask PII in logs
        <input type="checkbox" defaultChecked />
      </label>
    </div>
  );
}

const panels = [
  { eyebrow: 'workflow / release-pipeline', content: <WorkflowGraph /> },
  { eyebrow: 'observability / last 8 hours', content: <ObserveBars /> },
  { eyebrow: 'policy / production', content: <PolicyList /> },
];

export default function WorkflowShowcase() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      if (window.innerWidth <= 900 || reduced.matches) return;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      setActive(Math.min(2, Math.floor(progress * 3)));
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const selectStep = (index) => {
    const section = sectionRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (section && window.innerWidth > 900 && !reduced) {
      const travel = section.offsetHeight - window.innerHeight;
      const target = section.offsetTop + travel * ((index + 0.5) / 3);
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
    setActive(index);
  };

  return (
    <section className="workflow-section" id="approach" ref={sectionRef}>
      <div className="workflow-pin">
        <div className="container">
          <div className="workflow-layout">
          <div>
            <h2>Three workflows. One source of truth.</h2>
            <div className="workflow-steps" role="tablist" aria-label="Workflow views">
              {workflowSteps.map((step, index) => (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  id={`workflow-tab-${index}`}
                  aria-selected={active === index}
                  aria-controls={`workflow-panel-${index}`}
                  className={`workflow-step${active === index ? ' is-active' : ''}`}
                  onClick={() => selectStep(index)}
                >
                  <span className="workflow-step-title">{step.title}</span>
                  <span className="workflow-step-body">{step.body}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="workflow-sticky">
            {panels.map((panel, index) => (
              <div
                key={panel.eyebrow}
                id={`workflow-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`workflow-tab-${index}`}
                hidden={active !== index}
                className="workflow-panel"
              >
                <div className="workflow-panel-inner">
                  <span className="mono">{panel.eyebrow}</span>
                  {panel.content}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
