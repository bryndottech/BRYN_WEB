import PageHero from '@/app/components/PageHero';
import { demoSteps, services } from '@/lib/content';
import DemoClient from './DemoClient';

export const metadata = {
  title: 'Book a demo',
  description:
    'Thirty minutes with a solutions engineer. Bring a real process, platform or project and leave with a plan.',
};

const serviceNames = ['Platform', ...services.map((service) => service.title)];

function upcomingWeekdays(count) {
  const days = [];
  const date = new Date();
  while (days.length < count) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      days.push(
        date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      );
    }
  }
  return days;
}

export default async function DemoPage({ searchParams }) {
  const params = await searchParams;
  const requested = params?.service;
  const initialService = serviceNames.includes(requested) ? requested : 'Platform';

  return (
    <PageHero
      eyebrow="Book a demo"
      title={['See Bryn on', 'your workflows.']}
      description="Thirty minutes with a solutions engineer. Bring a real process, platform or project and leave with a plan."
      aside={
        <DemoClient
          services={serviceNames}
          days={upcomingWeekdays(5)}
          initialService={initialService}
        />
      }
    >
      <ul className="demo-list">
        {demoSteps.map(([title, body]) => (
          <li key={title}>
            <b>{title}</b>
            <span>{body}</span>
          </li>
        ))}
      </ul>
    </PageHero>
  );
}
