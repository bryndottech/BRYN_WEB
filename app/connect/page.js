import Image from 'next/image';
import { withBasePath } from '@/lib/paths';
import ConnectEmailLink from './ConnectEmailLink';

export const metadata = {
  title: { absolute: 'BRYN Technologies | Connect' },
  description:
    'Connect with BRYN Technologies — Engineering Digital Solutions.',
};

const channels = [
  {
    kind: 'email',
    id: 'email-link',
    label: 'Email',
    detail: 'bryndottech@gmail.com',
    ariaLabel: 'Email BRYN Technologies at bryndottech@gmail.com',
    href: 'mailto:bryndottech@gmail.com',
    email: true,
  },
  {
    kind: 'instagram',
    label: 'Instagram',
    detail: '@bryndottech',
    ariaLabel: 'Visit BRYN Technologies on Instagram',
    href: 'https://www.instagram.com/bryndottech',
  },
  {
    kind: 'facebook',
    label: 'Facebook',
    detail: 'BRYN Technologies',
    ariaLabel: 'Visit BRYN Technologies on Facebook',
    href: 'https://www.facebook.com/share/14tXEkD7DxV/',
  },
  {
    kind: 'x',
    label: 'X',
    detail: '@BRYNDOTTECH',
    ariaLabel: 'Visit BRYN Technologies on X',
    href: 'https://x.com/BRYNDOTTECH',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    detail: 'BRYN Technologies',
    ariaLabel: 'Visit BRYN Technologies on LinkedIn',
    href: 'https://www.linkedin.com/company/bryn-technologies/',
  },
  {
    kind: 'whatsapp',
    label: 'WhatsApp',
    detail: '+92 331 8984700',
    ariaLabel:
      'Chat with BRYN Technologies on WhatsApp at plus 92 331 8984700',
    href: 'https://wa.me/923318984700',
  },
];

function ExternalIcon() {
  return (
    <svg
      className="connect-external"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </svg>
  );
}

function ChannelIcon({ kind }) {
  switch (kind) {
    case 'email':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.4L1.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L7.2 3.9H5.4L17.8 20Z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.2 3.2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.3v1.6h.1a3.6 3.6 0 0 1 3.3-1.8c3.5 0 4.2 2.3 4.2 5.2v6.5h-3.4v-5.8c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1v5.9H9V9Z" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20l.9-4.7a8.5 8.5 0 1 1 16.6-3.6Z" />
          <path d="M8.5 8.5c.3-.6.6-.6 1-.6h.4c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .4-.2 1-.6 1.3-.4.4-1.1.6-1.8.5-1.1-.2-2.4-.9-3.6-2.1-1.1-1.1-1.9-2.4-2.1-3.5-.1-.8.1-1.5.3-1.9Z" />
        </svg>
      );
  }
}

function ChannelCard({ channel }) {
  const { kind, email, ariaLabel, label, detail, ...linkProps } = channel;
  const content = (
    <>
      <span className="connect-icon-box" aria-hidden="true">
        <ChannelIcon kind={kind} />
      </span>
      <span className="connect-link-copy">
        <span className="connect-link-name">{label}</span>
        <span className="connect-link-detail">{detail}</span>
      </span>
      <ExternalIcon />
    </>
  );

  if (email) {
    return (
      <ConnectEmailLink
        {...linkProps}
        className="connect-link-card"
        data-email-link="true"
        aria-label={ariaLabel}
      >
        {content}
      </ConnectEmailLink>
    );
  }

  return (
    <a
      {...linkProps}
      className="connect-link-card"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {content}
    </a>
  );
}

export default function ConnectPage() {
  return (
    <div className="connect-shell">
      <div className="connect-page">
        <header className="connect-identity">
          <div className="connect-brand-row">
            <span className="connect-logo-wrap">
              <Image
                className="connect-logo"
                src={withBasePath('/brand/bryn-mark.png')}
                alt=""
                width={38}
                height={38}
                priority
              />
            </span>
            <h1>BRYN</h1>
          </div>
          <p className="connect-descriptor">Engineering Digital Solutions</p>
          <div className="connect-accent-line" aria-hidden="true" />
        </header>

        <section className="connect-section" aria-labelledby="connect-heading">
          <h2 className="connect-section-label" id="connect-heading">
            Connect with us
          </h2>
          <nav
            className="connect-links"
            aria-label="BRYN Technologies social and contact links"
          >
            {channels.map((channel) => (
              <ChannelCard channel={channel} key={channel.kind} />
            ))}
          </nav>

          <a
            className="connect-website"
            href="https://bryndottech.github.io/BRYN_WEB/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="connect-website-mark" aria-hidden="true" />
            Visit Official Website
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        </section>
      </div>

      <div className="connect-page-footer">
        © 2026 BRYN Technologies. All rights reserved.
      </div>
    </div>
  );
}
