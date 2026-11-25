import PageHero from '@/app/components/PageHero';
import PricingClient from './PricingClient';

export const metadata = {
  title: 'Pricing',
  description:
    'Transparent plans for teams of every size. Flip billing and watch the numbers change.',
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={['Simple pricing,', 'built to scale.']}
        description="Transparent plans for teams of every size. Flip billing and watch the numbers change."
      />
      <section className="section section-tight">
        <div className="container">
          <PricingClient />
        </div>
      </section>
    </>
  );
}
