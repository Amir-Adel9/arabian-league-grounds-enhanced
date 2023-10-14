import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/constants/types';
import { NextResponse } from 'next/server';

export async function GET() {
  const fullSchedule: Promise<Event[]> = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    requestParams
  )
    .then((res) => res.json())
    .then((matches) => {
      return matches.data.schedule.events;
    });
  return NextResponse.json(fullSchedule);
}
