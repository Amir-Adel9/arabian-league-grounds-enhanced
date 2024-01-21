'use server';

import { Event, Stats } from '@/utils/types/types';
import {
  addPlayerToFantasyTeam,
  createFantasyTeam,
  getFantasyPlayers,
  getFantasyRoster,
  getFantasyTeam,
  getPlayer,
  updateFantasyPointsForPlayer,
  updateFantasyPointsForUser,
} from './fantasy.db';
import { FantasyPlayer, FantasyRoster } from './fantasy.types';
import {
  getCompletedEventsInSplit,
  getCompletedEventsSincePicked,
} from '@/data-access/data-access';
import { getPostEventStats } from '@/utils/functions/getPostEventStats';
import dayjs from 'dayjs';
import { Player, PlayerToFantasyTeam } from '@/db/types';

type Role = 'top' | 'jungle' | 'mid' | 'bot' | 'support';

export async function lockInFantasyTeam({
  fantasyRoster,
}: {
  fantasyRoster: FantasyRoster;
}) {
  if (!fantasyRoster) throw new Error('No fantasy roster found');

  const registeredFantasyTeam = await getFantasyTeam();

  const isWeekLocked = checkWeekDay();

  // if (isWeekLocked) throw new Error('Week is locked');

  if (registeredFantasyTeam) {
    const currentFantasyRoster = await getFantasyRoster({
      fantasyTeamId: registeredFantasyTeam.id,
    });

    const filteredFantasyRoster = Object.values(fantasyRoster).filter(
      (fantasyPlayer) => {
        return !Object.values(currentFantasyRoster).some((player) => {
          return player.summonerName === fantasyPlayer.summonerName;
        });
      }
    );
    Object.values(filteredFantasyRoster).forEach(async (fantasyPlayer) => {
      await addPlayerToFantasyTeam({
        fantasyPlayer,
        fantasyTeamId: registeredFantasyTeam.id,
      });
    });
  } else {
    await createFantasyTeam();
    lockInFantasyTeam({ fantasyRoster });
  }
}

export async function getFantasyTeamStats() {
  const fantasyTeamId = (await getFantasyTeam()).id;

  if (!fantasyTeamId) throw new Error('No fantasy team found');

  const fantasyRoster = await getFantasyRoster({ fantasyTeamId });
  const completedEventsInSplit: Event[] = await getCompletedEventsInSplit();

  const eventsWithFantasyPlayers = filterEventsWithFantasyPlayers({
    events: completedEventsInSplit,
    fantasyRoster,
  });

  const statsForEventsWithFantasyPlayers =
    await getStatsForEventsWithFantasyPlayers({
      events: eventsWithFantasyPlayers,
    });

  const fantasyPoints = await getFantasyPoints({
    eventsWithFantasyPlayersAndStats: statsForEventsWithFantasyPlayers,
    fantasyRoster,
  });

  return fantasyPoints;
}

export async function calculateFantasyPoints() {
  const fantasyTeamId = (await getFantasyTeam()).id;

  if (!fantasyTeamId) throw new Error('No fantasy team found');

  const fantasyRoster = await getFantasyPlayers({ fantasyTeamId });
  Object.values(fantasyRoster).forEach(async (fantasyPlayer) => {
    const _player = await getPlayer({ playerId: fantasyPlayer.playerId });
    const pickedAt = fantasyPlayer.pickedAt;

    const completedEventsSincePicked = await getCompletedEventsSincePicked({
      pickedAt,
    });

    const eventsWithFantasyPlayer = filterEventsWithFantasyPlayer({
      events: completedEventsSincePicked,
      fantasyPlayer: _player as Player,
    });

    const statsForEventsWithFantasyPlayer =
      await getStatsForEventsWithFantasyPlayers({
        events: eventsWithFantasyPlayer,
      });

    // console.log('statsForEventsWithFantasy: ', statsForEventsWithFantasyPlayer);

    const fantasyPoints = await getFantasyPointsForPlayer({
      events: statsForEventsWithFantasyPlayer,
      fantasyPlayer: _player as Player,
    });

    console.log(`fantasyPoints for ${_player.summonerName}: `, fantasyPoints);

    await updateFantasyPointsForPlayer({
      points: fantasyPoints.totalFantasyPoints,
      playerId: fantasyPlayer.playerId,
    });
  });
  const updatedFantasyRoster = await getFantasyPlayers({ fantasyTeamId });

  const fantasyPoints = getFantasyPointsFromRoster({
    fantasyRoster: updatedFantasyRoster as PlayerToFantasyTeam[],
  });

  await updateFantasyPointsForUser({
    points: fantasyPoints,
    fantasyTeamId: fantasyTeamId,
  });
}

