import Image from 'next/image';
import Link from 'next/link';

import { Event, MatchTeam } from '@/utils/constants/types';

const LiveEvent = ({
  event,
  teams,
}: {
  event: Event;
  teams: {
    firstTeam: MatchTeam;
    secondTeam: MatchTeam;
  };
}) => {
  return (
    <div className='relative w-full h-[120px] bg-secondary text-primary px-6 py-4 font-kanit border-y-4 border-red-700 group duration-300 hover:bg-[#0b2c38]'>
      <Link
        href='https://www.twitch.tv/lolesports_ar'
        target={'_blank'}
        className='relative w-full h-full flex items-center justify-between'
      >
        <div className='absolute top-1 left-0 ml-2 flex items-center justify-center gap-x-1'>
          <svg
            width='16px'
            height='16px'
            viewBox='0 0 15 15'
            version='1.1'
            id='circle'
            xmlns='http://www.w3.org/2000/svg'
            className='fill-red-700'
          >
            <path d='M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z' />
          </svg>
          <span className='font-bold'>Live</span>
        </div>
        <div className='h-full flex justify-center flex-grow items-center flex-col lg:flex-row gap-1 lg:gap-0'>
          <div className='h-full flex flex-row lg:flex-row-reverse w-24 lg:w-1/3 items-center justify-between lg:justify-start  space-x-1 lg:gap-4 '>
            <Image
              src={teams.firstTeam.image}
              alt={teams.firstTeam.name}
              width={80}
              height={80}
              className='w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20'
              draggable={false}
            />
            <div className='flex flex-col lg:items-end flex-grow lg:flex-grow-0'>
              <div className='flex items-center justify-between lg:justify-normal'>
                <h3 className='hidden lg:inline text-end'>
                  {teams.firstTeam.name}
                </h3>
                <h3 className='inline lg:hidden font-semibold lg:font-normal'>
                  {teams.firstTeam.code}
                </h3>
              </div>
            </div>
          </div>
          <h3 className='hidden lg:inline font-bold lg:px-8 xl:px-14'>VS</h3>
          <div className='flex flex-row lg:flex-row w-24 lg:w-1/3 items-center justify-between lg:justify-start space-x-1 lg:space-x-4'>
            <Image
              src={teams.secondTeam.image}
              alt={teams.secondTeam.name}
              width={80}
              height={80}
              className='w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20'
              draggable={false}
            />
            <div className='flex flex-col lg:items-start flex-grow lg:flex-grow-0 '>
              <div className='flex items-center justify-between lg:justify-normal '>
                <h3 className='hidden lg:inline'>{teams.secondTeam.name}</h3>
                <h3 className='inline lg:hidden font-semibold lg:font-normal'>
                  {teams.secondTeam.code}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className='font-bold flex-col hidden xs:flex'>
          <span> {event.league.name} </span>
          <span className=' hidden lg:inline'>{`Best of ${event.match.strategy.count}`}</span>
        </div>
      </Link>
    </div>
  );
};

export default LiveEvent;
