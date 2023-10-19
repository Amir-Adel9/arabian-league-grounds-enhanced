import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/constants/types';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  const fullSchedule: Promise<Event[]> = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    requestParams
  )
    .then((res) => res.json())
    .then((matches) => {
      return matches.data.schedule.events;
    });

  revalidatePath(_request.url);
  revalidatePath('/api/full-schedule');
  revalidatePath('/schedule');
  return NextResponse.json(fullSchedule);
}
