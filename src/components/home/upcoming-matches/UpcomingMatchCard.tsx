import Image from 'next/image';

import { Event } from '@/utils/constants/types';

const UpcomingMatchCard = ({ event }: { event: Event }) => {
  const { match } = event;
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-row items-center justify-center mb-4 z-20'>
        <div className='flex flex-col items-center flex-grow'>
          <Image
            src={match.teams[0].image}
            alt={match.teams[0].name}
            width={100}
            height={100}
            draggable={false}
          />
          <h3 className='text-xl font-bold mt-2 text-center'>
            {match.teams[0].name}
          </h3>
        </div>
        <h3 className='text-xl font-bold text-center'>VS</h3>
        <div className='flex flex-col items-center'>
          <Image
            src={match.teams[1].image}
            alt={match.teams[1].name}
            width={100}
            height={100}
            draggable={false}
          />
          <h3 className='text-xl font-bold mt-2 text-center'>
            {match.teams[1].name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMatchCard;
