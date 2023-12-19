'use client';

import { Prediction } from '@/db/schema';
import CorrectPrediction from './CorrectPrediction';
import IncorrectPrediction from './IncorrectPrediction';
import UnfulfilledPrediction from './UnfulfilledPrediciton';
import { Event } from '@/utils/types/types';

import dayjs from 'dayjs';

import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import { getFormattedDate } from '@/utils/functions/getFormattedDate';
import PredictionsFilterButtons from './PredictionsFilterButtons';
import { useState } from 'react';
import PredictionCard from './PredictionCard';

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
    <div className='mt-20 mb-16 lg:mb-0 flex flex-col w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)]'>
      <PredictionsFilterButtons
        predictions={predictions}
        filter={filter}
        setFilter={setFilter}
      />

      <div className='flex flex-col overflow-y-auto overflow-x-hidden w-full text-primary'>
        <div className=' w-[90%] lg:w-[75%] h-[100%] pt-5 mx-auto'>
          <div className='relative flex flex-col items-center py-3 px-5 border-x border-border justify-center space-y-5 w-full text-secondary'>
            {predictions.map((prediction: Prediction) => {
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;
