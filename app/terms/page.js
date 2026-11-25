import LegalPage from '@/app/components/LegalPage';
import { termsSections } from '@/lib/content';

export const metadata = {
  title: 'Terms of service',
  description: 'Sample text for this preview. Replace it with counsel-reviewed language before launch.',
};

export default function TermsPage() {
  return <LegalPage title="Terms of service" sections={termsSections} idPrefix="terms" />;
}
