import { Suspense } from 'react';

import Image from 'next/image';

import UpcomingMatchesCards from './UpcomingMatchCards';
import ViewSchedule from './ViewSchedule';

const UpcomingMatchesData = async () => {
  return (
    <div className='relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 w-full py-8 px-4 md:p-10 bg-card border-border border rounded-xl'>
      <ViewSchedule />
      <Suspense
        fallback={
          <div className='text-2xl text-accent-gold relative w-full flex flex-col gap-5 justify-center items-center col-span-4'>
            <Image
              src='/images/dinger.gif'
              alt='dinger Image'
              width={260}
              height={260}
              draggable={false}
            />
            Loading...
          </div>
        }
      >
        {/*  @ts-ignore Async Server Component */}
        <UpcomingMatchesCards />
      </Suspense>
    </div>
  );
};

export default UpcomingMatchesData;
