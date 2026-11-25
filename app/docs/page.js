import PageHero from '@/app/components/PageHero';
import { docsContent, docsSections } from '@/lib/content';
import DocsClient from './DocsClient';

export const metadata = {
  title: 'Documentation',
  description:
    'Guides, API reference and SDK samples. Everything you need to go from first request to production.',
};

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title={['Build on Bryn', 'in minutes.']}
        description="Guides, API reference and SDK samples. Everything you need to go from first request to production."
      />
      <section className="section section-tight">
        <div className="container">
          <DocsClient sections={docsSections} content={docsContent} />
        </div>
      </section>
    </>
  );
}
