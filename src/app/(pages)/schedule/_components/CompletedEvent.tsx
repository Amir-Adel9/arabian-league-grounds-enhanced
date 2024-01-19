import { forwardRef } from 'react';

import Image from 'next/image';

import { Event, Team } from '@/utils/types/types';
import Link from 'next/link';

const CompletedEvent = forwardRef(
  ({
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
      firstTeam: Team;
      secondTeam: Team;
    };
  }) => {
    return (
      <div className='relative flex items-center w-full h-[120px] bg-card text-primary px-6 py-4 font-geist rounded-xl group duration-300 hover:bg-accent-blue'>
        <Link
          href={`/match/${event.match.id}`}
          className='w-full flex items-center justify-between'
        >
          <div className='relative'>
            <span className='text-xl sm:text-3xl'>{startTime.hour}</span>
            <span className='absolute text-xs sm:text-sm top-1 ml-1'>
              {startTime.minute}
            </span>
          </div>
          <div className='flex justify-center flex-grow items-center flex-col lg:flex-row gap-1 lg:gap-0'>
            <div className='flex flex-row lg:flex-row-reverse w-24 lg:w-1/3 items-center justify-between lg:justify-start  space-x-1 lg:gap-4 '>
              <Image
                src={teams.firstTeam.image}
                alt={teams.firstTeam.name}
                width={80}
                height={80}
                className={`w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20  ${
                  teams.firstTeam.result.outcome === 'loss'
                    ? 'opacity-30 group-hover:opacity-100 duration-300'
                    : ''
                }`}
                draggable={false}
              />
              <div className='flex flex-col lg:items-end flex-grow lg:flex-grow-0'>
                <div className='flex items-center gap-1 justify-between lg:justify-normal'>
                  <h3
                    className={`hidden lg:inline text-end ${
                      teams.firstTeam.result.outcome === 'win'
                        ? 'text-accent-gold '
                        : ' group-hover:text-primary'
                    }`}
                  >
                    {teams.firstTeam.name}
                  </h3>
                  <h3
                    className={`inline lg:hidden font-semibold lg:font-normal ${
                      teams.firstTeam.result.outcome === 'win'
                        ? 'text-primary '
                        : ' group-hover:text-primary'
                    }`}
                  >
                    {teams.firstTeam.code}
                  </h3>
                  <span
                    className={`inline lg:hidden font-bold  ${
                      teams.firstTeam.result.outcome === 'win'
                        ? 'text-accent-gold'
                        : ' group-hover:text-primary'
                    }`}
                  >{`${teams.firstTeam.result.gameWins}`}</span>
                </div>
                <span className='font-bold text-xs text-end hidden lg:inline '>
                  {teams.firstTeam.record.wins}W -{' '}
                  {teams.firstTeam.record.losses}L
                </span>
              </div>
            </div>
            <div className='font-bold px-8 xl:px-14 hidden lg:inline'>
              <span
                className={`relative ${
                  teams.firstTeam.result.outcome === 'win'
                    ? 'before:content-["◀"] before: before:text-accent-gold before:text-xs'
                    : ''
                }`}
              >
                {` ${teams.firstTeam.result.gameWins} `}
              </span>
              <span>- </span>
              <span
                className={`relative ${
                  teams.secondTeam.result.outcome === 'win'
                    ? 'after:content-["▶"]  after:text-accent-gold after:text-xs'
                    : ''
                }`}
              >
                {`${teams.secondTeam.result.gameWins} `}
              </span>
            </div>
            <div className='flex flex-row lg:flex-row w-24 lg:w-1/3 items-center justify-between lg:justify-start space-x-1 lg:space-x-4'>
              <Image
                src={teams.secondTeam.image}
                alt={teams.secondTeam.name}
                width={80}
                height={80}
                className={`w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20  ${
                  teams.secondTeam.result.outcome === 'loss'
                    ? 'opacity-30 group-hover:opacity-100 duration-300'
                    : ''
                }`}
                draggable={false}
              />
              <div className='flex flex-col lg:items-start flex-grow lg:flex-grow-0 '>
                <div className='flex items-center gap-1 justify-between lg:justify-normal '>
                  <h3
                    className={`hidden lg:inline  ${
                      teams.secondTeam.result.outcome === 'win'
                        ? 'text-accent-gold '
                        : ' group-hover:text-primary'
                    }`}
                  >
                    {teams.secondTeam.name}
                  </h3>
                  <h3
                    className={`inline lg:hidden font-semibold group-hover:text-primary lg:font-normal ${
                      teams.secondTeam.result.outcome === 'win'
                        ? 'text-primary'
                        : ''
                    }`}
                  >
                    {teams.secondTeam.code}
                  </h3>
                  <span
                    className={`inline lg:hidden font-bold ${
                      teams.secondTeam.result.outcome === 'win'
                        ? 'text-accent-gold'
                        : ' group-hover:text-primary'
                    }`}
                  >{`${teams.secondTeam.result.gameWins}`}</span>
                </div>
                <span className='font-bold text-xs text-end hidden  lg:inline'>
                  {teams.secondTeam.record.wins}W -{' '}
                  {teams.secondTeam.record.losses}L
                </span>
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
  }
);

CompletedEvent.displayName = 'CompletedEvent';

export default CompletedEvent;
