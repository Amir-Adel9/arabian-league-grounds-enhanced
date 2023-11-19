'use client';

import { useEffect, useRef } from 'react';

import { Event, GameDay } from '@/utils/types/types';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import CompletedMatch from './CompletedEvent';
import UnstartedEvent from './UnstartedEvent';
import LiveEvent from './LiveEvent';
import { Prediction } from '@/db/schema';
import UpcomingMatchCard from '../home/upcoming-matches/UpcomingMatchCard';
import { useUser } from '@clerk/nextjs';

dayjs.extend(utcPlugin);
dayjs.extend(timezone);

const Schedule = ({
  gameDays,
  predictions,
  events,
}: {
  gameDays: GameDay[];
  predictions: Prediction[];
  events: Event[];
}) => {
  const gameDaysDivRef = useRef<HTMLDivElement>(null);
  const lastGameDayWithCompletedMatchDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToLastCompletedMatch = () => {
      if (lastGameDayWithCompletedMatchDivRef.current) {
        const topOffset = lastGameDayWithCompletedMatchDivRef.current.offsetTop;
        gameDaysDivRef.current!.scrollTo({
          top: topOffset - 100,
          behavior: 'smooth',
        });
      }
    };

    scrollToLastCompletedMatch();
  }, []);
  const { user: loggedInUser } = useUser();

  const gameDaysWithCompletedMatchesCount = gameDays.filter(
    (gameDay: GameDay) =>
      gameDay.events.some((event: Event) => event.state === 'completed')
  ).length;

  return (
    <div
      ref={gameDaysDivRef}
      className='mt-20 mb-16 lg:mb-0 flex flex-col overflow-y-auto overflow-x-hidden w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)]'
    >
      {/* <div className='bg-car rounded-lg w-full p-5  flex m-5 flex-grow overflow-x-auto no-scrollba relative'>
        <div className='flex justify-start items-center w- h-full  '>
          {events
            .filter((event: Event) => event.state === 'unstarted')
            .map((event: Event) => {
              return (
                <div
                  className='flex-shrink-0 bg-accent text-content font-medium rounded cursor-pointer'
                  key={event.match.id}
                >
                  <UpcomingMatchCard event={event} />
                </div>
              );
            })}
        </div>
      </div> */}
      <div className=' w-[90%] lg:w-[75%] h-[100%] pt-5 mx-auto'>
        {gameDays.map((gameDay: GameDay, index: number) => {
          const { date, events } = gameDay;
          return (
            <div
              className=' relative flex flex-col items-start py-3 px-5 border-x border-border justify-center space-y-5 w-full text-secondary'
              key={date}
              ref={
                index === gameDaysWithCompletedMatchesCount - 1
                  ? lastGameDayWithCompletedMatchDivRef
                  : null
              }
            >
              <h2 className=' mb-1 font-inter text-center text-white'>
                {date}
              </h2>
              {events.map((event: Event) => {
                const relativeEventTime = dayjs
                  .utc(event.startTime)
                  .tz(dayjs.tz.guess());

                const eventStartTime = {
                  hour: dayjs(relativeEventTime).format('HH'),
                  minute: dayjs(relativeEventTime).format('mm'),
                };

                if (event.state === 'completed') {
                  return (
                    <CompletedMatch
                      event={event}
                      startTime={eventStartTime}
                      teams={{
                        firstTeam: event.match.teams[0],
                        secondTeam: event.match.teams[1],
                      }}
                      key={event.match.id}
                    />
                  );
                } else if (event.state === 'unstarted') {
                  return (
                    <UnstartedEvent
                      event={event}
                      startTime={eventStartTime}
                      teams={{
                        firstTeam: event.match.teams[0],
                        secondTeam: event.match.teams[1],
                      }}
                      user={{
                        id: loggedInUser?.id,
                        name: loggedInUser?.username,
                      }}
                      key={event.match.id}
                    />
                  );
                } else if (
                  event.state === 'inProgress' &&
                  event.type === 'match'
                ) {
                  return (
                    <LiveEvent
                      event={event}
                      teams={{
                        firstTeam: event.match.teams[0],
                        secondTeam: event.match.teams[1],
                      }}
                      key={event.match.id}
                    />
                  );
                }
              })}
            </div>
          );
        })}
      </div>
      {/* <div className='bg-accent-gold w-[25%] h-full text-secondary p-3'>
        <h2 className='text-xl sm:text-2xl mb-3 font-bold font-inter mt-5'>
          Filter
        </h2>
      </div> */}
    </div>
  );
};

export default Schedule;
