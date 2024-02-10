import WildCards from './_components/WildCards';
import {
  getTeamRostersByRole,
  getTeams,
} from '@/utils/functions/getTeamRosters';
import { getWildCards } from './actions/wildcardActions';
import { Player, Wildcard } from '@/db/types';
import { getCompletedEventsInSplit } from '@/data-access/data-access';
import { Event } from '@/utils/types/types';
import {
  filterEventsWithFantasyPlayer,
  getPointsFromKillsForPlayer,
  getStatsForEventsWithFantasyPlayers,
} from '@/entities/fantasy/fantasy.helpers';

export default async function WildCardsPage() {
  const allPlayers = await getTeamRostersByRole();
  const allTeams = await getTeams();
  const allEvents = await getCompletedEventsInSplit();
  const allStats = await getAllStats({
    allPlayers: Object.values(allPlayers).flat() as Player[],
    allEvents,
  });
  const userWildcards = await getWildCards();
  return (
    <main className='w-full min-h-screen relative overflow-x-hidden justify-start items-center text-primary lg:ml-20 lg:w-[calc(100%-5rem)] h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)] flex flex-col gap-5 font-geist'>
      <WildCards
        allPlayers={allPlayers}
        allTeams={allTeams}
        allEvents={allEvents}
        allStats={allStats}
        wildcards={{
          killLeader: userWildcards.find(
            (wildcard) => wildcard.name === 'killLeader'
          ) as Wildcard,
          champion: userWildcards.find(
            (wildcard) => wildcard.name === 'champion'
          ) as Wildcard,
          deathMaster: userWildcards.find(
            (wildcard) => wildcard.name === 'deathMaster'
          ) as Wildcard,
          baronSpecialists: userWildcards.find(
            (wildcard) => wildcard.name === 'baronSpecialists'
          ) as Wildcard,
        }}
      />
    </main>
  );
}

async function getAllStats({
  allPlayers,
  allEvents,
}: {
  allPlayers: Player[];
  allEvents: Event[];
}) {
  const allStats = await Promise.all(
    allPlayers.map(async (player) => {
      const events = filterEventsWithFantasyPlayer({
        events: allEvents,
        fantasyPlayer: player,
      });

      const statsForPlayer = await getStatsForEventsWithFantasyPlayers({
        events,
      });
      const totalKills =
        getPointsFromKillsForPlayer({
          events: statsForPlayer,
          fantasyPlayer: player,
        }) / 3;

      return {
        summonerName: player.summonerName,
        teamLogo: player.teamLogo,
        role: player.role,
        kills: totalKills,
      };
    })
  );
  return allStats;
}