function filterEventsWithFantasyPlayers({
  events,
  fantasyRoster,
}: {
  events: Event[];
  fantasyRoster: FantasyRoster;
}) {
  return events.filter((event: Event) => {
    return Object.values(fantasyRoster).some((fantasyPlayer) => {
      return (
        event.match.teams[0].code === fantasyPlayer.teamCode ||
        event.match.teams[1].code === fantasyPlayer.teamCode
      );
    });
  });
}

function filterEventsWithFantasyPlayer({
  events,
  fantasyPlayer,
}: {
  events: Event[];
  fantasyPlayer: Player;
}) {
  return events.filter((event) => {
    return (
      event.match.teams[0].code === fantasyPlayer.teamCode ||
      event.match.teams[1].code === fantasyPlayer.teamCode
    );
  });
}

async function getStatsForEventsWithFantasyPlayers({
  events,
}: {
  events: Event[];
}) {
  return await Promise.all(
    events.map(async (event) => {
      return await getPostEventStats({ event });
    })
  )
    .then((events) => events.flat())
    .then((events) => events.filter((event) => event.state === 'Success'));
}

function checkWeekDay() {
  const today = dayjs();
  return today.day() === 0 || today.day() === 6 || today.day() === 1;
}

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

  const winningFantasyPlayersUnfiltered = eventsWithFantasyPlayersAndStats.map(
    (event: Stats) => {
      const eventWinner = event.event.match.teams.find(
        (team) => team.result.outcome === 'win'
      );
      return Object.values(fantasyRoster).filter((fantasyPlayer) => {
        return fantasyPlayer.teamCode === eventWinner?.code;
      });
    }
  );

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
    // console.log('rosters: ', event.rosters);

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

    // console.log('fantasyPlayersWithSides: ', fantasyPlayersWithSides);

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

      if (!participant || fantasyPlayer.role === 'support') return;
      pointsFromKills[fantasyPlayer.role] += participant.kills * 3;
      pointsFromKills.total += participant.kills * 3;
    });
  });
  // console.log('pointsFromKills: ', pointsFromKills);
  return pointsFromKills;
}
function getPointsFromAssists({
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
    // console.log('rosters: ', event.rosters);

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

    // console.log('fantasyPlayersWithSides: ', fantasyPlayersWithSides);

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
      pointsFromKills[fantasyPlayer.role] += participant.assists * 3;
      pointsFromKills.total += participant.assists * 3;
    });
  });
  // console.log('pointsFromKills: ', pointsFromKills);
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
  // console.log('pointsFromDeaths: ', pointsFromDeaths);
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

  const pointsFromAssists = getPointsFromAssists({
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
      pointsFromAssists: pointsFromAssists.support,
      pointsFromDeaths: pointsFromDeaths.support,
      totalPoints:
        pointsFromGameWins.support +
        pointsFromAssists.support +
        pointsFromDeaths.support,
    },
    totalFantasyPoints:
      pointsFromGameWins.total +
      pointsFromKills.total +
      pointsFromDeaths.total +
      pointsFromAssists.support,
  };
}

function getPointsFromGameWinsForPlayer({
  events,
  fantasyPlayer,
}: {
  events: Stats[];
  fantasyPlayer: Player;
}) {
  let pointsFromGameWins = 0;

  const winningFantasyPlayerUnfiltered = events.map((event: Stats) => {
    const eventWinner = event.event.match.teams.find(
      (team) => team.result.outcome === 'win'
    );
    return eventWinner?.code === fantasyPlayer.teamCode;
  });

  const winningFantasyPlayer = winningFantasyPlayerUnfiltered.filter(
    (fantasyPlayer) => fantasyPlayer
  );

  winningFantasyPlayer.forEach(() => {
    pointsFromGameWins += 5;
  });

  return pointsFromGameWins;
}

