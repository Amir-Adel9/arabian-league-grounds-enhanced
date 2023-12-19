import Leaderboard from './_components/Leaderboard';
import { db } from '@/db';
import { user } from '@/db/schema';
import { desc } from 'drizzle-orm';

export default async function LeaderboardPage() {
  const usersByPoints = await db
    .select()
    .from(user)
    .orderBy(desc(user.predictionPoints));

  return (
    <main className='w-full min-h-screen relative flex flex-col justify-center items-center'>
      <Leaderboard users={usersByPoints} />
    </main>
  );
}
