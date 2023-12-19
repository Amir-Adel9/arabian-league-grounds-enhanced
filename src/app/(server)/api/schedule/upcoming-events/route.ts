import { NextRequest, NextResponse } from 'next/server';

import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/types/types';
import { revalidatePath } from 'next/cache';

export const runtime =
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT' ? 'edge' : 'nodejs';

export async function GET(_request: NextRequest) {
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
  revalidatePath(_request.url);
  revalidatePath(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_DEV_URL
    }/api/schedule/upcoming-events`
  );
  revalidatePath(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_DEV_URL
    }`
  );
  return NextResponse.json(upcomingEvents);
}
