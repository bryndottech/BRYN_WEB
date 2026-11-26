'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { faqs, processCards, services, workCards } from '@/lib/content';
import ServicesAccordion from './home/ServicesAccordion';
import FaqSearch from './home/FaqSearch';

export default function HomePage() {
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('.hero');
      if (!hero) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      hero.style.backgroundPositionY = reduced ? '0px' : `-${Math.round(window.scrollY * 0.18)}px`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="hero" id="top">
        <div className="container">
          <a className="tag" href="#services">
            <b />
            BRYN Technologies · Digital Services
          </a>
          <h1 className="in">
            <span className="m">
              <span>Digital solutions</span>
            </span>
            <span className="m">
              <span>for ambitious</span>
            </span>
            <span className="m">
              <span>businesses.</span>
            </span>
          </h1>
          <p className="hero-copy" data-r>
            From websites and mobile apps to digital marketing, creative design, AI and automation,
            BRYN helps businesses plan, build and improve their digital presence.
          </p>
          <div className="hero-actions cta" data-r>
            <Link className="btn btn-primary mag" href="/contact">
              Start a project <i aria-hidden="true">→</i>
            </Link>
            <Link className="btn mag" href="/#services">
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="services">
        <div className="container">
          <div className="section-head hd">
            <h2 data-r>Digital services, clearly organized.</h2>
            <p data-r>
              Explore BRYN’s five core service areas and the capabilities available within each one.
            </p>
          </div>
          <ServicesAccordion services={services} />
        </div>
      </section>

      <section className="section agency-work" id="customers">
        <div className="container">
          <div className="section-head hd">
            <span className="tag">What we can help you build</span>
            <h2 data-r>Digital experiences designed around your business.</h2>
            <p data-r>
              From the first idea to launch and ongoing improvement, BRYN brings development,
              design and digital growth capabilities together.
            </p>
          </div>
          <div className="agency-grid">
            {workCards.map(([label, title, copy, link, index]) => (
              <article className="agency-card cd" key={title}>
                <span className="mono">{label}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Link
                  className="agency-card-link"
                  href="/#services"
                  data-svc={String(index)}
                >
                  {link} <i aria-hidden="true">→</i>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark agency-approach" id="approach">
        <div className="container">
          <div className="section-head hd">
            <span className="tag">How we work</span>
            <h2 data-r>A clear process from idea to delivery.</h2>
            <p data-r>
              We align the work with your goals, keep decisions visible and focus on a useful
              outcome.
            </p>
          </div>
          <div className="agency-grid process-grid">
            {processCards.map(([label, title, copy]) => (
              <article className="agency-card cd" key={title}>
                <span className="mono">{label}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <FaqSearch faqs={faqs} />
        </div>
      </section>

      <section className="section section-dark cta-band cb" id="cta">
        <div className="container">
          <h2>
            <span className="m">
              <span>Build your next digital solution with BRYN.</span>
            </span>
          </h2>
          <p>Tell us about your project and the outcome you want to achieve.</p>
          <div className="hero-actions cta">
            <Link className="btn btn-primary mag" href="/contact">
              Start a project <i aria-hidden="true">→</i>
            </Link>
            <Link className="btn mag" href="/contact">
              Contact BRYN
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
