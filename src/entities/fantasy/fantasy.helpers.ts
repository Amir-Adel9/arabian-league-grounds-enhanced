import { Player } from '@/db/types';
import { getPostEventStats } from '@/utils/functions/getPostEventStats';
import { Event } from '@/utils/types/types';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);
dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

export function areTeamsEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((value, index) => value === arr2[index]);
}

export function isLockInLocked() {
  const today = dayjs().tz('Africa/Cairo');
  return (
    (today.day() === 4 && today.hour() >= 19 && today.minute() >= 45) ||
    (today.day() === 5 && today.hour() > 19 && today.minute() > 45)
  );
}

export function filterEventsWithFantasyPlayer({
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

export async function getStatsForEventsWithFantasyPlayers({
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
