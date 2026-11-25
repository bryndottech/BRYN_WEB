import PageHero from '@/app/components/PageHero';
import { contactChannels, contactTopics } from '@/lib/content';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact',
  description:
    'Sales, support, press and security each have a dedicated inbox and a one-business-day response.',
};

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const requested = params?.topic;
  const initialTopic = contactTopics.includes(requested) ? requested : 'Sales';

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={['Talk to a human,', 'not a form.']}
        description="Sales, support, press and security each have a dedicated inbox and a one-business-day response."
      />

      <section className="section section-tight">
        <div className="container contact-grid">
          <div className="contact-list">
            {contactChannels.map(([label, email, detail]) => (
              <div key={label}>
                <b>{label}</b>
                <a href={`mailto:${email}`}>{email}</a>
                <span>{detail}</span>
              </div>
            ))}
            <div>
              <b>Headquarters</b>
              <span>San Francisco, California, USA</span>
            </div>
          </div>
          <ContactForm topics={contactTopics} initialTopic={initialTopic} />
        </div>
      </section>
    </>
  );
}
