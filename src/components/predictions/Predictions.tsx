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
  return (
    <div className='mt-20 flex flex-col w-full h-[calc(100vh-5rem)]'>
      <div className='w-full flex justify-around items-center gap-2'>
        <button className='bg-transparent flex-grow font-bold font-rubik text-accent-gold p-2 hover:border-b-2 hover:border-accent-gold hover:bg-gray-200 duration-300'>
          All Predictions (5)
        </button>
        <button className='bg-transparent flex-grow font-bold font-rubik text-accent-gold p-2 hover:border-b-2 hover:border-accent-gold hover:bg-gray-300 duration-300'>
          Correct (2)
        </button>
        <button className='bg-transparent flex-grow font-bold font-rubik text-accent-gold p-2 hover:border-b-2 hover:border-accent-gold hover:bg-gray-300 duration-300'>
          Incorrect (3)
        </button>
        <button className='bg-transparent flex-grow font-bold font-rubik text-accent-gold p-2 hover:border-b-2 hover:border-accent-gold hover:bg-gray-300 duration-300'>
          Pending (0)
        </button>
      </div>
      {/* <h1 className='text-xl font-rubik font-bold'>Your Predictions:</h1> */}
      <div className='text-primary'>
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

          return prediction.state === 'correct' ? (
            <CorrectPrediction
              prediction={prediction}
              event={eventForPrediction}
              startTime={eventStartTime}
              key={prediction.id}
            />
          ) : prediction.state === 'incorrect' ? (
            <IncorrectPrediction
              prediction={prediction}
              event={eventForPrediction}
              startTime={eventStartTime}
              key={prediction.id}
            />
          ) : (
            <UnfulfilledPrediction
              prediction={prediction}
              event={eventForPrediction}
              startTime={eventStartTime}
              key={prediction.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Predictions;
