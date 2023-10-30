import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/types/types';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const runtime =
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT' ? 'edge' : 'nodejs';

export async function GET(_request: NextRequest) {
  const fullSchedule: Promise<Event[]> = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    { ...requestParams, next: { revalidate: 60 } }
  )
    .then((res) => res.json())
    .then((matches) => {
      return matches.data.schedule.events;
    });

  revalidatePath(_request.url);
  revalidatePath(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? 'https://arabian-league-grounds-enhanced.vercel.app/'
        : 'http://localhost:3002/'
    }api/schedule/full-schedule`
  );
  revalidatePath(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? 'https://arabian-league-grounds-enhanced.vercel.app/'
        : 'http://localhost:3002/'
    }schedule`
  );

  return NextResponse.json(fullSchedule);
}
