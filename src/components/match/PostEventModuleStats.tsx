'use client';

import { Prediction } from '@/db/schema';
import { Stats } from '@/utils/types/types';

const PostEventModuleStats = ({
  postEventStats,
  currentPrediction,
}: {
  postEventStats: Stats[] | 'Event has not concluded yet';
  currentPrediction: {
    status: 'lockedIn' | 'notLockedIn' | 'notLoggedIn';
    prediction: Prediction;
  };
}) => {
  console.log('postEventStats', postEventStats);

  return (
    <div className='relative grid-cols-2 grid-rows-2 flex flex-col flex-grow lg:flex-col bg-primary'>
      {/* <div className='h-14 text-accent-gold col-span-2 bg-primary'>
        <ul className='flex gap-10'>
          <li className=''>Overview</li> <li>Overview</li> <li>Overview</li>{' '}
          <li>Overview</li>
        </ul>
      </div> */}
      <div className='w-full flex flex-grow bg-primary'>
        <div className='w-full relative duration-500 group flex flex-col items-center justify-center'>
          1
        </div>
        <div className='w-full relative duration-500 group flex flex-col items-center justify-center'>
          2
        </div>
      </div>
    </div>
  );
};

export default PostEventModuleStats;
