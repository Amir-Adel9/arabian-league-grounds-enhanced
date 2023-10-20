import { Event } from '@/utils/constants/types';
import { Suspense } from 'react';
import UpcomingMatchCard from './UpcomingMatchCard';

export const runtime = `${
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT' ? 'nodejs' : 'edge'
}`;

const UpcomingMatchesData = async () => {
  const upcomingEvents = (await fetch(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? 'https://arabian-league-grounds-enhanced.vercel.app/'
        : 'http://localhost:3002/'
    }api/schedule/upcoming-events`,
    {
      cache: 'no-store',
    }
  ).then((res) => res.json())) as Event[];

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 w-full p-10 bg-secondary rounded-xl'>
      {upcomingEvents.map((event: Event) => {
        return (
          <Suspense fallback={<div>Loading...</div>} key={event.match.id}>
            <UpcomingMatchCard event={event} />
          </Suspense>
        );
      })}
    </div>
  );
};

export default UpcomingMatchesData;
