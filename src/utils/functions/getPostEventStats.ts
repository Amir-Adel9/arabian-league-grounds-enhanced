import { requestParams } from '../constants/requestParams';
import {
  Event,
  Game,
  GameFrame,
  ParticipantMetadata,
  Stats,
} from '../types/types';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

dayjs.extend(utcPlugin);

async function fetchStatsWithRetries({
  gameId,
  matchId,
  event,
  startTime,
}: {
  gameId: string;
  matchId: string;
  event: Event;
  startTime: string;
}) {
  const maxRetries = 10;
  let retryCount = 0;

  async function fetchStatsInternal(
    gameId: string,
    startTime: string
  ): Promise<
    | Stats
    | {
        state: 'Error';
        status: number;
        gameId?: string;
        matchId?: string;
        startTime: string;
      }
  > {
    // console.log('gameId: ', gameId);

    // console.log('fetching stats for gameId: ', gameId);
    const res = await fetch(
      `https://feed.lolesports.com/livestats/v1/window/${gameId}?startingTime=${startTime}`,
      requestParams
    );
    if (res.status !== 200 && retryCount < maxRetries) {
      retryCount++;
      const newStartTime = dayjs().utc().subtract(1, 'minute').toISOString();
      // console.log(
      //   roundTimestampToNearest10Seconds(startTime),
      //   roundTimestampToNearest10Seconds(newStartTime)
      // );
      return fetchStatsInternal(
        gameId,
        roundTimestampToNearest10Seconds(newStartTime)
      );
    } else if (res.status !== 200 && retryCount >= maxRetries) {
      return {
        state: 'Error',
        status: res.status,
        gameId: gameId,
        startTime: startTime,
      };
    } else {
      const data = await res.json().catch((err) => {
        console.log(
          'Error',
          err,
          'gameId Err: ',
          gameId,
          'matchId Err: ',
          matchId,
          'startTime Err: ',
          startTime,
          res.status
        );
        return {
          state: 'Error',
          status: res.status,
          startTime: startTime,
        };
      });
      // console.log('data: ', data);
      const lastFrame: GameFrame = data.frames[data.frames.length - 1];
      // console.log('data: ', lastFrame.gameState, startTime, gameId);
      if (lastFrame.gameState !== 'finished' && retryCount < maxRetries) {
        retryCount++;
        if (retryCount >= maxRetries)
          return {
            state: 'Error',
            status: res.status,
            gameId: data.esportsGameId,
            matchId: matchId,
            startTime: startTime,
          };
        const newStartTime = dayjs().utc().subtract(1, 'minute').toISOString();
        return fetchStatsInternal(
          gameId,
          roundTimestampToNearest10Seconds(newStartTime)
        );
      } else {
        retryCount = 0;
        return {
          state: 'Success',
          esportsGameId: data.esportsGameId,
          esportsMatchId: data.esportsMatchId,
          gameMetadata: data.gameMetadata,
          rosters: {
            blueTeam: {
              esportsTeamId: data.gameMetadata.blueTeamMetadata.esportsTeamId,
              participants:
                data.gameMetadata.blueTeamMetadata.participantMetadata.map(
                  (participant: ParticipantMetadata) => ({
                    participantId: participant.participantId,
                    esportsPlayerId: participant.esportsPlayerId,
                    esportsTeamId:
                      data.gameMetadata.blueTeamMetadata.esportsTeamId,
                    summonerName: participant.summonerName,
                    championId: participant.championId,
                    role: participant.role,
                  })
                ),
            },
            redTeam: {
              esportsTeamId: data.gameMetadata.redTeamMetadata.esportsTeamId,
              participants:
                data.gameMetadata.redTeamMetadata.participantMetadata.map(
                  (participant: ParticipantMetadata) => ({
                    participantId: participant.participantId,
                    esportsPlayerId: participant.esportsPlayerId,
                    esportsTeamId:
                      data.gameMetadata.redTeamMetadata.esportsTeamId,
                    summonerName: participant.summonerName,
                    championId: participant.championId,
                    role: participant.role,
                  })
                ),
            },
          },
          lastFrame: data.frames[data.frames.length - 1],
          event: event,
        };
      }
    }
  }

  return fetchStatsInternal(
    gameId,
    roundTimestampToNearest10Seconds(startTime)
  );
}

function roundTimestampToNearest10Seconds(timestamp: string) {
  // Parse the input timestamp using Day.js
  let dt = dayjs(timestamp);

  // Get the seconds component of the timestamp
  const seconds = dt.second();

  // Calculate the adjustment needed to make it divisible by 10
  const adjustment = seconds % 10;

  // Adjust the seconds component
  dt = dt.subtract(adjustment, 'second');

  // Set milliseconds to 0 to ensure consistent rounding
  dt = dt.millisecond(0);

  // Return the adjusted timestamp
  // console.log(
  //   'timestamp: ',
  //   timestamp,
  //   'adjusted TimeStamp: ',
  //   dt.toISOString()
  // );
  return dt.toISOString();
}

export async function getPostEventStats({ event }: { event: Event }) {
  if (event.state !== 'completed') {
    throw new Error('Event is not completed');
  }
  const gameIds = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=en-US&id=${event.match.id}`,
    requestParams
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data.event.match.games
        .filter((game: Game) => {
          return game.state === 'completed';
        })
        .map((game: Game) => {
          return game.id;
        });
    });

  const stats: Stats[] = await Promise.all(
    gameIds.map(async (gameId: string) => {
      // console.log('gameId: ', gameId);
      const currentTime = dayjs.utc().subtract(3, 'hours').toISOString();
      // console.log('currentTime: ', currentTime);

      const data:
        | Stats
        | {
            state: 'Error';
            status: number;
            gameId?: string;
            matchId?: string;
            startTime: string;
          } = await fetchStatsWithRetries({
        gameId: gameId,
        event: event,
        matchId: event.match.id,
        startTime: currentTime,
      });
      // console.log('data: ', data);
      return data;
    })
  );
  // console.log('stats: ', stats);
  return stats;
}
