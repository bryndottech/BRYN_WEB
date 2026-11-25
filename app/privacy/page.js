import LegalPage from '@/app/components/LegalPage';
import { privacySections } from '@/lib/content';

export const metadata = {
  title: 'Privacy policy',
  description: 'Sample text for this preview. Replace it with counsel-reviewed language before launch.',
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy policy" sections={privacySections} idPrefix="privacy" />;
}
