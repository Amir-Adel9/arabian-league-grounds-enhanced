import { forwardRef } from 'react';

import Image from 'next/image';

import { Event } from '@/utils/constants/types';

const CompletedMatch = forwardRef(
  ({
    event,
    startTime,
    windowWidth,
  }: {
    event: Event;
    startTime: {
      hour: string;
      minute: string;
    };
    windowWidth: number;
  }) => {
    return (
      <div
        className='flex items-center  font-kanit justify-center space-x-4 w-full border-y-4 border-accent-gold bg-accent-blue text-primary p-4 duration-200 hover:bg-[#0b2c38]'
        key={event.match.id}
      >
        <div className=' relative w-36 flex-col hidden xs:flex font-kanit'>
          <span>
            <span className='text-xl sm:text-3xl'>{startTime.hour}</span>
            <span className='absolute text-xs sm:text-sm top-1 ml-1'>
              {startTime.minute}
            </span>
          </span>
        </div>
        <div className='flex w-full justify-center items-center flex-col md:flex-row'>
          <div className='flex flex-row-reverse md:flex-row w-24 md:w-1/3 items-center justify-end md:justify-end space-x-0 md:space-x-4'>
            <h3
              className={`text-lg font-bold ${
                event.match.teams[0].result.outcome === 'win'
                  ? 'text-accent-gold'
                  : ''
              } `}
            >
              {windowWidth < 1024
                ? event.match.teams[0].code
                : event.match.teams[0].name}
            </h3>
            <div className='relative w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 '>
              <Image
                src={event.match.teams[0].image}
                alt={event.match.teams[0].name}
                className={`${
                  event.match.teams[0].result.outcome === 'loss'
                    ? 'opacity-30 '
                    : ''
                }`}
                draggable={false}
                fill={true}
              />
            </div>
          </div>
          <div className='flex flex-col w-1/8 items-center justify-center'>
            <span className='text-xl font-bold px-2 lg:px-14 hidden md:inline'>
              <span
                className={`relative ${
                  event.match.teams[0].result.outcome === 'win'
                    ? 'before:content-["◀"] before: before:text-accent-gold before:text-xs'
                    : ''
                }`}
              >
                {` ${event.match.teams[0].result.gameWins} `}
              </span>
              <span>- </span>
              <span
                className={`relative ${
                  event.match.teams[1].result.outcome === 'win'
                    ? 'after:content-["▶"]  after:text-accent-gold after:text-xs'
                    : ''
                }`}
              >
                {` ${event.match.teams[1].result.gameWins} `}
              </span>
            </span>
          </div>
          <div className='flex items-center w-24 md:w-1/3 justify-start space-x-0 md:space-x-4'>
            <div className='relative w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20  '>
              <Image
                src={event.match.teams[1].image}
                alt={event.match.teams[1].name}
                className={`${
                  event.match.teams[1].result.outcome === 'loss'
                    ? 'opacity-30 '
                    : ''
                }`}
                draggable={false}
                fill={true}
              />
            </div>
            <h3
              className={`text-lg font-bold ${
                event.match.teams[1].result.outcome === 'win'
                  ? 'text-accent-gold'
                  : ''
              } `}
            >
              {windowWidth < 1024
                ? event.match.teams[1].code
                : event.match.teams[1].name}
            </h3>
          </div>
        </div>
        <div className='font-bold placeholder:w-36 flex-col hidden xs:flex'>
          <span> {event.league.name} </span>
          <span className=' hidden md:inline'>{`Best of ${event.match.strategy.count}`}</span>
        </div>
      </div>
    );
  }
);

CompletedMatch.displayName = 'CompletedMatch';

export default CompletedMatch;
