'use server';

import { db } from '@/db';
import { prediction, user } from '@/db/schema/schema';
import { User } from '@/db/types';
import { eq, sql } from 'drizzle-orm';
import { requestParams } from '../../../utils/constants/requestParams';
import { Event } from '../../../utils/types/types';
import { revalidatePath } from 'next/cache';

export async function fulfillPredictions() {
  const usersWithCorrectPredictions = await db.query.user.findMany({
    with: {
      predictions: {
        where: eq(prediction.state, 'correct'),
      },
    },
  });

  console.log('Users with correct predictions: ', usersWithCorrectPredictions);

  usersWithCorrectPredictions.forEach(async (correctUser: User) => {
    if (correctUser.predictions.length * 100 === correctUser.predictionPoints) {
      return console.log(
        'Points are already up to date for user: ',
        correctUser.username
      );
    } else {
      await db
        .update(user)
        .set({ predictionPoints: sql`${correctUser.predictions.length * 100}` })
        .where(eq(user.id, correctUser.id));
      console.log(
        `Points updated to ${correctUser.predictions.length * 100} for user: `,
        correctUser.username
      );
    }
  });

  const pendingPredictions = await db
    .select()
    .from(prediction)
    .where(eq(prediction.state, 'unfulfilled'));

  if (pendingPredictions.length === 0) {
    return;
  } else {
    const completedMatches = await fetch(
      `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
      requestParams
    )
      .then((res) => res.json())
      .then((data) => {
        return data.data.schedule.events
          .filter((event: Event) => {
            return event.state === 'completed' && event.type === 'match';
          })
          .filter((event: Event) => {
            return pendingPredictions.some((prediction) => {
              return prediction.matchId === event.match.id;
            });
          });
      });

    if (completedMatches.length === 0) {
      return;
    } else {
      pendingPredictions.forEach(async (currentPrediction) => {
        console.log('Current prediction: ', currentPrediction);
        completedMatches.forEach(async (event: Event) => {
          if (event.match.id !== currentPrediction.matchId) return;
          console.log(event.match.id, currentPrediction.matchId);
          const winningTeamId = currentPrediction.winningTeamId;

          if (event.match.teams[0].code === winningTeamId) {
            if (event.match.teams[0].result.outcome === 'win') {
              await db
                .update(prediction)
                .set({ state: 'correct' })
                .where(eq(prediction.id, currentPrediction.id));
            } else {
              await db
                .update(prediction)
                .set({ state: 'incorrect' })
                .where(eq(prediction.id, currentPrediction.id));
            }
          } else if (event.match.teams[1].code === winningTeamId) {
            if (event.match.teams[1].result.outcome === 'win') {
              await db
                .update(prediction)
                .set({ state: 'correct' })
                .where(eq(prediction.id, currentPrediction.id));
            } else {
              await db
                .update(prediction)
                .set({ state: 'incorrect' })
                .where(eq(prediction.id, currentPrediction.id));
            }
          }
        });
      });
    }
  }

  revalidatePath('/(pages)/leaderboard/predictions');
  revalidatePath('/(pages)/leaderboard/fantasy');
  revalidatePath('/(pages)/predictions');
  revalidatePath('/(pages)/profile');
}
