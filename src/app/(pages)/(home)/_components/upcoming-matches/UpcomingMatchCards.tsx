import { currentUser } from '@clerk/nextjs';
import UpcomingMatchCard from './UpcomingMatchCard';

import { Event } from '@/utils/types/types';
import { getUpcomingEvents } from '@/app/(server)/actions/schedule';

export const runtime = 'edge';

const UpcomingMatchesCards = async () => {
  const upcomingEvents = await getUpcomingEvents();

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
