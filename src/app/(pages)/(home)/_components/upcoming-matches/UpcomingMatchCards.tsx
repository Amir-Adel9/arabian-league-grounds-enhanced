import { currentUser } from '@clerk/nextjs';
import UpcomingMatchCard from './UpcomingMatchCard';

import { Event } from '@/utils/types/types';

export const runtime =
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT' ? 'edge' : 'nodejs';

const UpcomingMatchesCards = async () => {
  const upcomingEvents = (await fetch(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_DEV_URL
    }/api/schedule/upcoming-events`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json())) as Event[];

  const user = await currentUser();
  return (
    <>
      {upcomingEvents.map((event: Event) => {
        return (
          <UpcomingMatchCard
            event={event}
            key={event.match.id}
            user={{
              id: user?.id,
              name: user?.username,
            }}
          />
        );
      })}
    </>
  );
};

export default UpcomingMatchesCards;
