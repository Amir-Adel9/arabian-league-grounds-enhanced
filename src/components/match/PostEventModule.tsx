import Image from 'next/image';

import { Prediction } from '@/db/schema';
import { Event, Stats } from '@/utils/types/types';

import CloseModalBtn from '../modal/CloseModalBtn';
import PostEventModuleStats from './PostEventModuleStats';

const PostEventModule = async ({
  event,
  currentPrediction,
  postEventStats,
}: {
  event: Event;
  currentPrediction: {
    status: 'lockedIn' | 'notLockedIn' | 'notLoggedIn';
    prediction: Prediction;
  };
  postEventStats: Stats[] | 'Event has not concluded yet';
}) => {
  // console.log('postEventStats', postEventStats);
  const matchDate = new Date(event.startTime).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='w-full h-full flex flex-col rounded-lg shadow-xl bg-primary '>
      <CloseModalBtn />
      <div className='w-full h-[calc(2.5/5*75vh)] pt-4 bg-secondary text-primary rounded-lg rounded-b-none z-[120] relative flex justify-center items-center flex-col lg:flex-row'>
        <div className='w-full relative lg:w-1/2 h-full duration-500 group flex flex-col items-center justify-center'>
          <div className='relative w-20 h-20 lg:w-40 lg:h-40'>
            <Image
              src={event.match.teams[0].image}
              alt={event.match.teams[0].name}
              fill
              draggable={false}
            />
          </div>
          <h3 className='text-2xl mt-4 text-center'>
            {event.match.teams[0].name}
          </h3>
          <span className='text-accent-gold mt-5 font-bold text-xl'>
            {event.match.teams[0].result.outcome === 'win' ? 'Win' : 'Loss'}
          </span>
        </div>
        <div className='relative flex-col h-full w-96 items-center justify-center hidden lg:flex gap-4 z-50'>
          <div className=' top-0 text-xl font-bold w-full text-center'>
            {matchDate}
          </div>
          {/* <span className='absolute bottom-1/2 text-3xl font-bold '>VS.</span> */}
          <div className='font-bold text-2xl'>
            <span>{event.match.teams[0].result.gameWins} </span>
            <span>- </span>
            <span>{event.match.teams[1].result.gameWins}</span>
          </div>
          <span>Best of {event.match.strategy.count}</span>
          <div className='absolute bottom-10 bg-accent-gold text-secondary p-2 rounded font-kanit'>
            {currentPrediction.status !== 'lockedIn'
              ? 'No prediction was locked in'
              : `You picked ${currentPrediction.prediction.winningTeamId}`}
          </div>
        </div>
        <div className='w-full relative lg:w-1/2 h-full duration-500 group flex flex-col items-center justify-center'>
          <div className='relative w-20 h-20 lg:w-40 lg:h-40'>
            <Image
              src={event.match.teams[1].image}
              alt={event.match.teams[1].name}
              fill
              draggable={false}
            />
          </div>
          <h3 className='text-2xl mt-4 text-center'>
            {event.match.teams[1].name}
          </h3>
          <span className='text-accent-gold mt-5 font-bold text-xl'>
            {event.match.teams[1].result.outcome === 'win' ? 'Win' : 'Loss'}
          </span>
        </div>
      </div>
      <PostEventModuleStats
        postEventStats={postEventStats}
        currentPrediction={currentPrediction}
      />
    </div>
  );
};

export default PostEventModule;
