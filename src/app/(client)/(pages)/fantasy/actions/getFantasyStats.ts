'use server';

import { requestParams } from '@/utils/constants/requestParams';
import { getPostEventStats } from '@/utils/functions/getPostEventStats';
import { Event, ParticipantMetadata, Stats } from '@/utils/types/types';

type FantasyPlayer = {
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
};

type FantasyRoster = {
  top: FantasyPlayer;
  jungle: FantasyPlayer;
  mid: FantasyPlayer;
  bot: FantasyPlayer;
  support: FantasyPlayer;
};

export default async function getFantasyStats({
  fantasyRoster,
}: {
  fantasyRoster: FantasyRoster;
}) {
  //   console.log('fantasyRoster: ', fantasyRoster);

  const allCompletedEvents = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    { ...requestParams, cache: 'no-cache' }
  )
    .then((res) => res.json())
    .then((res) => res.data.schedule.events)
    .then((events) =>
      events.filter((event: Event) => event.state === 'completed')
    )
    .then((events) => events.filter((event: Event) => event.type === 'match'))
    .then((events) =>
      events.filter(
        (event: Event) =>
          // only events after 2021-06-11T00:00:00Z
          new Date(event.startTime) > new Date('2023-06-11T00:00:00Z')
      )
    );

  const eventsWithFantasyPlayers: Event[] = allCompletedEvents.filter(
    (event: Event) => {
      return Object.values(fantasyRoster).some((fantasyPlayer) => {
        return (
          event.match.teams[0].code === fantasyPlayer.teamCode ||
          event.match.teams[1].code === fantasyPlayer.teamCode
        );
      });
    }
  );

  const eventsWithFantasyPlayersAndStats = await Promise.all(
    eventsWithFantasyPlayers.map(async (event: Event) => {
      const data = await getPostEventStats({
        event: event,
      });

      //   console.log('data: ', data);
      return data;
    })
  )
    .then((events) => events.flat())
    .then((events) => events.filter((event) => event.state === 'Success'));

  console.log(
    'eventsWithFantasyPlayersAndStats: ',
    eventsWithFantasyPlayersAndStats
  );

  const points = eventsWithFantasyPlayersAndStats
    .filter((event: Stats) => {
      return (
        event.event.match.teams[0].code === 'GK' ||
        event.event.match.teams[1].code === 'GK'
      );
    })
    .map((event: Stats) => {
      return {
        a: event.gameMetadata.blueTeamMetadata.participantMetadata,
        b: event.gameMetadata.redTeamMetadata.participantMetadata,
        c: event.lastFrame.blueTeam.participants.find(
          (p) => p.participantId === 4
        ),
        d: event.lastFrame.redTeam.participants.find(
          (p) => p.participantId === 9
        ),
      };
    });

  function getPointsFromGameWins({
    eventsWithFantasyPlayersAndStats,
    fantasyRoster,
  }: {
    eventsWithFantasyPlayersAndStats: Stats[];
    fantasyRoster: FantasyRoster;
  }) {
    let pointsFromGameWins = {
      top: 0,
      jungle: 0,
      mid: 0,
      bot: 0,
      support: 0,
      total: 0,
    };

    const winningFantasyPlayersUnfiltered =
      eventsWithFantasyPlayersAndStats.map((event: Stats) => {
        const eventWinner = event.event.match.teams.find(
          (team) => team.result.outcome === 'win'
        );
        return Object.values(fantasyRoster).filter((fantasyPlayer) => {
          return fantasyPlayer.teamCode === eventWinner?.code;
        });
      });

    const winningFantasyPlayers = winningFantasyPlayersUnfiltered.filter(
      (fantasyPlayer) => fantasyPlayer.length > 0
    );

    winningFantasyPlayers.forEach((players) => {
      players.forEach((player) => {
        pointsFromGameWins[player.role] += 5;
        pointsFromGameWins.total += 5;
      });
    });

    return pointsFromGameWins;
  }

  function getPointsFromKills({
    eventsWithFantasyPlayersAndStats,
    fantasyRoster,
  }: {
    eventsWithFantasyPlayersAndStats: Stats[];
    fantasyRoster: FantasyRoster;
  }) {
    const pointsFromKills = {
      top: 0,
      jungle: 0,
      mid: 0,
      bot: 0,
      support: 0,
      total: 0,
    };

    eventsWithFantasyPlayersAndStats.forEach((event: Stats) => {
      console.log('rosters: ', event.rosters);

      const fantasyPlayersWithSides = {
        top: {
          ...fantasyRoster.top,
          side:
            event.gameMetadata.blueTeamMetadata.participantMetadata.find(
              (participant) =>
                participant.summonerName ===
                `${fantasyRoster.top.teamCode} ${fantasyRoster.top.summonerName}`
            )?.summonerName ===
            `${fantasyRoster.top.teamCode} ${fantasyRoster.top.summonerName}`
              ? ('blueTeamMetadata' as 'blueTeamMetadata')
              : ('redTeamMetadata' as 'redTeamMetadata'),
        },
        jungle: {
          ...fantasyRoster.jungle,
          side:
            event.gameMetadata.blueTeamMetadata.participantMetadata.find(
              (participant) =>
                participant.summonerName ===
                `${fantasyRoster.jungle.teamCode} ${fantasyRoster.jungle.summonerName}`
            )?.summonerName ===
            `${fantasyRoster.jungle.teamCode} ${fantasyRoster.jungle.summonerName}`
              ? ('blueTeamMetadata' as 'blueTeamMetadata')
              : ('redTeamMetadata' as 'redTeamMetadata'),
        },
        mid: {
          ...fantasyRoster.mid,
          side:
            event.gameMetadata.blueTeamMetadata.participantMetadata.find(
              (participant) =>
                participant.summonerName ===
                `${fantasyRoster.mid.teamCode} ${fantasyRoster.mid.summonerName}`
            )?.summonerName ===
            `${fantasyRoster.mid.teamCode} ${fantasyRoster.mid.summonerName}`
              ? ('blueTeamMetadata' as 'blueTeamMetadata')
              : ('redTeamMetadata' as 'redTeamMetadata'),
        },
        bot: {
          ...fantasyRoster.bot,
          side:
            event.gameMetadata.blueTeamMetadata.participantMetadata.find(
              (participant) =>
                participant.summonerName ===
                `${fantasyRoster.bot.teamCode} ${fantasyRoster.bot.summonerName}`
            )?.summonerName ===
            `${fantasyRoster.bot.teamCode} ${fantasyRoster.bot.summonerName}`
              ? ('blueTeamMetadata' as 'blueTeamMetadata')
              : ('redTeamMetadata' as 'redTeamMetadata'),
        },
        support: {
          ...fantasyRoster.support,
          side:
            event.gameMetadata.blueTeamMetadata.participantMetadata.find(
              (participant) =>
                participant.summonerName ===
                `${fantasyRoster.support.teamCode} ${fantasyRoster.support.summonerName}`
            )?.summonerName ===
            `${fantasyRoster.support.teamCode} ${fantasyRoster.support.summonerName}`
              ? ('blueTeamMetadata' as 'blueTeamMetadata')
              : ('redTeamMetadata' as 'redTeamMetadata'),
        },
      };

      console.log('fantasyPlayersWithSides: ', fantasyPlayersWithSides);

      const fantasyPlayersWithParticipantIds = [
        {
          ...fantasyPlayersWithSides.top,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.top.side
            ].participantMetadata.find(
              (participant) => participant.role === 'top'
            )!.summonerName ===
            `${fantasyRoster.top.teamCode} ${fantasyRoster.top.summonerName}`
              ? 1
              : 0,
        },
        {
          ...fantasyPlayersWithSides.jungle,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.jungle.side
            ].participantMetadata.find(
              (participant) => participant.role === 'jungle'
            )!.summonerName ===
            `${fantasyRoster.jungle.teamCode} ${fantasyRoster.jungle.summonerName}`
              ? 2
              : 0,
        },
        {
          ...fantasyPlayersWithSides.mid,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.mid.side
            ].participantMetadata.find(
              (participant) => participant.role === 'mid'
            )!.summonerName ===
            `${fantasyRoster.mid.teamCode} ${fantasyRoster.mid.summonerName}`
              ? 3
              : 0,
        },
        {
          ...fantasyPlayersWithSides.bot,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.bot.side
            ].participantMetadata.find(
              (participant) => participant.role === 'bottom'
            )!.summonerName ===
            `${fantasyRoster.bot.teamCode} ${fantasyRoster.bot.summonerName}`
              ? 4
              : 0,
        },
        {
          ...fantasyPlayersWithSides.support,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.support.side
            ].participantMetadata.find(
              (participant) => participant.role === 'support'
            )!.summonerName ===
            `${fantasyRoster.support.teamCode} ${fantasyRoster.support.summonerName}`
              ? 5
              : 0,
        },
        {
          ...fantasyPlayersWithSides.top,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.top.side
            ].participantMetadata.find(
              (participant) => participant.role === 'top'
            )!.summonerName ===
            `${fantasyRoster.top.teamCode} ${fantasyRoster.top.summonerName}`
              ? 6
              : 0,
        },
        {
          ...fantasyPlayersWithSides.jungle,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.jungle.side
            ].participantMetadata.find(
              (participant) => participant.role === 'jungle'
            )!.summonerName ===
            `${fantasyRoster.jungle.teamCode} ${fantasyRoster.jungle.summonerName}`
              ? 7
              : 0,
        },
        {
          ...fantasyPlayersWithSides.mid,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.mid.side
            ].participantMetadata.find(
              (participant) => participant.role === 'mid'
            )!.summonerName ===
            `${fantasyRoster.mid.teamCode} ${fantasyRoster.mid.summonerName}`
              ? 8
              : 0,
        },
        {
          ...fantasyPlayersWithSides.bot,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.bot.side
            ].participantMetadata.find(
              (participant) => participant.role === 'bottom'
            )!.summonerName ===
            `${fantasyRoster.bot.teamCode} ${fantasyRoster.bot.summonerName}`
              ? 9
              : 0,
        },
        {
          ...fantasyPlayersWithSides.support,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.support.side
            ].participantMetadata.find(
              (participant) => participant.role === 'support'
            )!.summonerName ===
            `${fantasyRoster.support.teamCode} ${fantasyRoster.support.summonerName}`
              ? 10
              : 0,
        },
      ];

      fantasyPlayersWithParticipantIds.forEach((fantasyPlayer) => {
        const lastFrameSide =
          fantasyPlayer.side === 'blueTeamMetadata' ? 'blueTeam' : 'redTeam';
        const participant = event.lastFrame[lastFrameSide].participants.find(
          (participant) =>
            participant.participantId === fantasyPlayer.participantId
        );

        if (!participant) return;
        pointsFromKills[fantasyPlayer.role] += participant.kills * 3;
        pointsFromKills.total += participant.kills * 3;
      });
    });
    console.log('pointsFromKills: ', pointsFromKills);
    return pointsFromKills;
  }

  function getPointsFromDeaths({
    eventsWithFantasyPlayersAndStats,
    fantasyRoster,
  }: {
    eventsWithFantasyPlayersAndStats: Stats[];
    fantasyRoster: FantasyRoster;
  }) {
    const pointsFromDeaths = {
      top: 0,
      jungle: 0,
      mid: 0,
      bot: 0,
      support: 0,
      total: 0,
    };

    eventsWithFantasyPlayersAndStats.forEach((event: Stats) => {
      const fantasyPlayersWithSides = {
        top: {
          ...fantasyRoster.top,
          side:
            event.gameMetadata.blueTeamMetadata.participantMetadata.find(
              (participant) =>
                participant.summonerName ===
                `${fantasyRoster.top.teamCode} ${fantasyRoster.top.summonerName}`
            )?.summonerName ===
            `${fantasyRoster.top.teamCode} ${fantasyRoster.top.summonerName}`
              ? ('blueTeamMetadata' as 'blueTeamMetadata')
              : ('redTeamMetadata' as 'redTeamMetadata'),
        },
        jungle: {
          ...fantasyRoster.jungle,
          side:
            event.gameMetadata.blueTeamMetadata.participantMetadata.find(
              (participant) =>
                participant.summonerName ===
                `${fantasyRoster.jungle.teamCode} ${fantasyRoster.jungle.summonerName}`
            )?.summonerName ===
            `${fantasyRoster.jungle.teamCode} ${fantasyRoster.jungle.summonerName}`
              ? ('blueTeamMetadata' as 'blueTeamMetadata')
              : ('redTeamMetadata' as 'redTeamMetadata'),
        },
        mid: {
          ...fantasyRoster.mid,
          side:
            event.gameMetadata.blueTeamMetadata.participantMetadata.find(
              (participant) =>
                participant.summonerName ===
                `${fantasyRoster.mid.teamCode} ${fantasyRoster.mid.summonerName}`
            )?.summonerName ===
            `${fantasyRoster.mid.teamCode} ${fantasyRoster.mid.summonerName}`
              ? ('blueTeamMetadata' as 'blueTeamMetadata')
              : ('redTeamMetadata' as 'redTeamMetadata'),
        },
        bot: {
          ...fantasyRoster.bot,
          side:
            event.gameMetadata.blueTeamMetadata.participantMetadata.find(
              (participant) =>
                participant.summonerName ===
                `${fantasyRoster.bot.teamCode} ${fantasyRoster.bot.summonerName}`
            )?.summonerName ===
            `${fantasyRoster.bot.teamCode} ${fantasyRoster.bot.summonerName}`
              ? ('blueTeamMetadata' as 'blueTeamMetadata')
              : ('redTeamMetadata' as 'redTeamMetadata'),
        },
        support: {
          ...fantasyRoster.support,
          side:
            event.gameMetadata.blueTeamMetadata.participantMetadata.find(
              (participant) =>
                participant.summonerName ===
                `${fantasyRoster.support.teamCode} ${fantasyRoster.support.summonerName}`
            )?.summonerName ===
            `${fantasyRoster.support.teamCode} ${fantasyRoster.support.summonerName}`
              ? ('blueTeamMetadata' as 'blueTeamMetadata')
              : ('redTeamMetadata' as 'redTeamMetadata'),
        },
      };

      const fantasyPlayersWithParticipantIds = [
        {
          ...fantasyPlayersWithSides.top,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.top.side
            ].participantMetadata.find(
              (participant) => participant.role === 'top'
            )!.summonerName ===
            `${fantasyRoster.top.teamCode} ${fantasyRoster.top.summonerName}`
              ? 1
              : 0,
        },
        {
          ...fantasyPlayersWithSides.jungle,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.jungle.side
            ].participantMetadata.find(
              (participant) => participant.role === 'jungle'
            )!.summonerName ===
            `${fantasyRoster.jungle.teamCode} ${fantasyRoster.jungle.summonerName}`
              ? 2
              : 0,
        },
        {
          ...fantasyPlayersWithSides.mid,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.mid.side
            ].participantMetadata.find(
              (participant) => participant.role === 'mid'
            )!.summonerName ===
            `${fantasyRoster.mid.teamCode} ${fantasyRoster.mid.summonerName}`
              ? 3
              : 0,
        },
        {
          ...fantasyPlayersWithSides.bot,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.bot.side
            ].participantMetadata.find(
              (participant) => participant.role === 'bottom'
            )!.summonerName ===
            `${fantasyRoster.bot.teamCode} ${fantasyRoster.bot.summonerName}`
              ? 4
              : 0,
        },
        {
          ...fantasyPlayersWithSides.support,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.support.side
            ].participantMetadata.find(
              (participant) => participant.role === 'support'
            )!.summonerName ===
            `${fantasyRoster.support.teamCode} ${fantasyRoster.support.summonerName}`
              ? 5
              : 0,
        },
        {
          ...fantasyPlayersWithSides.top,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.top.side
            ].participantMetadata.find(
              (participant) => participant.role === 'top'
            )!.summonerName ===
            `${fantasyRoster.top.teamCode} ${fantasyRoster.top.summonerName}`
              ? 6
              : 0,
        },
        {
          ...fantasyPlayersWithSides.jungle,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.jungle.side
            ].participantMetadata.find(
              (participant) => participant.role === 'jungle'
            )!.summonerName ===
            `${fantasyRoster.jungle.teamCode} ${fantasyRoster.jungle.summonerName}`
              ? 7
              : 0,
        },
        {
          ...fantasyPlayersWithSides.mid,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.mid.side
            ].participantMetadata.find(
              (participant) => participant.role === 'mid'
            )!.summonerName ===
            `${fantasyRoster.mid.teamCode} ${fantasyRoster.mid.summonerName}`
              ? 8
              : 0,
        },
        {
          ...fantasyPlayersWithSides.bot,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.bot.side
            ].participantMetadata.find(
              (participant) => participant.role === 'bottom'
            )!.summonerName ===
            `${fantasyRoster.bot.teamCode} ${fantasyRoster.bot.summonerName}`
              ? 9
              : 0,
        },
        {
          ...fantasyPlayersWithSides.support,
          participantId:
            event.gameMetadata[
              fantasyPlayersWithSides.support.side
            ].participantMetadata.find(
              (participant) => participant.role === 'support'
            )!.summonerName ===
            `${fantasyRoster.support.teamCode} ${fantasyRoster.support.summonerName}`
              ? 10
              : 0,
        },
      ];

      fantasyPlayersWithParticipantIds.forEach((fantasyPlayer) => {
        const lastFrameSide =
          fantasyPlayer.side === 'blueTeamMetadata' ? 'blueTeam' : 'redTeam';
        const participant = event.lastFrame[lastFrameSide].participants.find(
          (participant) =>
            participant.participantId === fantasyPlayer.participantId
        );

        if (!participant) return;
        pointsFromDeaths[fantasyPlayer.role] -= participant.deaths * 2;
        pointsFromDeaths.total -= participant.deaths * 2;
      });
    });
    console.log('pointsFromDeaths: ', pointsFromDeaths);
    return pointsFromDeaths;
  }
  function getFantasyPoints({
    eventsWithFantasyPlayersAndStats,
    fantasyRoster,
  }: {
    eventsWithFantasyPlayersAndStats: Stats[];
    fantasyRoster: FantasyRoster;
  }) {
    const pointsFromGameWins = getPointsFromGameWins({
      eventsWithFantasyPlayersAndStats,
      fantasyRoster,
    });

    const pointsFromKills = getPointsFromKills({
      eventsWithFantasyPlayersAndStats,
      fantasyRoster,
    });

    const pointsFromDeaths = getPointsFromDeaths({
      eventsWithFantasyPlayersAndStats,
      fantasyRoster,
    });

    return {
      top: {
        pointsFromGameWins: pointsFromGameWins.top,
        pointsFromKills: pointsFromKills.top,
        pointsFromDeaths: pointsFromDeaths.top,
        totalPoints:
          pointsFromGameWins.top + pointsFromKills.top + pointsFromDeaths.top,
      },
      jungle: {
        pointsFromGameWins: pointsFromGameWins.jungle,
        pointsFromKillParticipation: pointsFromKills.jungle,
        pointsFromDeaths: pointsFromDeaths.jungle,
        totalPoints:
          pointsFromGameWins.jungle +
          pointsFromKills.jungle +
          pointsFromDeaths.jungle,
      },
      mid: {
        pointsFromGameWins: pointsFromGameWins.mid,
        pointsFromKills: pointsFromKills.mid,
        pointsFromDeaths: pointsFromDeaths.mid,
        totalPoints:
          pointsFromGameWins.mid + pointsFromKills.mid + pointsFromDeaths.mid,
      },
      bot: {
        pointsFromGameWins: pointsFromGameWins.bot,
        pointsFromKills: pointsFromKills.bot,
        pointsFromDeaths: pointsFromDeaths.bot,
        totalPoints:
          pointsFromGameWins.bot + pointsFromKills.bot + pointsFromDeaths.bot,
      },
      support: {
        pointsFromGameWins: pointsFromGameWins.support,
        pointsFromAssists: pointsFromKills.support,
        pointsFromDeaths: pointsFromDeaths.support,
        totalPoints:
          pointsFromGameWins.support +
          pointsFromKills.support +
          pointsFromDeaths.support,
      },
      totalFantasyPoints:
        pointsFromGameWins.total +
        pointsFromKills.total +
        pointsFromDeaths.total,
    };
  }
  const fantasyPoints = getFantasyPoints({
    eventsWithFantasyPlayersAndStats,
    fantasyRoster,
  });

  return fantasyPoints;
}
