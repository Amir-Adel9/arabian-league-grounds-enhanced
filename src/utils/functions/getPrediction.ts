import { db } from '@/db';
import { Prediction, prediction } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
import { eq, and } from 'drizzle-orm';

export async function getPrediction({ matchId }: { matchId: string }): Promise<{
  status: 'lockedIn' | 'notLockedIn' | 'notLoggedIn';
  prediction: Prediction;
}> {
  const loggedInUser = await currentUser();
  if (loggedInUser) {
    const currentPrediction = await db
      .select()
      .from(prediction)
      .where(
        and(
          eq(prediction.matchId, matchId),
          eq(prediction.userClerkId, loggedInUser.id)
        )
      );
    if (currentPrediction.length > 0) {
      return {
        status: 'lockedIn',
        prediction: currentPrediction[0],
      };
    } else {
      return {
        status: 'notLockedIn',
        prediction: [
          {
            matchId: matchId,
            userClerkId: loggedInUser.id,
            winningTeamId: '',
          } as Prediction,
        ][0],
      };
    }
  } else {
    return {
      status: 'notLoggedIn',
      prediction: [
        {
          matchId: matchId,
          winningTeamId: '',
        } as Prediction,
      ][0],
    };
  }
}
