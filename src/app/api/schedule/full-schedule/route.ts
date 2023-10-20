import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/constants/types';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(_request: NextRequest) {
  const fullSchedule: Promise<Event[]> = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    { ...requestParams, cache: 'no-store' }
  )
    .then((res) => res.json())
    .then((matches) => {
      return matches.data.schedule.events;
    });

  // revalidatePath(_request.url);
  // revalidatePath(
  //   `${
  //     process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
  //       ? 'https://arabian-league-grounds-enhanced.vercel.app/'
  //       : 'http://localhost:3002/'
  //   }api/schedule/full-schedule`
  // );
  revalidatePath(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? 'https://arabian-league-grounds-enhanced.vercel.app/'
        : 'http://localhost:3002/'
    }schedule`
  );

  return NextResponse.json(fullSchedule);
}
