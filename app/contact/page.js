import PageHero from '@/app/components/PageHero';
import SocialIcon from '@/app/components/SocialIcon';
import { contactChannels, contactSocialLinks } from '@/lib/content';

export const metadata = {
  title: 'Contact BRYN',
  description:
    'Share a little about your business, project or technical challenge. Contact BRYN directly to discuss the next step.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact BRYN"
        title={['Tell us what', 'you want to build.']}
        description="Share a little about your business, project or technical challenge. Contact BRYN directly to discuss the next step."
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-list ct">
            {contactChannels.map(([label, email, detail]) => (
              <div key={label}>
                <b>{label}</b>
                <a href={`mailto:${email}`}>{email}</a>
                <br />
                <span>{detail}</span>
              </div>
            ))}
            <div>
              <b>Social channels</b>
              <div className="contact-social-icons" aria-label="BRYN social media links">
                {contactSocialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon label={social.label} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="agency-contact-note">
            <span className="tag">A useful first message</span>
            <h2>What are you trying to achieve?</h2>
            <p>
              Include the type of solution you need, the main features or services you have in mind,
              and any relevant timeline. This helps the team understand your enquiry.
            </p>
            <a
              className="btn btn-primary"
              href="mailto:bryndottech@gmail.com?subject=Project%20Enquiry"
            >
              Email BRYN <i aria-hidden="true">→</i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
