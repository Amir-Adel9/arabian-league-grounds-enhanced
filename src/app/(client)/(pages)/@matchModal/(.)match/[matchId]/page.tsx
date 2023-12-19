import Image from 'next/image';

import Modal from '@/components/modals/Modal';
import { redirect } from 'next/navigation';
import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/types/types';
import EventPredictionModule from '@/app/(client)/(pages)/match/[matchId]/_components/EventPredictionModule';
import { Prediction } from '@/db/schema';
import { getPrediction } from '@/utils/functions/getPrediction';
import PostEventModule from '@/app/(client)/(pages)/match/[matchId]/_components/PostEventModule';
import { getPostEventStats } from '@/utils/functions/getPostEventStats';

export default async function Match({
  params,
}: {
  params: {
    matchId: string;
  };
}) {
  if (!params.matchId || params.matchId.length !== 18) redirect('/');

  const currentEvent: Event = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    requestParams
  )
    .then((res) => res.json())
    .then((data) => {
      return data.data.schedule.events.filter((event: Event) => {
        if (event.type !== 'match') return;
        return event.match.id === params.matchId;
      })[0];
    });

  const currentEventPrediction = await getPrediction({
    matchId: params.matchId,
  });
  const postEventStats = await getPostEventStats({ event: currentEvent });

  return (
    <Modal>
      <main className='relative flex h-screen flex-col items-center justify-center rounded '>
        <div
          style={{ height: '75%' }}
          className='w-full z-[120] relative flex justify-center items-center flex-col lg:flex-row rounded'
        >
          <div className='w-full h-[75vh]'>
            {/*  @ts-ignore Async Server Component */}
            <PostEventModule
              event={currentEvent}
              currentPrediction={currentEventPrediction}
              postEventStats={postEventStats}
            />
          </div>
        </div>
      </main>
    </Modal>
  );
}
