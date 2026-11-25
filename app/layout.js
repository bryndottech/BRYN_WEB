import { body, display, mono, serif } from './fonts';
import './globals.css';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import CommandMenu from './components/CommandMenu';
import CookieBanner from './components/CookieBanner';
import ChatWidget from './components/ChatWidget';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';
import { site } from '@/lib/content';

export const metadata = {
  title: {
    default: site.title,
    template: '%s — BRYN',
  },
  description: site.description,
  openGraph: {
    title: site.ogTitle,
    description: site.ogDescription,
    type: 'website',
    siteName: 'BRYN',
  },
  icons: {
    icon: '/brand/bryn-mark.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: site.themeColor,
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('bryn-th');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BRYN',
  description: 'Enterprise platform and studio',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <CommandMenu />
        <CookieBanner />
        <ChatWidget />
        <BackToTop />
        <Toast />
      </body>
    </html>
  );
}
