import { Prediction } from '@/db/schema';
import { Event } from '@/utils/types/types';

import Image from 'next/image';
import Link from 'next/link';

const CorrectPrediction = ({
  prediction,
  event,
  startTime,
}: {
  prediction: Prediction;
  event: Event;
  startTime: {
    hour: string;
    minute: string;
    date: string;
  };
}) => {
  return (
    <Link href={`/match/${event.match.id}`} className='w-full'>
      <div className='flex  w-full items-center justify-around bg-green-900 border-accent-gold border-y cursor-pointer p-4 duration-200 hover:bg-green-950 '>
        <div className='flex w-full flex-row items-center justify-center '>
          <div className='relative w-10 h-10 md:w-20 md:h-20 '>
            <Image
              src={event.match.teams[0].image}
              alt={event.match.teams[0].code}
              fill={true}
            />
          </div>
        </div>
        <div className='relative'>
          <h3 className='text-center font-bold text-xl flex-grow'>
            {`${prediction.winningTeamId} Won `}
          </h3>
          <h3 className='absolute w-36 left-[calc(50%-4.5rem)] text-center font-bold text-sm flex-grow'>
            {`(You picked ${prediction.winningTeamId})`}
          </h3>
        </div>
        <div className='flex w-full flex-row items-center justify-center '>
          <div className='relative w-10 h-10 md:w-20 md:h-20 '>
            <Image
              src={event.match.teams[1].image}
              alt={event.match.teams[1].code}
              fill={true}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CorrectPrediction;
