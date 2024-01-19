import Image from 'next/image';

import { redirect } from 'next/navigation';
import { requestParams } from '@/utils/constants/requestParams';
import { Event } from '@/utils/types/types';
import EventPredictionModule from '@/app/(pages)/match/[matchId]/_components/EventPredictionModule';
import { getPrediction } from '@/utils/functions/getPrediction';
import PostEventModule from '@/app/(pages)/match/[matchId]/_components/PostEventModule';
import { getPostEventStats } from '@/utils/functions/getPostEventStats';
import Head from 'next/head';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AL Grounds | Match',
  description:
    'Your all-in-one League of Legends Arabian League companion. Teams, Schedule, Standings, Leaderboards, Rewards, and more!',
};

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
    <main className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative'>
      <div className='h-screen pt-16'>
        {/*  @ts-ignore Async Server Component */}
        <PostEventModule
          event={currentEvent}
          currentPrediction={currentEventPrediction}
          postEventStats={postEventStats}
        />
      </div>
    </main>
  );
}
