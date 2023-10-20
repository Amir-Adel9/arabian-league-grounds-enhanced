import Image from 'next/image';

import { Event } from '@/utils/constants/types';
import UpcomingMatchCardDate from './UpcomingMatchDate';

const UpcomingMatchCard = ({ event }: { event: Event }) => {
  const { match } = event;
  return (
    <div className='relative border border-accent-gold flex min-h-[250px] flex-col items-center justify-center rounded-lg shadow-lg p-4 cursor-pointer duration-200 hover:scale-105'>
      <div className='absolute w-full h-full bg-secondary opacity-80 z-[10] top-0 left-0 rounded-lg '></div>
      <Image
        src='/images/background.jpg'
        alt='Background Image'
        className='w-full h-full z-[5] rounded-lg'
        layout='fill'
        objectFit='cover'
        draggable={false}
        objectPosition='center'
      />
      <div className='grid grid-cols-3 mb-4 z-20'>
        <div className='flex flex-col items-center flex-grow justify-between'>
          <Image
            src={match.teams[0].image}
            alt={match.teams[0].code}
            className={`${
              match.teams[0].code === 'TBD' ? 'opacity-50 invert' : ''
            }`}
            width={100}
            height={100}
            draggable={false}
          />
          <h3 className='text-xl font-bold mt-2 text-center'>
            {match.teams[0].code}
          </h3>
        </div>
        <h3 className='text-xl font-bold text-center self-center'>VS</h3>
        <div className='flex flex-col items-center flex-grow justify-between'>
          <Image
            src={match.teams[1].image}
            alt={match.teams[1].code}
            className={`${
              match.teams[1].code === 'TBD' ? 'opacity-50 invert' : ''
            }`}
            width={100}
            height={100}
            draggable={false}
          />
          <h3 className='text-xl font-bold mt-2 text-center'>
            {match.teams[1].code}
          </h3>
        </div>
        <UpcomingMatchCardDate matchDate={event.startTime} />
      </div>
    </div>
  );
};

export default UpcomingMatchCard;
