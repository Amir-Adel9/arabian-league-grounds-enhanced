'use server';
import { getCompletedEventsInSplit } from '@/data-access/data-access';
import { Redis } from '@upstash/redis';
import { fulfillPredictions } from './prediction/actions/fulfillPredictions';
import { calculateFantasyPoints } from './fantasy/fantasy.actions';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function fulfillUpdates() {
  const completedEvents = await getCompletedEventsInSplit();
  const storedMatchId = await redis.get('lastMatchId');
  const timesExecuted = await redis.get('timesExecuted');
  await redis.set('timesExecuted', Number(timesExecuted) + 1);
  if (completedEvents.length < 1) return;

  const lastCompletedEventMatchId =
    completedEvents[completedEvents.length - 1].match.id;

  if (storedMatchId === lastCompletedEventMatchId) {
    console.log('no updates');
    return;
  } else {
    await redis.set('lastMatchId', lastCompletedEventMatchId);
    await fulfillPredictions();
    await calculateFantasyPoints();
    console.log('fulfillUpdates', lastCompletedEventMatchId, storedMatchId);
  }
}
