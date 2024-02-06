import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/types/types';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const runtime =
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT' ? 'edge' : 'nodejs';

export async function GET(_request: NextRequest) {
  const fullSchedule: Promise<Event[]> = await fetch(
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

  revalidatePath(_request.url);
  revalidatePath(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_DEV_URL
    }/api/schedule/full-schedule`
  );
  revalidatePath(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_DEV_URL
    }schedule`
  );

  return NextResponse.json(fullSchedule);
}
