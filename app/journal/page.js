import PageHero from '@/app/components/PageHero';
import { journalPosts } from '@/lib/content';
import JournalClient from './JournalClient';

export const metadata = {
  title: 'Journal',
  description:
    'Engineering deep dives, product releases and playbooks from our platform and studio teams.',
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={['Notes from the', 'people building Bryn.']}
        description="Engineering deep dives, product releases and playbooks from our platform and studio teams."
      />
      <section className="section section-tight">
        <div className="container">
          <JournalClient posts={journalPosts} />
        </div>
      </section>
    </>
  );
}
