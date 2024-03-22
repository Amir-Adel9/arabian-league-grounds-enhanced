'use client';
import Image from 'next/image';

import { Event, Team } from '@/utils/types/types';
import { Prediction } from '@/db/types';
import { use, useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/utils';
import EventSkeleton from './EventSkeleton';
import PredictButton from './PredictButton';
import { SignedOut, SignInButton, SignedIn } from '@clerk/nextjs';

let count = 0;
const UnstartedEvent = ({
  event,
  startTime,
  teams,
  user,
}: {
  event: Event;
  startTime: {
    hour: string;
    minute: string;
  };
  teams: {
    firstTeam: Team;
    secondTeam: Team;
  };
  user: {
    id: string | undefined;
    name: string | undefined | null;
  };
}) => {
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

  useEffect(() => {
    if (currentPrediction?.status === 'lockedIn') {
      setIsLockedIn(true);
    }
  }, [currentPrediction]);

  return (
    <>
      {isLoading ? (
        <EventSkeleton />
      ) : (
        <div className='relative flex justify-between items-center w-full h-[120px] bg-card text-primary px-6 py-4 font-geist rounded-xl duration-300'>
          <div
            className={`relative duration-300 z-20 ${
              isPredicting && 'opacity-0'
            }`}
          >
            <span className='text-xl sm:text-3xl'>{startTime.hour}</span>
            <span className='absolute text-xs sm:text-sm top-1 ml-1'>
              {startTime.minute}
            </span>
            <h4 className='text-sm font-mono text-accent-gold font-bold'>
              APPROX
            </h4>
          </div>
          <div
            onClick={() => {
              if (!isPredicting) {
                return;
              } else {
                setSelectedTeam(teams.firstTeam);
              }
            }}
            className={`absolute w-[40%] lg:w-1/2 left-0 h-full flex justify-center items-center overflow-hidden duration-700  group z-10 ${
              !isPredicting &&
              currentPrediction?.status !== 'lockedIn' &&
              !isLockedIn
                ? 'opacity-0'
                : 'cursor-pointer'
            } `}
          >
            <div
              className={`absolute w-full opacity-0 h-full bg-gradient-to-r from-destructive duration-700 rounded-xl group-hover:opacity-100 ${
                selectedTeam === teams.firstTeam ||
                (currentPrediction?.prediction.winningTeamId ===
                  teams.firstTeam.code &&
                  !isPredicting)
                  ? 'opacity-100'
                  : ''
              }`}
            ></div>
            <Image
              src={`${
                teams.firstTeam.code === 'TBD'
                  ? 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fassets.lolesports.com%2Fwatch%2Fteam-tbd.png'
                  : teams.firstTeam.image
              }`}
              alt={teams.firstTeam.name + ' logo'}
              width={384}
              height={384}
              className='w-96 h-96 grayscale opacity-10 absolute'
              draggable={false}
            />
          </div>
          <div
            onClick={() => {
              if (!isPredicting) {
                return;
              } else {
                setSelectedTeam(teams.secondTeam);
              }
            }}
            className={`absolute w-[40%] lg:w-1/2 right-0 h-full flex justify-center items-center overflow-hidden duration-700 group z-10 ${
              !isPredicting &&
              currentPrediction?.status !== 'lockedIn' &&
              !isLockedIn
                ? 'opacity-0'
                : 'cursor-pointer'
            }`}
          >
            <div
              className={`absolute w-full opacity-0 h-full bg-gradient-to-l from-accent-blue duration-700 rounded-xl group-hover:opacity-100 ${
                selectedTeam === teams.secondTeam ||
                (currentPrediction?.prediction.winningTeamId ===
                  teams.secondTeam.code &&
                  !isPredicting)
                  ? 'opacity-100'
                  : ''
              }`}
            ></div>
            <Image
              src={teams.secondTeam.image}
              alt={teams.secondTeam.name}
              width={384}
              height={384}
              className='w-96 h-96 grayscale opacity-10'
              draggable={false}
            />
          </div>
          <div className='h-full flex justify-center flex-grow items-center flex-col lg:flex-row gap-1 lg:gap-0'>
            <div
              className={`relative h-full flex flex-row lg:flex-row-reverse w-24 lg:w-1/3 items-center justify-between lg:justify-start space-x-1 lg:gap-4 ${
                selectedTeam === teams.firstTeam ||
                (currentPrediction?.prediction.winningTeamId ===
                  teams.firstTeam.code &&
                  !isPredicting)
                  ? 'z-20'
                  : ''
              }`}
            >
              <Image
                src={teams.firstTeam.image}
                alt={teams.firstTeam.name}
                width={80}
                height={80}
                className='w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20  '
                draggable={false}
              />
              <div className='flex flex-col lg:items-end flex-grow lg:flex-grow-0'>
                <div className='flex items-center justify-between lg:justify-normal'>
                  <h3 className='hidden lg:inline text-end '>
                    {teams.firstTeam.name}
                  </h3>
                  <h3
                    onClick={() => setSelectedTeam(teams.firstTeam)}
                    className={`inline lg:hidden font-semibold lg:font-normal ${
                      isPredicting && 'cursor-pointer'
                    } ${
                      selectedTeam === teams.firstTeam && 'text-accent-gold'
                    }`}
                  >
                    {teams.firstTeam.code}
                  </h3>
                </div>
              </div>
            </div>
            <div
              className={`h-[90px] hidden lg:flex lg:flex-col lg:items-center ${
                teams.firstTeam.name === 'TBD' ||
                teams.secondTeam.name === 'TBD'
                  ? 'lg:justify-center'
                  : 'lg:justify-end'
              }  lg:gap-2 lg:px-8 xl:px-14`}
            >
              <h3 className='font-bold'>VS</h3>
              <SignedOut>
                <SignInButton
                  afterSignInUrl='/schedule'
                  afterSignUpUrl='/schedule'
                  redirectUrl='/schedule'
                >
                  <button
                    className={`w-28 h-8 bg-accent-gold text-primary py-1 px-2 rounded font-rubik z-10 duration-300 hover:filter hover:opacity-90 text-sm font-medium`}
                  >
                    Predict
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <PredictButton
                  color='bg-accent-gold'
                  event={event}
                  teams={teams}
                  isPredicting={isPredicting}
                  setIsPredicting={setIsPredicting}
                  selectedTeam={selectedTeam}
                  setSelectedTeam={setSelectedTeam}
                  currentPrediction={currentPrediction}
                  isLockedIn={isLockedIn}
                  setIsLockedIn={setIsLockedIn}
                  user={user}
                />
              </SignedIn>
            </div>
            <div
              className={`flex flex-row lg:flex-row w-24 lg:w-1/3 items-center justify-between lg:justify-start space-x-1 lg:space-x-4 ${
                selectedTeam === teams.secondTeam ||
                (currentPrediction?.prediction.winningTeamId ===
                  teams.secondTeam.code &&
                  !isPredicting)
                  ? 'z-20'
                  : ''
              }`}
            >
              <Image
                src={`${
                  teams.secondTeam.code === 'TBD'
                    ? 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fassets.lolesports.com%2Fwatch%2Fteam-tbd.png'
                    : teams.secondTeam.image
                }`}
                alt={teams.secondTeam.name}
                width={80}
                height={80}
                className='w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20 '
                draggable={false}
              />
              <div className='flex flex-col lg:items-start flex-grow lg:flex-grow-0 '>
                <div className='flex items-center justify-between lg:justify-normal '>
                  <h3 className='hidden lg:inline '>{teams.secondTeam.name}</h3>
                  <h3
                    onClick={() => setSelectedTeam(teams.secondTeam)}
                    className={`inline lg:hidden font-semibold lg:font-normal ${
                      isPredicting && 'cursor-pointer'
                    } ${
                      selectedTeam === teams.secondTeam && 'text-accent-gold'
                    }`}
                  >
                    {teams.secondTeam.code}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex font-bold flex-col relative duration-300 z-20 ${
              isPredicting ? 'lg:opacity-0' : ''
            }`}
          >
            <span className='hidden lg:inline'>{event.league.name}</span>
            <span className=' hidden lg:inline'>{`Best of ${event.match.strategy.count}`}</span>
            <div className='inline lg:hidden'>
              <SignedOut>
                <SignInButton
                  afterSignInUrl='/schedule'
                  afterSignUpUrl='/schedule'
                  redirectUrl='/schedule'
                >
                  <button
                    className={`w-28 h-8 bg-accent-gold text-primary py-1 px-2 rounded font-rubik z-10 duration-300 hover:filter hover:opacity-90 text-sm font-medium`}
                  >
                    Predict
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <PredictButton
                  color='bg-accent-gold'
                  event={event}
                  teams={teams}
                  isPredicting={isPredicting}
                  setIsPredicting={setIsPredicting}
                  selectedTeam={selectedTeam}
                  setSelectedTeam={setSelectedTeam}
                  currentPrediction={currentPrediction}
                  isLockedIn={isLockedIn}
                  setIsLockedIn={setIsLockedIn}
                  user={user}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UnstartedEvent;
