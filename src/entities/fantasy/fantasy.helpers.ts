import { Player } from '@/db/types';
import { getPostEventStats } from '@/utils/functions/getPostEventStats';
import { Event } from '@/utils/types/types';
import dayjs from 'dayjs';

export function checkWeekDay() {
  const today = dayjs();
  return today.day() === 0 || today.day() === 6 || today.day() === 1;
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
