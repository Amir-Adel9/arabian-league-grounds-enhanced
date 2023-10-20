import { NextRequest, NextResponse } from 'next/server';

import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/constants/types';
import { revalidatePath } from 'next/cache';

export const runtime =
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT' ? 'edge' : 'nodejs';

export async function GET(_request: NextRequest) {
  const upcomingEvents: Promise<Event[]> = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    { ...requestParams, cache: 'no-store' }
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data.schedule.events
        .filter(
          (event: Event) =>
            event.state === 'unstarted' || event.state === 'inProgress'
        )
        .slice(0, 8);
    });
  revalidatePath(_request.url);
  revalidatePath(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? 'https://arabian-league-grounds-enhanced.vercel.app/'
        : 'http://localhost:3002/'
    }api/schedule/upcoming-events`
  );
  revalidatePath(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? 'https://arabian-league-grounds-enhanced.vercel.app/'
        : 'http://localhost:3002/'
    }`
  );
  return NextResponse.json(upcomingEvents);
}
