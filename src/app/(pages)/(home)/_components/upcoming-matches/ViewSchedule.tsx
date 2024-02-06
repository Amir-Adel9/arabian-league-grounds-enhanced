'use client';
import Link from 'next/link';
import { useState } from 'react';

const ViewSchedule = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsActive(!isActive)}
      className='cursor-pointer overflow-hidden flex grid-cols-none justify-center items-center left-[calc(50%-20px)] hover:left-[calc(50%-96px)] hover: absolute w-10 h-10 bg-accent-blue text-primary text-center font-bold rounded-full z-20 -bottom-5 border border-accent-gold hover:w-48 hover:rounded-xl  duration-500'
    >
      <Link href='/schedule'>
        {!isActive ? (
          <svg
            width='800px'
            height='800px'
            viewBox='0 0 16 16'
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6 fill-primary'
          >
            <path d='M16 5H0V4h16v1zm0 8H0v-1h16v1zm0-4.008H0V8h16v.992z' />
          </svg>
        ) : (
          <span className='whitespace-nowrap'>Full Schedule</span>
        )}
      </Link>
    </div>
  );
};

export default ViewSchedule;
