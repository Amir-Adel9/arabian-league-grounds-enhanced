// export const runtime = 'edge';
// export const preferredRegion = ['eu-central-1'];

import { getCompletedEventsInSplit } from '@/data-access/data-access';
import { Redis } from '@upstash/redis';
import { fulfillPredictions } from './prediction/actions/fulfillPredictions';
import { calculateFantasyPoints } from './fantasy/fantasy.actions';
import { updateCreditsForUsers } from './fantasy/fantasy.db';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function fulfillUpdates() {
  const completedEvents = await getCompletedEventsInSplit();

  const storedMatchId = await redis.get('lastMatchId');
  const timesExecuted = await redis.get('timesExecuted');
  const timesCalled = await redis.get('timesExecuted');
  await redis.set('timesCalled', Number(timesCalled) + 1);

  if (completedEvents.length < 1) return;

  const lastCompletedEventMatchId =
    completedEvents[completedEvents.length - 1].match.id;

  if (storedMatchId == lastCompletedEventMatchId) {
    console.log('no updates', lastCompletedEventMatchId, storedMatchId);
    return;
  } else {
    await fulfillPredictions();
    // await calculateFantasyPoints();
    await updateCreditsForUsers();
    await redis.set('lastMatchId', lastCompletedEventMatchId, {
      ex: 120,
    });
    await redis.set('timesExecuted', Number(timesExecuted) + 1);
    console.log('fulfillUpdates', lastCompletedEventMatchId, storedMatchId);
  }
}
