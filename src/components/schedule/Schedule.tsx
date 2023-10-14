'use client';

import { useEffect, useRef, useState } from 'react';

import { Event, GameDay } from '@/utils/constants/types';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import CompletedMatch from './CompletedMatch';

dayjs.extend(utcPlugin);
dayjs.extend(timezone);

const Schedule = ({ gameDays }: { gameDays: GameDay[] }) => {
  const lastCompletedMatchRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const scrollToLastCompletedMatch = () => {
      if (lastCompletedMatchRef.current) {
        const topOffset = lastCompletedMatchRef.current.offsetTop;
        window.scrollTo({ top: topOffset - 100, behavior: 'smooth' });
      }
    };

    scrollToLastCompletedMatch();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', function () {
      setWindowWidth(window.innerWidth);
    });

    return () =>
      window.removeEventListener('resize', function () {
        setWindowWidth(window.innerWidth);
      });
  }, [windowWidth]);

  const gameDaysWithCompletedMatchesCount = gameDays.filter(
    (gameDay: GameDay) =>
      gameDay.events.some((event: Event) => event.state === 'completed')
  ).length;

  return (
    <div className='mt-28 bg-primary '>
      <div className='bg-secondary rounded-lg w-full text-accent-gold p-3 mb-3'>
        Filter
      </div>
      <div className='overflow-y-auto no-scrollbar w-full h-[70vh] '>
        {gameDays.map((gameDay: GameDay, index: number) => {
          const { date, events } = gameDay;
          return (
            <div
              className='relative mb-7 flex flex-col items-center justify-center space-y-4 w-full text-secondary p-4'
              key={date}
              ref={
                index === gameDaysWithCompletedMatchesCount - 1
                  ? lastCompletedMatchRef
                  : null
              }
            >
              <h1 className='absolute -top-2 left-5 text-xl sm:text-2xl font-bold text-center  '>
                {date}
              </h1>
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
                      key={event.match.id}
                      startTime={eventStartTime}
                      windowWidth={windowWidth}
                    />
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
