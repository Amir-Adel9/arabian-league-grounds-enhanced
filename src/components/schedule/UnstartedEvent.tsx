import Link from 'next/link';
import Image from 'next/image';

import { Event, MatchTeam } from '@/utils/constants/types';

const UnstartedEvent = ({
  event,
  startTime,
  teams,
}: {
  event: Event;
  startTime: {
    hour: string;
    minute: string;
  };
  teams: {
    firstTeam: MatchTeam;
    secondTeam: MatchTeam;
  };
}) => {
  return (
    <div className='relative w-full h-[120px] bg-accent-blue text-primary px-6 py-4 font-kanit border-y-4 border-accent-gold group duration-300 hover:bg-[#0b2c38]'>
      <Link
        href={`/match/${event.match.id}`}
        className='relative w-full h-full flex items-center justify-between'
      >
        <div className='relative'>
          <span className='text-xl sm:text-3xl'>{startTime.hour}</span>
          <span className='absolute text-xs sm:text-sm top-1 ml-1'>
            {startTime.minute}
          </span>
          <h4 className='text-sm font-mono text-accent-gold font-bold'>
            APPROX
          </h4>
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
          <div
            className={`h-[90px] hidden lg:flex lg:flex-col lg:items-center ${
              teams.firstTeam.name === 'TBD' || teams.secondTeam.name === 'TBD'
                ? 'lg:justify-center'
                : 'lg:justify-end'
            }  lg:gap-2 lg:px-8 xl:px-14`}
          >
            <h3 className=' font-bold'>VS</h3>
            <button
              className='bg-accent-gold text-white py-1 px-2 rounded font-inter font-light duration-300 hover:bg-[#a08b47]'
              hidden={
                teams.firstTeam.name === 'TBD' ||
                teams.secondTeam.name === 'TBD'
              }
            >
              {/* <span>
                {userPredictionsForMatch.length > 0
                  ? `#${userPredictionsForMatch[0].winningTeamId}_WIN`
                  : 'Predict Now'}
              </span> */}
              Predict Now
            </button>
          </div>
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

export default UnstartedEvent;
