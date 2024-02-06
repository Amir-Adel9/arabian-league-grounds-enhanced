'use client';

import Image from 'next/image';
import { useRef } from 'react';
import Link from 'next/link';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);
dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

const TeamMatchesSlider = ({ teamMatches }: { teamMatches: any }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const rightArrowRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLDivElement>(null);

  return (
    <div className='relative w-full flex overflow-x-auto h-36 no-scrollbar bg-secondary border-y border-y-[#5b6064]'>
      <div
        onClick={(e) => {
          sliderRef.current!.scrollLeft = sliderRef.current!.scrollWidth;
          e.currentTarget.style.display = 'none';
          leftArrowRef.current?.style.setProperty('display', 'block');
        }}
        ref={rightArrowRef}
        className='absolute h-36 right-0 bg-accent-blue hover:bg-secondary duration-500 cursor-pointer border-l border-l-[#5b6064]   w-12 z-50'
      >
        <div className='absolute left-[calc(50%-5px)] top-[calc(50%-7.5px)]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='10px'
            height='15px'
            viewBox='0 0 10 15'
          >
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g transform='translate(-320.000000, -17.000000)'>
                <g transform='translate(325.000000, 24.000000) rotate(-90.000000) translate(-325.000000, -24.000000) translate(313.000000, 12.000000)'>
                  <mask fill='white'>
                    <polygon points='6 7 4 9.005 11.495 16.505 19.001 9.005 17 7.005 11.501 12.504'></polygon>
                  </mask>
                  <polygon
                    fill='#bea85d'
                    fillRule='evenodd'
                    points='6 7 4 9.005 11.495 16.505 19.001 9.005 17 7.005 11.501 12.504'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div
        ref={leftArrowRef}
        style={{ display: 'none' }}
        onClick={(e) => {
          sliderRef.current!.scrollLeft = -sliderRef.current!.scrollWidth;
          e.currentTarget.style.display = 'none';
          rightArrowRef.current?.style.setProperty('display', 'block');
        }}
        className='absolute h-36   left-0 bg-accent-blue hover:bg-secondary duration-500 cursor-pointer border-r border-r-[#5b6064] w-12 z-50'
      >
        <div className='absolute left-[calc(50%-5px)] top-[calc(50%-7.5px)]'>
          <svg
            className='icon'
            xmlns='http://www.w3.org/2000/svg'
            width='10px'
            height='15px'
            viewBox='0 0 10 15'
          >
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g transform='translate(-320.000000, -17.000000)'>
                <g transform='translate(325.000000, 24.000000) scale(-1, 1) rotate(-90.000000) translate(-325.000000, -24.000000) translate(313.000000, 12.000000)'>
                  <mask fill='white'>
                    <polygon points='6 7 4 9.005 11.495 16.505 19.001 9.005 17 7.005 11.501 12.504'></polygon>
                  </mask>
                  <polygon
                    className='shape'
                    fill='#bea85d'
                    fillRule='evenodd'
                    points='6 7 4 9.005 11.495 16.505 19.001 9.005 17 7.005 11.501 12.504'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div
        ref={sliderRef}
        className='relative w-full flex overflow-x-auto h-36 no-scrollbar bg-secondary border-y border-y-[#5b6064]'
      >
        {teamMatches.map((match: any, index: number) => {
          const targetDate = dayjs.utc(match.startTime);
          const userDate = targetDate.tz(dayjs.tz.guess());
          const matchHour = userDate.format('HH:mm');

          const today = dayjs().startOf('day');
          const tomorrow = dayjs().add(1, 'day').startOf('day');
          const nextWeek = dayjs().add(1, 'week').startOf('day');

          let formattedDate;

          if (userDate.isSame(today, 'day')) {
            formattedDate = `Today`;
          } else if (userDate.isSame(tomorrow, 'day')) {
            formattedDate = `Tomorrow`;
          } else if (userDate.isAfter(today) && userDate.isBefore(nextWeek)) {
            formattedDate = userDate.format('MMM DD');
          } else {
            formattedDate = userDate.format('MMM DD');
          }

          const cutoffDate = dayjs.utc('2023-06-13T17:00:00Z');

          if (targetDate.isAfter(cutoffDate)) {
            return (
              <Link href={`/match/${match.match.id}`} key={index}>
                <div
                  key={index}
                  className='flex flex-col justify-center items-start duration-300 hover:bg-accent-blue gap-1 w-full h-full p-8  text-primary border-x border-x-[#5b6064]'
                >
                  <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-base'>{formattedDate}</h1>
                  </div>
                  <div
                    className={`flex gap-1 ${
                      match.match.teams[0].result.outcome === 'win'
                        ? 'text-accent-gold'
                        : ''
                    }`}
                  >
                    <div className='relative w-8 h-8'>
                      <Image
                        src={`${match.match.teams[0].image}`}
                        alt=''
                        fill={true}
                        draggable={false}
                        className={`${
                          match.match.teams[0].result.outcome === 'loss'
                            ? 'opacity-50 '
                            : ''
                        }`}
                      />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                      <h1 className='text-base'>{match.match.teams[0].code}</h1>
                    </div>
                  </div>
                  <div
                    className={`flex gap-1 ${
                      match.match.teams[1].result.outcome === 'win'
                        ? 'text-accent-gold'
                        : ''
                    }`}
                  >
                    <div className='relative w-8 h-8'>
                      <Image
                        src={`${match.match.teams[1].image}`}
                        alt=''
                        fill={true}
                        draggable={false}
                        className={`${
                          match.match.teams[1].result.outcome === 'loss'
                            ? 'opacity-50 '
                            : ''
                        }`}
                      />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                      <h1 className='text-base'>{match.match.teams[1].code}</h1>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-base'>{matchHour}</h1>
                  </div>
                </div>
              </Link>
            );
          } else {
            return;
          }
        })}
      </div>
    </div>
  );
};

export default TeamMatchesSlider;
