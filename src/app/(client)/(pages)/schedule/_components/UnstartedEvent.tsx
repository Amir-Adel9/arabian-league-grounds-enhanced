'use client';
import Image from 'next/image';

import { Event, Team } from '@/utils/types/types';
import { Prediction, prediction } from '@/db/schema';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/utils';
import toast from 'react-hot-toast';
import EventSkeleton from './EventSkeleton';

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
              if (currentPrediction?.status === 'lockedIn' || !isPredicting) {
                return;
              } else {
                setSelectedTeam(teams.firstTeam);
              }
            }}
            className={`absolute w-24 lg:w-1/2 left-0 h-full flex justify-center items-center overflow-hidden duration-700  group z-10 ${
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
                currentPrediction?.prediction.winningTeamId ===
                  teams.firstTeam.code
                  ? 'opacity-100'
                  : ''
              }`}
            ></div>
            <Image
              src={teams.firstTeam.image}
              alt={teams.firstTeam.name}
              width={384}
              height={384}
              className='w-96 h-96 grayscale opacity-10 absolute'
              draggable={false}
            />
          </div>
          <div
            onClick={() => {
              if (currentPrediction?.status === 'lockedIn' || !isPredicting) {
                return;
              } else {
                setSelectedTeam(teams.secondTeam);
              }
            }}
            className={`absolute w-24 lg:w-1/2 right-0 h-full flex justify-center items-center overflow-hidden duration-700 group z-10 ${
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
                currentPrediction?.prediction.winningTeamId ===
                  teams.secondTeam.code
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
                currentPrediction?.prediction.winningTeamId ===
                  teams.firstTeam.code ||
                isLockedIn
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
                  <h3 className='inline lg:hidden font-semibold lg:font-normal '>
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
              <button
                onClick={async () => {
                  count++;
                  setIsPredicting(true);
                  if (
                    currentPrediction?.status === 'notLoggedIn' &&
                    selectedTeam
                  ) {
                    toast.error('Please sign in to predict!');
                    throw new Error('Not logged in!');
                  } else {
                    if (
                      currentPrediction?.status === 'lockedIn' ||
                      isLockedIn
                    ) {
                      return toast.error('You have already locked in!');
                    } else if (!selectedTeam) {
                      isPredicting && toast.error('Please select a team');
                      throw new Error('No team selected!');
                    } else if (
                      event.state === 'completeds' ||
                      event.state === 'inProgresss'
                    ) {
                      toast.error('This match has already been played.');
                      throw new Error('Match has already been played.');
                    } else if (
                      event.match.teams[0].code === 'TBD' ||
                      event.match.teams[1].code === 'TBD'
                    ) {
                      toast.error('Teams for this match are to be decided.');
                      throw new Error('Teams for match have not been decided.');
                    } else {
                      setIsLockedIn(true);
                      fetch('/api/match/prediction/lock-in', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          userClerkId: user.id,
                          username: user.name,
                          matchId: event.match.id,
                          winningTeamId: selectedTeam.code,
                          losingTeamId: event.match.teams.find((team: Team) => {
                            return team.code !== selectedTeam.code;
                          })?.code,
                          bestOf: event.match.strategy.count,
                        } as Prediction),
                      });
                    }
                  }
                  toast.success('Prediction Locked In!');
                  setIsPredicting(false);
                }}
                className={`w-28 bg-accent-gold text-primary py-1 px-2 rounded font-rubik z-10 duration-300 hover:bg-[#a08b47]`}
                hidden={
                  teams.firstTeam.name === 'TBD' ||
                  teams.secondTeam.name === 'TBD'
                }
              >
                {currentPrediction?.status === 'lockedIn' || isLockedIn
                  ? 'Locked in'
                  : selectedTeam
                  ? 'Lock in'
                  : isPredicting
                  ? 'Pick a team'
                  : 'Predict'}
              </button>
            </div>
            <div
              className={`flex flex-row lg:flex-row w-24 lg:w-1/3 items-center justify-between lg:justify-start space-x-1 lg:space-x-4 ${
                selectedTeam === teams.secondTeam ||
                currentPrediction?.prediction.winningTeamId ===
                  teams.secondTeam.code ||
                isLockedIn
                  ? 'z-20'
                  : ''
              }`}
            >
              <Image
                src={teams.secondTeam.image}
                alt={teams.secondTeam.name}
                width={80}
                height={80}
                className='w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20 '
                draggable={false}
              />
              <div className='flex flex-col lg:items-start flex-grow lg:flex-grow-0 '>
                <div className='flex items-center justify-between lg:justify-normal '>
                  <h3 className='hidden lg:inline '>{teams.secondTeam.name}</h3>
                  <h3 className='inline lg:hidden font-semibold lg:font-normal '>
                    {teams.secondTeam.code}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`font-bold flex-col hidden xs:flex relative duration-300 z-20 ${
              isPredicting ? 'opacity-0' : ''
            }`}
          >
            <span> {event.league.name} </span>
            <span className=' hidden lg:inline'>{`Best of ${event.match.strategy.count}`}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default UnstartedEvent;
