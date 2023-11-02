import Image from 'next/image';

import Modal from '@/components/modal/Modal';
import { redirect } from 'next/navigation';
import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/types/types';
import EventPredictionModule from '@/components/match/EventPredictionModule';
import { Prediction } from '@/db/schema';
import { getPrediction } from '@/utils/functions/getPrediction';
import PostEventModule from '@/components/match/PostEventModule';
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
          {currentEvent.state === 'completed' ? (
            <div className='w-full h-[75vh]'>
              {/*  @ts-ignore Async Server Component */}
              <PostEventModule
                event={currentEvent}
                currentPrediction={currentEventPrediction}
                postEventStats={postEventStats}
              />
            </div>
          ) : (
            <>
              <div className='w-full relative lg:w-1/2 h-full bg-transparent duration-500 rounded-l-lg group flex flex-col items-center p-16 lg:p-32 text-accent-gold '>
                <div className='absolute w-full h-full bg-accent-blue  opacity-90 rounded-l-lg group-hover:bg-accent-blue group-hover:opacity-90 duration-500 z-[-5] top-0 '></div>
                <div className='absolute w-full h-full z-[-10] top-0 rounded-l-lg'>
                  <Image
                    src='/images/rivenbg.jpg'
                    alt=''
                    fill={true}
                    draggable={false}
                    className='rounded-l-lg'
                  />
                </div>
              </div>
              <div className='w-full relative lg:w-1/2 h-full bg-transparent duration-500 rounded-r-lg group flex flex-col items-center p-16 lg:p-32 text-accent-blue'>
                <div className='absolute w-full h-full bg-accent-gold  opacity-90 rounded-r-lg group-hover:bg-accent-gold group-hover:opacity-90 duration-500 z-[-5] top-0'></div>
                <div className='absolute w-full h-full z-[-10] top-0 rounded-r-lg'>
                  <Image
                    src='/images/yasuobg.jpg'
                    alt=''
                    fill={true}
                    draggable={false}
                    className='rounded-r-lg '
                  />
                </div>
              </div>
              <EventPredictionModule
                event={currentEvent}
                currentPrediction={currentEventPrediction}
              />
            </>
          )}
        </div>
      </main>
    </Modal>
  );
}
