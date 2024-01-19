import { Prediction } from '@/db/types';
import { Event } from '@/utils/types/types';

import Image from 'next/image';
import Link from 'next/link';

const UnfulfilledPrediction = ({
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
    <div className='relative w-full bg-accent-blue text-primary px-6 py-4 font-kanit border-y border-accent-gold group duration-300 hover:bg-[#0b2c38]'>
      <Link
        href={`/match/${event.match.id}`}
        className='relative w-full h-full flex items-center justify-between'
      >
        <div className=' h-full flex justify-center flex-grow items-center flex-col lg:flex-row gap-1 lg:gap-0'>
          <div className='h-full flex flex-col w-24 lg:w-1/3 items-center gap-1'>
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
          <div>
            <p className='text-center font-bold text-xl p-5'>
              {prediction.winningTeamId === event.match.teams[0].code
                ? `#${event.match.teams[0].code}_WIN?`
                : prediction.winningTeamId === event.match.teams[1].code
                ? `#${event.match.teams[1].code}_WIN?`
                : 'No winner yet'}
            </p>
            <span className='text-center '>{startTime.date}</span>
          </div>
          <div className='h-full flex flex-col w-24 lg:w-1/3 items-center gap-1'>
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
      </Link>
    </div>
  );
};

export default UnfulfilledPrediction;
