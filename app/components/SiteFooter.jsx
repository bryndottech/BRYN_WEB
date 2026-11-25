import Link from 'next/link';
import { footerColumns, socialLinks } from '@/lib/content';
import NewsletterForm from './NewsletterForm';

function SocialIcon({ label }) {
  if (label === 'LinkedIn') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 11v5M8 8v.01M12 16v-5M12 13c0-3 5-3 5 0v3" />
      </svg>
    );
  }
  if (label === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5v.01" />
      </svg>
    );
  }
  if (label === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 21v-8h3l.5-3H14V8c0-1 .5-2 2-2h1.5V3.5c-1-.1-2-.2-3-.2-2.5 0-4 1.5-4 4V10H8v3h3v8z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <h2 className="footer-statement">Let’s build what comes next.</h2>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/demo">
              Book a demo <span aria-hidden="true">→</span>
            </Link>
            <Link className="btn" href="/careers">
              Join the team
            </Link>
          </div>
        </div>

        <div className="footer-grid">
          {footerColumns.map((column) => (
            <div className="footer-col" key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) =>
                link.href === '#cookie-settings' ? (
                  <button
                    key={link.label}
                    type="button"
                    className="footer-link-button"
                    data-cookie-settings
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}

          <div className="footer-col newsletter">
            <h3>Product updates</h3>
            <p>One email a month. No filler.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="footer-bottom">
          <div className="socials">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>
          <span className="mono">© 2026 Bryn, Inc. San Francisco, CA</span>
          <span className="mono status-ok">All systems operational</span>
        </div>
      </div>
      <div className="footer-watermark" aria-hidden="true">
        BRYN
      </div>
    </footer>
  );
}
