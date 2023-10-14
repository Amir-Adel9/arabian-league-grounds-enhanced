import { Event } from '@/utils/constants/types';

import { getGameDays } from '@/utils/functions/getGameDays';
import Schedule from '@/components/schedule/Schedule';

async function SchedulePage() {
  const fullSchedule = (await fetch(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? 'https://arabian-league-grounds-enhanced.vercel.app/'
        : 'http://localhost:3002/'
    }api/schedule/full-schedule`
  ).then((res) => res.json())) as Event[];

  const gameDays = getGameDays(fullSchedule);

  return (
    <main className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative flex justify-start items-center bg-primary'>
      <Schedule gameDays={gameDays} />
    </main>
  );
}

export default SchedulePage;
