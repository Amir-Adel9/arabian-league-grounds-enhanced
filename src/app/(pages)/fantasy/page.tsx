import { getTeamRostersByRole } from '@/utils/functions/getTeamRosters';
import FantasyTest from './_components/FantasyTest';

import {
  getFantasyRoster,
  getFantasyTeam,
} from '@/entities/fantasy/fantasy.db';
import { currentUser } from '@clerk/nextjs';

export default async function FantasyPage() {
  const teamRostersByRole = await getTeamRostersByRole();
  const user = await currentUser();

  if (!user) return <>Please Log in to fantasy</>;

  const fantasyTeamId = (await getFantasyTeam({ userId: user.id }))?.id;

  if (!fantasyTeamId) {
    return (
      <main className='w-full min-h-screen relative flex flex-col justify-start items-center text-primary'>
        <h1 className='font-rubik text-4xl mt-32'>LEC Fantasy Demo</h1>
        <h2 className='font-geist text-2xl mt-5'>2024 Winter Split</h2>
        <div className='w-full'>
          <FantasyTest roostersByRole={teamRostersByRole} />
        </div>
      </main>
    );
  }

  const fantasyRoster = await getFantasyRoster({ fantasyTeamId });

  return (
    <main className='w-full min-h-screen relative flex flex-col justify-start items-center text-primary'>
      <h1 className='font-rubik text-4xl mt-32'>LEC Fantasy Demo</h1>
      <h2 className='font-geist text-2xl mt-5'>2024 Winter Split</h2>
      <div className='w-full'>
        <FantasyTest
          roostersByRole={teamRostersByRole}
          currentTeam={fantasyRoster}
        />
      </div>
    </main>
  );
}
