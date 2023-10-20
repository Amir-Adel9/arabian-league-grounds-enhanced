import { requestParams } from '@/utils/constants/requestParams';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// export const runtime = `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? 'https://arabian-league-grounds-enhanced.vercel.app/'
        : 'http://localhost:3002/'
    }api/schedule/upcoming-events`;
// export const cache = 'no-store';

export async function GET(_request: NextRequest) {
  const standings = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=${process.env.NEXT_PUBLIC_TOURNAMENT_ID}`,
    { ...requestParams, cache: 'no-cache' }
  ).then((res) => res.json());

  revalidatePath(_request.url);
  console.log('revalidated path', _request.url);
  revalidatePath('/api/standings');

  return NextResponse.json(standings);
}
