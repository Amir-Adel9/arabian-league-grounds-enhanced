import { Event } from '@/utils/types/types';

import { getGameDays } from '@/utils/functions/getGameDays';
import Schedule from '@/components/schedule/Schedule';
import { db } from '@/db';
import { prediction } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs';

export const runtime =
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT' ? 'edge' : 'nodejs';

export default async function SchedulePage() {
  const loggedInUser = await currentUser();

  const fullSchedule = (await fetch(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? 'https://arabian-league-grounds-enhanced.vercel.app/'
        : 'http://localhost:3002/'
    }api/schedule/full-schedule`,
    {
      next: { revalidate: 0 },
    }
  ).then((res) => res.json())) as Event[];

  const gameDays = getGameDays(fullSchedule);

  const userPredicitons = await db
    .select()
    .from(prediction)
    .where(eq(prediction.userClerkId, loggedInUser?.id as string));

  return (
    <main className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative flex justify-start items-center '>
      <Schedule
        gameDays={gameDays}
        predictions={userPredicitons}
        events={fullSchedule}
      />
    </main>
  );
}
