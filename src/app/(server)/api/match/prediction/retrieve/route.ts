import { getPrediction } from '@/utils/functions/getPrediction';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const matchId = searchParams.get('matchId') as string;
  const prediction = await getPrediction({ matchId });

  // revalidatePath(`/match/${matchId}`);
  // revalidatePath(`/leaderboard`);
  // revalidatePath(`/`);

  return NextResponse.json(prediction);
}
