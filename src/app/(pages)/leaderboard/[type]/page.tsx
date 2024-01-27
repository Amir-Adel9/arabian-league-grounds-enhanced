import Leaderboard from '../_components/Leaderboard';
import { db } from '@/db';
import { user } from '@/db/schema/schema';
import { User } from '@/db/types';
import { desc } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export default async function LeaderboardPage({
  params,
}: {
  params: { type: 'predictions' | 'fantasy' };
}) {
  if (params.type !== 'predictions' && params.type !== 'fantasy') {
    redirect('/leaderboard/predictions');
  }
  console.log(params.type);
  const usersByPoints = await db
    .select()
    .from(user)
    .orderBy(
      desc(
        params.type === 'predictions'
          ? user.predictionPoints
          : user.fantasyPoints
      )
    );

  return (
    <main className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative flex justify-start items-start'>
      <Leaderboard users={usersByPoints as User[]} sortBy={params.type} />
    </main>
  );
}
