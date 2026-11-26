'use client';

import Link from 'next/link';
import { useState } from 'react';
import Accordion from '@/app/components/Accordion';
import { comparison, plans, pricingFaqs } from '@/lib/content';

const number = (value) => Math.round(value).toLocaleString('en-US');

export default function PricingClient() {
  const [annual, setAnnual] = useState(false);
  const [teamSize, setTeamSize] = useState(40);
  const [hours, setHours] = useState(6);

  const monthlyCost = teamSize * 79 * (annual ? 0.8 : 1);
  const hoursReclaimed = teamSize * hours * 0.45;
  const valueReclaimed = hoursReclaimed * 65;
  const returnOnSpend = monthlyCost > 0 ? valueReclaimed / monthlyCost : 0;

  return (
    <>
      <div className="billing-toggle">
        <span>Monthly</span>
        <button
          type="button"
          className="switch"
          role="switch"
          aria-checked={annual}
          aria-label="Annual billing"
          onClick={() => setAnnual((value) => !value)}
        />
        <span>
          Annual <small className="mono billing-save">Save 20%</small>
        </span>
      </div>

      <div className="plan-grid">
        {plans.map((plan) => {
          const price = plan.price ? Math.round(plan.price * (annual ? 0.8 : 1)) : 0;
          return (
            <article
              className={`plan-card pc${plan.featured ? ' is-featured' : ''}`}
              key={plan.name}
            >
              {plan.featured ? <span className="tag">Most popular</span> : null}
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <div className="plan-price">
                {price ? `$${price}` : 'Custom'}
                <small>{price ? 'per seat / month' : ''}</small>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link
                className={`btn${plan.featured ? ' btn-primary' : ''}`}
                href="/demo?service=Platform"
              >
                {plan.price ? `Start with ${plan.name}` : 'Talk to sales'}{' '}
                <i aria-hidden="true">→</i>
              </Link>
            </article>
          );
        })}
      </div>

      <div className="calculator">
        <div>
          <h3>Estimate your return</h3>
          <label htmlFor="team-size">
            Team size <b>{teamSize} people</b>
          </label>
          <input
            id="team-size"
            type="range"
            min="5"
            max="500"
            value={teamSize}
            onChange={(event) => setTeamSize(Number(event.target.value))}
          />
          <label htmlFor="lost-hours">
            Hours per person lost to manual ops, per month <b>{hours} hours</b>
          </label>
          <input
            id="lost-hours"
            type="range"
            min="1"
            max="20"
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
          />
          <p className="field-hint">
            Illustrative estimate on the Business plan. Assumes 45% of manual hours are reclaimed
            at $65 an hour.
          </p>
        </div>
        <div className="calc-result" aria-live="polite">
          <div>
            <span>Monthly cost</span>
            <b>${number(monthlyCost)}</b>
          </div>
          <div>
            <span>Hours reclaimed per month</span>
            <b>{number(hoursReclaimed)}</b>
          </div>
          <div>
            <span>Value reclaimed per month</span>
            <b>${number(valueReclaimed)}</b>
          </div>
          <div>
            <span>Return on spend</span>
            <b>{returnOnSpend.toFixed(1)}x</b>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Compare plans</th>
              <th>Team</th>
              <th>Business</th>
              <th>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => (
                  <td className={cell === '✓' ? 'cell-accent' : undefined} key={`${row[0]}-${index}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pricing-faq">
        <h2>Pricing questions.</h2>
        <div className="pricing-accordion">
          <Accordion
            items={pricingFaqs.map((faq) => ({ title: faq.question, body: faq.answer }))}
          />
        </div>
      </div>
    </>
  );
}
