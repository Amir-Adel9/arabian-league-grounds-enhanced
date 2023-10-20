import { requestParams } from '@/utils/constants/requestParams';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(_request: NextRequest) {
  const standings = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=${process.env.NEXT_PUBLIC_TOURNAMENT_ID}`,
    { ...requestParams, cache: 'no-store' }
  ).then((res) => res.json());

  // revalidatePath(_request.url);
  // console.log('revalidated path', _request.url);
  // revalidatePath('/api/standings');

  return NextResponse.json(standings);
}
