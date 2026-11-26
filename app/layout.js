import { body, display, mono, serif } from './fonts';
import './globals.css';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import CommandMenu from './components/CommandMenu';
import CookieBanner from './components/CookieBanner';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';
import InteractionEffects from './components/InteractionEffects';
import SectionRail from './components/SectionRail';
import { site } from '@/lib/content';
import { withBasePath } from '@/lib/paths';

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
    icon: withBasePath('/brand/bryn-mark.png'),
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
    document.documentElement.dataset.js = '1';
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.dataset.js = '1';
  }
})();
`;

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BRYN Technologies',
  description:
    'Digital solutions company providing web and software development, mobile app development, digital marketing, UI/UX and creative design, and AI, automation and IT solutions.',
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
        <div id="route-curtain" aria-hidden="true">
          <span
            className="curtain-mark"
            style={{
              '--curtain-mark': `url('${withBasePath('/brand/bryn-mark.png')}')`,
            }}
          />
        </div>
        <InteractionEffects />
        <SiteHeader />
        <SectionRail />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <CommandMenu />
        <CookieBanner />
        <BackToTop />
        <Toast />
      </body>
    </html>
  );
}
