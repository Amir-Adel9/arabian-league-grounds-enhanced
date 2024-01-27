import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/db';
import { prediction } from '@/db/schema/schema';
import { Prediction } from '@/db/types';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Prediction;

  const {
    userClerkId,
    username,
    matchId,
    winningTeamId,
    losingTeamId,
    bestOf,
    winningTeamScore,
    losingTeamScore,
  } = body;

  if (
    !userClerkId ||
    !username ||
    !matchId ||
    !winningTeamId ||
    !losingTeamId
  ) {
    throw new Error('Missing parameters');
  }

  const existingPrediction = await db
    .select()
    .from(prediction)
    .where(
      and(
        eq(prediction.matchId, matchId),
        eq(prediction.userClerkId, userClerkId)
      )
    );

  if (existingPrediction.length > 0) {
    throw new Error('Prediction already exists');
  } else {
    await db.insert(prediction).values({
      userClerkId,
      username,
      matchId,
      winningTeamId,
      losingTeamId,
      bestOf,
      winningTeamScore,
      losingTeamScore,
    });

    revalidatePath(`/match/${matchId}`);
    revalidatePath('/match/[matchId]');
    revalidatePath('/leaderboard/predictions');
    revalidatePath('/leaderboard/fantasy');
    revalidatePath('/');

    return NextResponse.json({ state: 'success' });
  }
}
