'use client';
import Image from 'next/image';

import { useState } from 'react';

import { Event, Team } from '@/utils/types/types';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import LockInButton from './LockInButton';
import { Prediction } from '@/db/schema';
import CloseModalBtn from '../../../../../../components/modals/CloseModalBtn';

dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

const EventPredictionModule = ({
  event,
  currentPrediction,
}: {
  event: Event;
  currentPrediction: {
    status: 'lockedIn' | 'notLockedIn' | 'notLoggedIn';
    prediction: Prediction;
  };
}) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>();
  const [isLockedIn, setIsLockedIn] = useState(false);

  const eventDate = dayjs.utc(event.startTime);
  const startingHour = dayjs(eventDate).format('HH:mm');
  const matchDate = new Date(event.startTime).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <CloseModalBtn />
      <div className='absolute w-[70%] h-[70%] border-2 border-primary flex flex-col justify-between rounded-lg shadow-xl'>
        <div className='absolute w-full h-full bg-secondary opacity-80 z-[10] top-0 left-0 rounded-lg'></div>
        <Image
          src='/images/background.jpg'
          alt='Background Image'
          className='w-full h-full z-[5] rounded-lg'
          layout='fill'
          draggable={false}
          objectFit='cover'
          objectPosition='center'
        />
        <div className='w-full h-full relative flex flex-col lg:flex-row text-primary z-50 '>
          <div
            onClick={() => {
              if (currentPrediction.status === 'lockedIn') {
              } else {
                setSelectedTeam(event.match.teams[0]);
              }
            }}
            className={`w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center items-center ${
              selectedTeam === event.match.teams[0] ||
              currentPrediction.prediction.winningTeamId ===
                event.match.teams[0].code
                ? 'bg-accent-blue opacity-80'
                : ''
            } hover:bg-accent-blue hover:opacity-80 duration-500 cursor-pointer rounded`}
          >
            <div className='relative w-20 h-20 md:w-40 md:h-40 '>
              <Image
                src={event.match.teams[0].image}
                alt={event.match.teams[0].name}
                className={
                  event.match.teams[0].code === 'TBD' ? 'opacity-50 invert' : ''
                }
                fill
                draggable={false}
              />
            </div>
            <h1 className='text-2xl mt-4 text-center'>
              {event.match.teams[0].name}
            </h1>
          </div>
          <div
            onClick={() => {
              if (currentPrediction.status === 'lockedIn') {
                return;
              } else {
                setSelectedTeam(event.match.teams[1]);
              }
            }}
            className={`w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center items-center ${
              selectedTeam === event.match.teams[1] ||
              currentPrediction.prediction.winningTeamId ===
                event.match.teams[1].code
                ? 'bg-accent-gold opacity-80'
                : ''
            } hover:bg-accent-gold hover:opacity-80 duration-500 cursor-pointer rounded`}
          >
            <div className='relative w-20 h-20 md:w-40 md:h-40 '>
              <Image
                src={event.match.teams[1].image}
                alt={event.match.teams[1].name}
                className={
                  event.match.teams[1].code === 'TBD' ? 'opacity-50 invert' : ''
                }
                fill
                draggable={false}
              />
            </div>
            <h1 className='text-2xl mt-4 text-center'>
              {event.match.teams[1].name}
            </h1>
          </div>
          <div className='absolute flex-col h-1/2 w-96 left-[calc(50%-12rem)] top-[calc(50%-17.5%)] items-center hidden lg:flex z-50'>
            <div className='absolute top-0 text-xl font-bold w-full text-center'>
              {matchDate}
              <h1>{startingHour}</h1>
            </div>
            <span className='absolute bottom-1/2 text-3xl font-bold '>VS.</span>
            <LockInButton
              event={event}
              selectedTeam={selectedTeam}
              currentPrediction={currentPrediction}
              islockedIn={isLockedIn}
              setIsLockedIn={setIsLockedIn}
            />
          </div>
          <div className='absolute flex-col  h-8 top-[calc(50%-0.75rem)] md:h-10 md:top-[calc(50%-1.25rem)] w-full items-center justify-center flex lg:hidden z-50'>
            <LockInButton
              event={event}
              selectedTeam={selectedTeam}
              currentPrediction={currentPrediction}
              islockedIn={isLockedIn}
              setIsLockedIn={setIsLockedIn}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPredictionModule;
