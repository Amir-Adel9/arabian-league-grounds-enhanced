'use server';

import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/types/types';
import { revalidatePath } from 'next/cache';

export async function getFullSchedule(): Promise<Event[]> {
  const fullSchedule = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    { ...requestParams, cache: 'no-cache' }
  )
    .then((res) => res.json())
    .then((matches) => {
      return matches.data.schedule.events;
    })
    .then((events) =>
      events.filter(
        (event: Event) =>
          event.type === 'match' &&
          new Date(event.startTime) > new Date('2024-01-11T20:16:44.000Z')
      )
    );

  revalidatePath('/', 'layout');

  return fullSchedule;
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const upcomingEvents: Promise<Event[]> = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    { ...requestParams, next: { revalidate: 60 } }
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data.schedule.events
        .filter(
          (event: Event) =>
            (event.state === 'unstarted' || event.state === 'inProgress') &&
            event.type === 'match'
        )
        .slice(0, 8);
    });

  revalidatePath('/', 'layout');

  return upcomingEvents;
}
