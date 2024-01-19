import {
  getTeamRosters,
  getTeamRostersByRole,
} from '@/utils/functions/getTeamRosters';
import FantasyTest from './_components/FantasyTest';
import { playerToFantasyTeam, fantasyTeam, player } from '@/db/schema/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { currentUser } from '@clerk/nextjs';

export default async function FantasyPage() {
  const user = await currentUser();
  const teamRosters = await getTeamRosters();
  const teamRostersByRole = await getTeamRostersByRole();
  // console.log(teamRosters);
  const currentTeamId = await db
    .select()
    .from(fantasyTeam)
    .where(eq(fantasyTeam.userClerkId, user!.id))
    .then((res) => res[0]?.id);

  const currentPlayersIds = await db
    .select({
      id: playerToFantasyTeam.playerId,
    })
    .from(playerToFantasyTeam)
    .where(eq(playerToFantasyTeam.fantasyTeamId, currentTeamId))
    .then((res) => res.map((player) => player.id));

  const currentPlayers = await Promise.all(
    currentPlayersIds.map(async (id) => {
      return db
        .select()
        .from(player)
        .where(eq(player.id, id))
        .then((res) => res[0]);
    })
  );

  // console.log(currentPlayers);

  // players by role
  const playersAsRooster = currentPlayers.reduce(
    (acc, player) => {
      if (player.role === 'top') {
        // @ts-ignore
        acc.top = player;
      } else if (player.role === 'jungle') {
        // @ts-ignore

        acc.jungle = player;
      } else if (player.role === 'mid') {
        // @ts-ignore

        acc.mid = player;
      } else if (player.role === 'bot') {
        // @ts-ignore

        acc.bot = player;
      } else if (player.role === 'support') {
        // @ts-ignore

        acc.support = player;
      }
      return acc;
    },
    {
      top:
        {
          id: 0,
          name: '',
          nationality: '',
          summonerName: '',
          role: '',
          cost: 0,
          teamName: '',
          teamSlug: '',
          teamCode: '',
        } || undefined,
      jungle:
        {
          id: 0,
          name: '',
          nationality: '',
          summonerName: '',
          role: '',
          cost: 0,
          teamName: '',
          teamSlug: '',
          teamCode: '',
        } || undefined,
      mid:
        {
          id: 0,
          name: '',
          nationality: '',
          summonerName: '',
          role: '',
          cost: 0,
          teamName: '',
          teamSlug: '',
          teamCode: '',
        } || undefined,
      bot:
        {
          id: 0,
          name: '',
          nationality: '',
          summonerName: '',
          role: '',
          cost: 0,
          teamName: '',
          teamSlug: '',
          teamCode: '',
        } || undefined,
      support:
        {
          id: 0,
          name: '',
          nationality: '',
          summonerName: '',
          role: '',
          cost: 0,
          teamName: '',
          teamSlug: '',
          teamCode: '',
        } || undefined,
    }
  );

  return (
    <main className='w-full min-h-screen relative flex flex-col justify-start items-center text-primary'>
      <h1 className='font-rubik text-4xl mt-32'>LEC Fantasy Demo</h1>
      <h2 className='font-geist text-2xl mt-5'>2024 Winter Split</h2>
      <div className='w-full'>
        <FantasyTest
          roostersByRole={teamRostersByRole}
          // @ts-ignore

          currentTeam={playersAsRooster}
        />
      </div>
    </main>
  );
}
