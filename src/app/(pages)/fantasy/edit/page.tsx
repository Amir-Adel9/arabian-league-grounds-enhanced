import { getTeamRostersByRole } from '@/utils/functions/getTeamRosters';
import Fantasy from '../_components/Fantasy';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import FantasyWelcome from '../_components/FantasyWelcome';
import {
  getFantasyRoster,
  getFantasyTeamId,
} from '@/entities/fantasy/fantasy.db';
import { db } from '@/db';
import { user } from '@/db/schema/user';
import { eq } from 'drizzle-orm';
import { User } from '@/db/types';
import CreateFantasyTeam from '../_components/CreateFantasyTeam';
import { redirect } from 'next/navigation';

export default async function FantasyPage() {
  const teamRostersByRole = await getTeamRostersByRole();
  const loggedInUser = await currentUser();

  if (!loggedInUser)
    return (
      <main className='w-full min-h-screen relative overflow-x-hidden justify-start items-center text-primary lg:ml-20 lg:w-[calc(100%-5rem)] h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)] flex flex-col gap-5 font-geist'>
        <Image
          src='/images/bg.png'
          alt=''
          draggable={false}
          layout='fill'
          style={{ top: '100px' }}
          className='absolute animate-bounce-y w-full max-h-[500px] md:max-h-[800px] opacity-75 brightness-105 -z-10'
        />
        <FantasyWelcome rostersByRole={teamRostersByRole} />
      </main>
    );

  const _user = await db
    .select()
    .from(user)
    .where(eq(user.clerkId, loggedInUser?.id))
    .then((res) => res[0]);

  const fantasyTeamId = await getFantasyTeamId({ userId: loggedInUser?.id });

  if (!fantasyTeamId) redirect('/fantasy');

  const fantasyRoster = await getFantasyRoster({ fantasyTeamId });

  return (
    <main className='w-full min-h-screen relative overflow-x-hidden justify-start items-center text-primary mb-20 lg:m-0 lg:ml-20 lg:w-[calc(100%-5rem)] h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)] flex flex-col gap-5 font-geist'>
      <Image
        src='/images/bg.png'
        alt=''
        draggable={false}
        layout='fill'
        style={{ top: '100px' }}
        className='absolute animate-bounce-y w-full max-h-[500px] md:max-h-[800px] opacity-75 brightness-105 -z-10'
      />

      <div className='relative w-full h-full overflow-x-hidden p-5 md:p-8 xl:p-16'>
        <CreateFantasyTeam
          isShowing={true}
          rostersByRole={teamRostersByRole}
          currentFantasyTeam={fantasyRoster}
          user={_user as User}
        />
      </div>
    </main>
  );
}
