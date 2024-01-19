import { db } from '@/db';
import { player } from '@/db/schema/schema';

export async function getTeamRosters() {
  return await import('@/utils/data/lec_team_rosters.json').then(
    (module) => module.default
  );
}

async function insertRostersIntoDB() {
  // Insert rosters into database

  const rosters = await getTeamRosters();

  // get players out of rosters

  const players = rosters.reduce(
    (acc, roster) => [...acc, ...roster.players],
    [] as (typeof rosters)[0]['players']
  );

  // insert players into database

  players.forEach(async (p) => {
    // console.log('Inserting player:', player.summonerName);
    await db
      .insert(player)
      .values({
        nationality: p.nationality,
        name: p.name,
        summonerName: p.summonerName,
        role: p.role,
        cost: p.cost,
        teamName: p.teamName,
        teamSlug: p.teamSlug,
        teamCode: p.teamCode,
      })
      .onDuplicateKeyUpdate({
        set: {
          summonerName: p.summonerName,
        },
      })
      .then((res) => {
        // console.log('Inserted player successfully:', p.summonerName);
      })
      .catch((err) => {
        console.error('Error inserting player:', p.summonerName, err);
      });
  });
}

insertRostersIntoDB();

export async function getTeamRostersByRole() {
  // Return rosters with players grouped by role (top, jungle, mid, bot, support) each player has a role property, so we can use that to group them, I want to return an object that looks like this: { top: [player1, player2, player3], jungle: [player1, player2, player3], mid: [player1, player2, player3], bot: [player1, player2, player3], support: [player1, player2, player3] }

  const rosters = await getTeamRosters();

  return rosters.reduce(
    (acc, roster) => {
      roster.players.forEach((player) => {
        if (!acc[player.role]) {
          acc[player.role] = [];
        }

        // @ts-ignore
        acc[player.role].push(player);
      });

      return acc;
    },
    {
      top: [],
      jungle: [],
      mid: [],
      bot: [],
      support: [],
    } as Record<
      string,
      {
        id: number;
        name: string;
        nationality: string;
        flagUrl: string;
        summonerName: string;
        role: 'top' | 'jungle' | 'mid' | 'bot' | 'support';
        cost: number;
        teamName: string;
        teamSlug: string;
        teamCode: string;
      }[]
    >
  );
}

export type TeamRosters = Awaited<ReturnType<typeof getTeamRosters>>;

export type TeamRostersByRole = Awaited<
  ReturnType<typeof getTeamRostersByRole>
>;
