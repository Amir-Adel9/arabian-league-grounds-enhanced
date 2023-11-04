import { requestParams } from '../constants/requestParams';
import { Event, Game, GameFrame, Stats } from '../types/types';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

dayjs.extend(utcPlugin);

async function fetchStatsWithRetries(gameId: string, startTime: string) {
  const maxRetries = 6;
  let retryCount = 0;

  async function fetchStatsInternal(
    gameId: string,
    startTime: string
  ): Promise<Stats> {
    const res = await fetch(
      `https://feed.lolesports.com/livestats/v1/window/${gameId}?startingTime=${startTime}`,
      requestParams
    );
    // console.log('status: ', res.status);
    // console.log(
    //   'gameId: ',
    //   gameId,
    //   ' startTime: ',
    //   startTime,
    //   ' status: ',
    //   res.status
    // );
    if (res.status !== 200 && retryCount < maxRetries) {
      retryCount++;
      const newStartTime = dayjs.utc(startTime).add(1, 'hour').toISOString();
      return fetchStatsInternal(gameId, newStartTime);
    } else {
      retryCount = 0;
      const data = await res.json();
      console.log('data: ', data);
      const lastFrame: GameFrame = data.frames[data.frames.length - 1];
      if (lastFrame.gameState !== 'finished') {
        const newStartTime = dayjs
          .utc(startTime)
          .add(30, 'minute')
          .toISOString();
        return fetchStatsInternal(gameId, newStartTime);
      } else {
        console.log('lastFrame: ', data.frames[data.frames.length - 1]);
        return {
          esportsGameId: data.esportsGameId,
          esportsMatchId: data.esportsMatchId,
          gameMetadata: data.gameMetadata,
          lastFrame: data.frames[data.frames.length - 1],
        };
      }
    }
  }

  return fetchStatsInternal(gameId, startTime);
}

export async function getPostEventStats({ event }: { event: Event }) {
  if (event.state !== 'completed') {
    return 'Event has not concluded yet';
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
      const data: Stats = await fetchStatsWithRetries(gameId, event.startTime);
      return data;
    })
  );

  return stats;
}
