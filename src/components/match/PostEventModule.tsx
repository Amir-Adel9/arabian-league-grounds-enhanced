import { Prediction } from '@/db/schema';
import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/types/types';

const PostEventModule = async ({
  event,
  currentPrediction,
}: {
  event: Event;
  currentPrediction: {
    status: 'lockedIn' | 'notLockedIn' | 'notLoggedIn';
    prediction: Prediction;
  };
}) => {
  const eventGameIds = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=en-US&id=${event.match.id}`,
    requestParams
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data.event.match.games.map((game: any) => {
        return game.id;
      });
    });
  console.log(eventGameIds);
  const postEventStats = eventGameIds.map(async (gameId: string) => {
    await fetch(
      `https://feed.lolesports.com/livestats/v1/window/${gameId}?startingTime=${event.startTime}`,
      requestParams
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  });
  return <div>PostEventModule</div>;
};

export default PostEventModule;
