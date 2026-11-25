import PageHero from '@/app/components/PageHero';
import { changelog } from '@/lib/content';
import ChangelogClient from './ChangelogClient';

export const metadata = {
  title: 'Changelog',
  description: 'New features, improvements and fixes. We release every two weeks.',
};

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title={['Everything we', 'shipped, in order.']}
        description="New features, improvements and fixes. We release every two weeks."
      />
      <section className="section section-tight">
        <div className="container">
          <ChangelogClient releases={changelog} />
        </div>
      </section>
    </>
  );
}
