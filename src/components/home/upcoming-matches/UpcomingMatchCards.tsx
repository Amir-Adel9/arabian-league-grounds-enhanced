import UpcomingMatchCard from './UpcomingMatchCard';

import { Event } from '@/utils/constants/types';

export const runtime =
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT' ? 'edge' : 'nodejs';

const UpcomingMatchesCards = async () => {
  const upcomingEvents = (await fetch(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? 'https://arabian-league-grounds-enhanced.vercel.app/'
        : 'http://localhost:3002/'
    }api/schedule/upcoming-events`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json())) as Event[];

  return (
    <>
      {upcomingEvents.map((event: Event) => {
        return <UpcomingMatchCard event={event} key={event.match.id} />;
      })}
    </>
  );
};

export default UpcomingMatchesCards;
