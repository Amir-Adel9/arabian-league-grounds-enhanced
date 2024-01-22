import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/types/types';

export async function getCompletedEventsInSplit(): Promise<Event[]> {
  return await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    { ...requestParams, cache: 'no-cache' }
  )
    .then((res) => res.json())
    .then((res) => res.data.schedule.events)
    .then((events) =>
      events.filter(
        (event: Event) =>
          event.state === 'completed' &&
          event.type === 'match' &&
          new Date(event.startTime) > new Date('2024-01-19T20:16:44.000Z')
      )
    );
}

export async function getCompletedEventsSincePicked({
  pickedAt,
}: {
  pickedAt: Date;
}): Promise<Event[]> {
  return await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    { ...requestParams, cache: 'no-cache' }
  )
    .then((res) => res.json())
    .then((res) => res.data.schedule.events)
    .then((events) =>
      events.filter(
        (event: Event) =>
          event.state === 'completed' &&
          event.type === 'match' &&
          new Date(event.startTime) > pickedAt
      )
    );
}
