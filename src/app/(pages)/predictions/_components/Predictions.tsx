'use client';

import { Prediction } from '@/db/types';
import { Event } from '@/utils/types/types';
import Image from 'next/image';

import dayjs from 'dayjs';

import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import { getFormattedDate } from '@/utils/functions/getFormattedDate';
import PredictionsFilterButtons from './PredictionsFilterButtons';
import { useState } from 'react';
import PredictionCard from './PredictionCard';
import Link from 'next/link';

dayjs.extend(timezone);
dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

const Predictions = ({
  predictions,
  events,
}: {
  predictions: Prediction[];
  events: Event[];
}) => {
  const [filter, setFilter] = useState('all');

  return (
    <div className='mt-20 mb-16 lg:mb-0 flex flex-col overflow-y-auto overflow-x-hidden w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)]'>
      <div className=' w-[90%] lg:w-[75%] h-[100%] border-x border-border pt-5 mx-auto'>
        <div className=' relative flex flex-col items-center py-3 px-5 border-x border-border justify-center space-y-5 w-full text-secondary'>
          <PredictionsFilterButtons
            predictions={predictions}
            filter={filter}
            setFilter={setFilter}
          />
          {predictions.filter((prediction) => {
            if (filter === 'all') {
              return prediction;
            } else {
              return prediction.state === filter;
            }
          }).length > 0 ? (
            predictions
              .filter((prediction) => {
                if (filter === 'all') {
                  return prediction;
                } else {
                  return prediction.state === filter;
                }
              })
              .map((prediction: Prediction) => {
                const eventForPrediction = events.find(
                  (event: Event) => event.match.id === prediction.matchId
                )!;
                const relativeEventTime = dayjs
                  .utc(eventForPrediction.startTime)
                  .tz(dayjs.tz.guess());

                const eventStartTime = {
                  hour: dayjs(relativeEventTime).format('HH'),
                  minute: dayjs(relativeEventTime).format('mm'),
                  date: getFormattedDate(relativeEventTime),
                };

                return (
                  <PredictionCard
                    prediction={prediction}
                    event={eventForPrediction}
                    startTime={eventStartTime}
                    key={prediction.id}
                  />
                );
              })
          ) : (
            <div className='font-bold  relative w-full flex flex-col gap-4 pt-24 justify-center items-center '>
              <Image
                src='/images/dinger.gif'
                alt='dinger Image'
                width={260}
                height={260}
                draggable={false}
              />
              <p className='text-center text-primary font-inter text-xl'>
                No predictions found. Go to the{' '}
                <Link href='/schedule' className='underline text-accent-gold'>
                  schedule
                </Link>{' '}
                page to make some!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predictions;
