import WildCards from './_components/WildCards';
import {
  getTeamRostersByRole,
  getTeams,
} from '@/utils/functions/getTeamRosters';
import { getWildCards } from './actions/wildcardActions';
import { Wildcard } from '@/db/types';

export default async function WildCardsPage() {
  const allPlayers = await getTeamRostersByRole();
  const allTeams = await getTeams();
  const userWildcard = await getWildCards();
  return (
    <main className='w-full min-h-screen relative overflow-x-hidden justify-start items-center text-primary lg:ml-20 lg:w-[calc(100%-5rem)] h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)] flex flex-col gap-5 font-geist'>
      <WildCards
        allPlayers={allPlayers}
        allTeams={allTeams}
        wildcards={{
          killLeader: userWildcard.find(
            (wildcard) => wildcard.name === 'killLeader'
          ) as Wildcard,
          champion: userWildcard.find(
            (wildcard) => wildcard.name === 'champion'
          ) as Wildcard,
        }}
      />
    </main>
  );
}
