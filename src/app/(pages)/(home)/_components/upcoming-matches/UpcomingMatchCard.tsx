'use client';

import Image from 'next/image';

import UpcomingMatchCardDate from './UpcomingMatchDate';
import Link from 'next/link';

import PredictButton from '@/app/(pages)/schedule/_components/PredictButton';
import { Prediction } from '@/db/types';
import { Event, Team } from '@/utils/types/types';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/utils';

const UpcomingMatchCard = ({
  user,
  event,
}: {
  event: Event;

  user: { id: string | undefined; name: string | undefined | null };
}) => {
  const { match } = event;

  const [isPredicting, setIsPredicting] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>();
  const [isLockedIn, setIsLockedIn] = useState(false);

  const { data: currentPrediction, isLoading } = useSWR<{
    status: 'lockedIn' | 'notLockedIn' | 'notLoggedIn';
    prediction: Prediction;
  }>(
    `${
      process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEVELOPMENT'
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_DEV_URL
    }/api/match/prediction/retrieve?matchId=${event.match.id}`,
    fetcher
  );

  return (
    <div className='relative border border-accent-gold flex min-h-[250px] flex-col items-center justify-center rounded-lg shadow-lg p-4 duration-200 hover:scale-105'>
      <div className='absolute w-full h-full bg-card opacity-95 z-[10] top-0 left-0 rounded-lg '></div>
      <Image
        src='/images/background.jpg'
        alt='Background Image'
        className='w-full h-full z-[5] rounded-lg'
        layout='fill'
        objectFit='cover'
        draggable={false}
        objectPosition='center'
      />
      <div className='grid grid-cols-3 p-2 z-20 w-full h-full'>
        <div
          onClick={() => {
            if (currentPrediction?.status === 'lockedIn' || !isPredicting) {
              return;
            } else {
              setSelectedTeam(match.teams[0]);
            }
          }}
          className='flex flex-col items-center flex-grow justify-between cursor-pointer group'
        >
          <Image
            src={match.teams[0].image}
            alt={match.teams[0].code}
            className={`${
              match.teams[0].code === 'TBD' ? 'opacity-50 invert' : ''
            }`}
            width={80}
            height={80}
            draggable={false}
          />
          <h3
            className={`text-xl font-bold mt-2 text-center ${
              isPredicting && 'group-hover:text-accent-gold duration-200'
            } ${selectedTeam === match.teams[0] && 'text-accent-gold'}`}
          >
            {match.teams[0].code}
          </h3>
        </div>
        <h3 className='text-xl font-bold text-center self-center'>VS</h3>
        <div
          onClick={() => {
            if (currentPrediction?.status === 'lockedIn' || !isPredicting) {
              return;
            } else {
              setSelectedTeam(match.teams[1]);
            }
          }}
          className='flex flex-col items-center flex-grow justify-between cursor-pointer relative group'
        >
          <Image
            src={match.teams[1].image}
            alt={match.teams[1].code}
            className={`${
              match.teams[1].code === 'TBD' ? 'opacity-50 invert' : ''
            }`}
            width={80}
            height={80}
            draggable={false}
          />
          <h3
            className={`text-xl font-bold mt-2 text-center ${
              isPredicting && 'group-hover:text-accent-gold duration-200'
            } ${selectedTeam === match.teams[1] && 'text-accent-gold'}`}
          >
            {match.teams[1].code}
          </h3>
        </div>
        <UpcomingMatchCardDate matchDate={event.startTime} />
        <div className='col-span-full flex items-center justify-center mt-2'>
          <PredictButton
            color='bg-accent-blue'
            currentPrediction={currentPrediction}
            event={event}
            teams={{
              firstTeam: match.teams[0],
              secondTeam: match.teams[1],
            }}
            isLockedIn={isLockedIn}
            isPredicting={isPredicting}
            selectedTeam={selectedTeam}
            setIsLockedIn={setIsLockedIn}
            setIsPredicting={setIsPredicting}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default UpcomingMatchCard;
