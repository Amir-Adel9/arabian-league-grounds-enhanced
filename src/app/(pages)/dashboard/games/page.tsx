import { Button } from '@/components/ui/button';
import { getCompletedEventsInSplit } from '@/data-access/data-access';
import { currentUser } from '@clerk/nextjs';
import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Schedule from '../../schedule/_components/Schedule';
import { getGameDays } from '@/utils/functions/getGameDays';
import DashboardSchedule from '../_componets/DashboardSchedule';

export default async function DashboardPage() {
  const loggedInUser = await currentUser();

  if (loggedInUser?.username !== 'legit' && loggedInUser?.username !== 'joroka')
    redirect('/');

  const allGames = await getCompletedEventsInSplit();
  const gameDays = getGameDays(allGames);
  return (
    <main className='w-full min-h-screen flex justify-center items-center text-primary flex-wrap font-geist'>
      <DashboardSchedule gameDays={gameDays} />
    </main>
  );
}
