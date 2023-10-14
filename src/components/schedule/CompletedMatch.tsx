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
        className='flex items-center font-kanit justify-center w-full border-y-4 border-accent-gold bg-accent-blue text-primary p-4 group duration-300 hover:bg-[#0b2c38]'
        key={event.match.id}
      >
        <div className=' relative w-36 flex-col flex'>
          <div>
            <span className='text-xl sm:text-3xl'>{startTime.hour}</span>
            <span className='absolute text-xs sm:text-sm top-1 ml-1'>
              {startTime.minute}
            </span>
          </div>
          <span className='text-xs text-accent-gold font-medium'>APPROX</span>
        </div>
        <div className='flex w-full justify-center items-center flex-col lg:flex-row'>
          <div className='flex flex-row-reverse lg:flex-row w-24 lg:w-1/3 items-center justify-end lg:justify-end space-x-0 gap-1 lg:space-x-4'>
            <div className='flex flex-col items-end'>
              <div className='flex gap-2 items-center'>
                <h3
                  className={`text-lg font-medium text-end ${
                    event.match.teams[0].result.outcome === 'win' &&
                    windowWidth > 1024
                      ? 'text-accent-gold'
                      : ''
                  } `}
                >
                  {windowWidth < 1024
                    ? event.match.teams[0].code
                    : event.match.teams[0].name}
                </h3>
                <span
                  className={`inline lg:hidden font-bold ${
                    event.match.teams[0].result.outcome === 'win'
                      ? 'text-accent-gold'
                      : ''
                  }`}
                >{`${event.match.teams[0].result.gameWins}`}</span>
              </div>
              <span className='font-bold text-xs text-end hidden lg:inline'>
                {event.match.teams[0].record.wins}W -{' '}
                {event.match.teams[0].record.losses}L
              </span>
            </div>
            <div className='relative w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20 '>
              <Image
                src={event.match.teams[0].image}
                alt={event.match.teams[0].name}
                className={`${
                  event.match.teams[0].result.outcome === 'loss'
                    ? 'opacity-30 group-hover:opacity-100 duration-300'
                    : ''
                }`}
                draggable={false}
                fill={true}
              />
            </div>
          </div>
          <div className='flex flex-col w-1/8 items-center justify-center'>
            <span className='text-xl font-bold px-2 xl:px-14 hidden lg:inline'>
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
                {`${event.match.teams[1].result.gameWins} `}
              </span>
            </span>
          </div>
          <div className='flex items-center w-24 lg:w-1/3 justify-start space-x-0 lg:space-x-4'>
            <div className='relative w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20  '>
              <Image
                src={event.match.teams[1].image}
                alt={event.match.teams[1].name}
                className={`${
                  event.match.teams[1].result.outcome === 'loss'
                    ? 'opacity-30 group-hover:opacity-100 duration-300'
                    : ''
                }`}
                draggable={false}
                fill={true}
              />
            </div>
            <div className='flex flex-col items-start'>
              <div className='flex gap-2 items-center '>
                <h3
                  className={`text-lg font-medium text-end ${
                    event.match.teams[1].result.outcome === 'win' &&
                    windowWidth > 1024
                      ? 'text-accent-gold'
                      : ''
                  } `}
                >
                  {windowWidth < 1024
                    ? event.match.teams[1].code
                    : event.match.teams[1].name}
                </h3>
                <span
                  className={`inline lg:hidden font-bold ${
                    event.match.teams[1].result.outcome === 'win'
                      ? 'text-accent-gold'
                      : ''
                  }`}
                >{`${event.match.teams[1].result.gameWins}`}</span>
              </div>
              <span className='font-bold text-xs text-end hidden lg:inline'>
                {event.match.teams[1].record.wins}W -{' '}
                {event.match.teams[1].record.losses}L
              </span>
            </div>
          </div>
        </div>
        <div className='font-bold flex-col hidden xs:flex'>
          <span> {event.league.name} </span>
          <span className=' hidden lg:inline'>{`Best of ${event.match.strategy.count}`}</span>
        </div>
      </div>
    );
  }
);

CompletedMatch.displayName = 'CompletedMatch';

export default CompletedMatch;
