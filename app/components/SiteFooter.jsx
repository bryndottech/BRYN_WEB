import Link from 'next/link';
import SocialIcon from './SocialIcon';
import { footerColumns, socialLinks } from '@/lib/content';

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="foot">
      <div className="container">
        <div className="footer-top">
          <h2 className="footer-statement">Let’s build what comes next.</h2>
          <div className="hero-actions">
            <Link className="btn btn-primary mag" href="/contact">
              Start a project <i aria-hidden="true">→</i>
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
                  <a key={link.label} href={link.href} data-svc={link['data-svc']}>
                    {link.label}
                  </a>
                ),
              )}
            </div>
          ))}
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
          <span className="mono">© 2026 BRYN Technologies</span>
        </div>
      </div>
      <div className="footer-watermark" aria-hidden="true">
        BRYN
      </div>
    </footer>
  );
}