function getPointsFromKillsForPlayer({
  events,
  fantasyPlayer,
}: {
  events: Stats[];
  fantasyPlayer: Player;
}) {
  let pointsFromKills = 0;

  events.forEach((event: Stats) => {
    const lastFrameSide =
      event.gameMetadata.blueTeamMetadata.participantMetadata.find(
        (participant) =>
          participant.summonerName ===
          `${fantasyPlayer.teamCode} ${fantasyPlayer.summonerName}`
      )?.summonerName ===
      `${fantasyPlayer.teamCode} ${fantasyPlayer.summonerName}`
        ? 'blueTeam'
        : 'redTeam';

    const playerParticipantId = event.gameMetadata[
      lastFrameSide === 'blueTeam' ? 'blueTeamMetadata' : 'redTeamMetadata'
    ].participantMetadata.find(
      (participant) =>
        participant.summonerName ===
        `${fantasyPlayer.teamCode} ${fantasyPlayer.summonerName}`
    )?.participantId;

    const participant = event.lastFrame[lastFrameSide].participants.find(
      (participant) => participant.participantId === playerParticipantId
    );

    if (!participant) return;
    pointsFromKills += participant.kills * 3;
  });

  return pointsFromKills;
}

function getPointsFromAssistsForPlayer({
  events,
  fantasyPlayer,
}: {
  events: Stats[];
  fantasyPlayer: Player;
}) {
  let pointsFromAssists = 0;

  events.forEach((event: Stats) => {
    const lastFrameSide =
      event.gameMetadata.blueTeamMetadata.participantMetadata.find(
        (participant) =>
          participant.summonerName ===
          `${fantasyPlayer.teamCode} ${fantasyPlayer.summonerName}`
      )?.summonerName ===
      `${fantasyPlayer.teamCode} ${fantasyPlayer.summonerName}`
        ? 'blueTeam'
        : 'redTeam';

    const playerParticipantId = event.gameMetadata[
      lastFrameSide === 'blueTeam' ? 'blueTeamMetadata' : 'redTeamMetadata'
    ].participantMetadata.find(
      (participant) =>
        participant.summonerName ===
        `${fantasyPlayer.teamCode} ${fantasyPlayer.summonerName}`
    )?.participantId;

    const participant = event.lastFrame[lastFrameSide].participants.find(
      (participant) => participant.participantId === playerParticipantId
    );

    if (!participant) return;
    pointsFromAssists += participant.assists * 3;
  });

  return pointsFromAssists;
}

function getPointsFromDeathsForPlayer({
  events,
  fantasyPlayer,
}: {
  events: Stats[];
  fantasyPlayer: Player;
}) {
  let pointsFromDeaths = 0;

  events.forEach((event: Stats) => {
    const lastFrameSide =
      event.gameMetadata.blueTeamMetadata.participantMetadata.find(
        (participant) =>
          participant.summonerName ===
          `${fantasyPlayer.teamCode} ${fantasyPlayer.summonerName}`
      )?.summonerName ===
      `${fantasyPlayer.teamCode} ${fantasyPlayer.summonerName}`
        ? 'blueTeam'
        : 'redTeam';

    const playerParticipantId = event.gameMetadata[
      lastFrameSide === 'blueTeam' ? 'blueTeamMetadata' : 'redTeamMetadata'
    ].participantMetadata.find(
      (participant) =>
        participant.summonerName ===
        `${fantasyPlayer.teamCode} ${fantasyPlayer.summonerName}`
    )?.participantId;

    const participant = event.lastFrame[lastFrameSide].participants.find(
      (participant) => participant.participantId === playerParticipantId
    );

    if (!participant) return;
    pointsFromDeaths -= participant.deaths * 2;
  });

  return pointsFromDeaths;
}

function getFantasyPointsForPlayer({
  events,
  fantasyPlayer,
}: {
  events: Stats[];
  fantasyPlayer: Player;
}) {
  const pointsFromGameWins = getPointsFromGameWinsForPlayer({
    events,
    fantasyPlayer,
  });

  const pointsFromKA =
    fantasyPlayer.role === 'support'
      ? getPointsFromAssistsForPlayer({
          events,
          fantasyPlayer,
        })
      : getPointsFromKillsForPlayer({
          events,
          fantasyPlayer,
        });

  const pointsFromDeaths = getPointsFromDeathsForPlayer({
    events,
    fantasyPlayer,
  });

  return {
    pointsFromGameWins,
    pointsFromKA,
    pointsFromDeaths,
    totalFantasyPoints: pointsFromGameWins + pointsFromKA + pointsFromDeaths,
  };
}

function getFantasyPointsFromRoster({
  fantasyRoster,
}: {
  fantasyRoster: PlayerToFantasyTeam[];
}) {
  let fantasyPoints = {
    top: 0,
    jungle: 0,
    mid: 0,
    bot: 0,
    support: 0,
    total: 0,
  };

  fantasyRoster.forEach((fantasyPlayer) => {
    fantasyPoints[fantasyPlayer.role as Role] += fantasyPlayer.points;
    fantasyPoints.total += fantasyPlayer.points;
  });

  return fantasyPoints.total;
}
