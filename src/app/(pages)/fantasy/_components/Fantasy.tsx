import Image from 'next/image';
import FantasyWelcome from './FantasyWelcome';
import { getTeamRostersByRole } from '@/utils/functions/getTeamRosters';
import { currentUser } from '@clerk/nextjs';
import {
  getFantasyRoster,
  getFantasyTeamId,
} from '@/entities/fantasy/fantasy.db';
import { User } from '@/db/types';

const Fantasy = async ({ user }: { user: User }) => {
  const teamRostersByRole = await getTeamRostersByRole();
  const loggedInUser = await currentUser();

  const fantasyTeamId = await getFantasyTeamId({ userId: user.clerkId });

  const fantasyRoster = await getFantasyRoster({ fantasyTeamId });
  return (
    <div className=' w-full flex justify-center items-center h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)]  flex-col gap-5 font-geist overflow-x-hidden'>
      Fantasy bgd
      {/* {(!loggedInUser || !fantasyTeamId || true) && <FantasyWelcome />} */}
      {/* <div className='flex gap-6 items-center border-b border-border'>
        <div className='bg-secondary p-2 translate-y-4'>
          <Image
            src={user.imageUrl}
            alt='user avatar'
            width={140}
            height={140}
            className='rounded-full'
          />
        </div>

        <h1 className='text-4xl capitalize'>{user?.username}</h1>
      </div> */}
    </div>
  );
};

export default Fantasy;
