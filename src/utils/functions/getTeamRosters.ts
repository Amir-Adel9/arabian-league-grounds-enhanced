export async function getTeamRosters() {
  return await import('@/utils/data/team_rosters.json').then(
    (module) => module.default
  );
}

export async function getTeamRostersByRole() {
  // Return rosters with players grouped by role (top, jungle, mid, bot, support) each player has a role property, so we can use that to group them, I want to return an object that looks like this: { top: [player1, player2, player3], jungle: [player1, player2, player3], mid: [player1, player2, player3], bot: [player1, player2, player3], support: [player1, player2, player3] }

  const rosters = await getTeamRosters();

  return rosters.reduce(
    (acc, roster) => {
      roster.players.forEach((player) => {
        if (!acc[player.role]) {
          acc[player.role] = [];
        }

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
        role: string;
        teamName: string;
        teamSlug: string;
        teamCode: string;
      }[]
    >
  );
}

export type TeamRosters = Awaited<ReturnType<typeof getTeamRosters>>;
