import Image from 'next/image';
import Link from 'next/link';

import { Balancer } from 'react-wrap-balancer';

import HeroButtons from './HeroButtons';

const Hero = () => {
  return (
    <>
      <div className='absolute w-full h-full bg-secondary opacity-95 z-[-10]'></div>
      <Image
        src='/images/background.jpg'
        alt='Background Image'
        className='w-full h-full z-[-20]'
        layout='fill'
        objectFit='cover'
        draggable={false}
        objectPosition='center'
      />
      <div className='w-full min-h-screen p-0 md:p-5 lg:p-32 flex justify-between items-center'>
        <div className='flex flex-col  h-full justify-center items-center lg:items-start relative p-2 sm:p-0'>
          <div className='flex flex-col gap-5 justify-center items-center  lg:justify-start lg:items-start '>
            <Image
              src='/images/al_logo.png'
              alt='Arabian League Logo'
              width={180}
              height={180}
              draggable={false}
              className='z-[10] duration-200 animate-bounce-y sm:w-[180px] sm:h-[180px] mb-4 hidden xs:inline-block lg:hidden'
            />
            <h1 className='text-3xl md:text-4xl lg:text-6xl font-bold font-rubik text animate-translate-x'>
              <Balancer>
                Welcome back to the
                <span className='text-accent-gold font-kanit animate-puls'>
                  {' '}
                  Arabian League
                </span>{' '}
                Grounds!
              </Balancer>
            </h1>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold font-rubik animate-opacity '>
              <Balancer>
                Your all-in-one
                <span className='text-accent-blue'> Arabian League </span>
                companion now enhanced and improved.
              </Balancer>
            </h2>
            <p className='font-rubik font-thin animate-opacity'>
              <Balancer>
                The Arabian League Grounds is back with a new look, feel and an
                array of new features to make your Arabian League experience
                much more enjoyable.
              </Balancer>
            </p>
            <div className='hidden lg:flex lg:gap-2 animate-opacity'>
              <span className='underline cursor-pointer hover:text-accent-gold hover:-translate-y-1 duration-300 '>
                <Link href='/schedule'>Schedule</Link>
              </span>

              <span className='underline cursor-pointer hover:text-accent-gold hover:-translate-y-1 duration-300'>
                <Link href='/standings'>Standings</Link>
              </span>
              <span className='underline cursor-pointer hover:text-accent-gold hover:-translate-y-1 duration-300'>
                <Link href='/teams'>Teams</Link>
              </span>
              <span className='underline cursor-pointer hover:text-accent-gold hover:-translate-y-1 duration-300'>
                <Link href='/stats'>Stats</Link>
              </span>
              <span className='underline cursor-pointer hover:text-accent-gold hover:-translate-y-1 duration-300'>
                <Link href='/fantasy'>Fantasy</Link>
              </span>
              <span className='underline cursor-pointer hover:text-accent-gold hover:-translate-y-1 duration-300'>
                <Link href='/predictions'>Predictions</Link>
              </span>
              <span className='underline cursor-pointer hover:text-accent-gold hover:-translate-y-1 duration-300'>
                <Link href='/leaderboard'>Learderboard</Link>
              </span>
              <span className='underline cursor-pointer hover:text-accent-gold hover:-translate-y-1 duration-300'>
                <Link href='/about'>About</Link>
              </span>
            </div>
          </div>
          <div className='flex items-center justify-center lg:justify-start flex-col lg:flex-row gap-4 relative mt-5 xs:mt-0 xs:top-10 md:top-14 lg:top-20 '>
            <HeroButtons />
          </div>
        </div>
        <Image
          src='/images/al_logo.png'
          alt='Arabian League Logo'
          width={420}
          height={420}
          draggable={false}
          className='z-[10] duration-200 animate-bounce-y xl:w-[420px] xl:h-[420px] lg:w-[300px] lg:h-[300px] md:w-[280px] md:h-[280px] hidden lg:inline-block'
        />
      </div>
    </>
  );
};

export default Hero;
