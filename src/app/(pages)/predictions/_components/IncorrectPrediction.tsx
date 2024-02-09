import { Prediction } from '@/db/types';
import { Event } from '@/utils/types/types';

import Image from 'next/image';
import Link from 'next/link';

const IncorrectPrediction = ({
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
    <div className='relative flex justify-between items-center w-full h-[120px] bg-card text-primary px-6 py-4 font-geist rounded-xl duration-300 hover:bg-red-950'>
      <div className='relative w-full h-full flex items-center justify-between'>
        <div className='h-full flex justify-center flex-grow items-center flex-col lg:flex-row gap-1 lg:gap-0'>
          <div className='relative h-full flex flex-row lg:flex-row-reverse w-24 lg:w-1/3 items-center justify-between lg:justify-start space-x-1 lg:gap-4'>
            <Image
              src={event.match.teams[0].image}
              alt={event.match.teams[0].name}
              width={80}
              height={80}
              className='w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20'
              draggable={false}
            />
            <h3 className='hidden lg:inline text-end'>
              {event.match.teams[0].name}
            </h3>
            <h3 className='inline lg:hidden font-semibold lg:font-normal'>
              {event.match.teams[0].code}
            </h3>
          </div>
          <div className='h-[90px] hidden lg:flex lg:flex-col lg:items-center lg:gap-2 lg:px-8 xl:px-14'>
            <h3 className='text-center font-bold text-xl flex-grow'>
              {`${prediction.winningTeamId} Won `}
            </h3>
            <h3 className=' w- left-[calc(50%-4.5rem)] text-center font-bold text-sm flex-grow'>
              {`(You picked ${prediction.winningTeamId})`}
            </h3>
          </div>
          <div className='flex flex-row lg:flex-row w-24 lg:w-1/3 items-center justify-between lg:justify-start space-x-1 lg:space-x-4'>
            <Image
              src={event.match.teams[1].image}
              alt={event.match.teams[1].name}
              width={80}
              height={80}
              className='w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20'
              draggable={false}
            />
            <h3 className='hidden lg:inline text-end'>
              {event.match.teams[1].name}
            </h3>
            <h3 className='inline lg:hidden font-semibold lg:font-normal'>
              {event.match.teams[1].code}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncorrectPrediction;
