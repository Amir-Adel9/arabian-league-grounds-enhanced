import { Event } from '@/utils/types/types';

import { getGameDays } from '@/utils/functions/getGameDays';
import Schedule from '@/app/(pages)/schedule/_components/Schedule';

export const runtime =
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT' ? 'edge' : 'nodejs';

export default async function SchedulePage() {
  const fullSchedule = (await fetch(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_DEV_URL
    }/api/schedule/full-schedule`,
    {
      next: { revalidate: 0 },
    }
  ).then((res) => res.json())) as Event[];

  const gameDays = getGameDays(fullSchedule);

  return (
    <main className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative flex justify-start items-center '>
      <Schedule gameDays={gameDays} />
    </main>
  );
}
