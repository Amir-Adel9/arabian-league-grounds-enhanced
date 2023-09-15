import Image from 'next/image';
import { Balancer } from 'react-wrap-balancer';

export default function Home() {
  return (
    <main className='relative flex min-h-screen flex-col items-center'>
      {/* <section className='w-full min-h-screen relative flex flex-col items-center justify-center text-primary'>
        <div className='absolute w-full h-full bg-secondary opacity-90 z-[-10]'></div>
        <Image
          src='/background.jpg'
          alt='Background Image'
          className='w-full h-full z-[-20]'
          layout='fill'
          objectFit='cover'
          draggable={false}
          objectPosition='center'
        />
        <Image
          src='/al_logo.png'
          alt='Arabian League Logo'
          width={160}
          height={160}
          draggable={false}
          className='z-[10] duration-200 animate-bounce-y mt-24 md:mt-20'
        />
        <div className='p-32 flex flex-col text-center'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold  '>
            Welcome back to the
            <span className='text-accent-gold'> Arabian League</span> Grounds!
          </h1>
          <h2 className='text-xl md:text-xl lg:text-2xl font-bold '>
            Your all-in-one
            <span className='text-accent-blue'> Arabian League </span>
            companion now enhanced and improved.
          </h2>
        </div>
      </section> */}
      <section className='w-full h-screen relative flex flex-col  text-primary text-center md:text-start'>
        <div className='absolute w-full h-full bg-secondary opacity-95 z-[-10]'></div>
        <Image
          src='/background.jpg'
          alt='Background Image'
          className='w-full h-full z-[-20]'
          layout='fill'
          objectFit='cover'
          draggable={false}
          objectPosition='center'
        />
        <div className='h-full p-0 md:p-5 lg:p-32 flex justify-between items-center'>
          <div className='flex flex-col  h-full justify-center relative p-2 sm:p-0'>
            <div className='flex flex-col gap-5 justify-center items-center  md:justify-start md:items-start '>
              <Image
                src='/al_logo.png'
                alt='Arabian League Logo'
                width={180}
                height={180}
                draggable={false}
                className='z-[10] duration-200 animate-bounce-y sm:w-[180px] sm:h-[180px] mb-4 hidden xs:inline-block md:hidden'
              />
              <h1 className='text-3xl md:text-4xl lg:text-6xl font-bold font-rubik text'>
                <Balancer>
                  Welcome back to the
                  <span className='text-accent-gold font-light font-marker animate-puls'>
                    {' '}
                    Arabian League
                  </span>{' '}
                  Grounds!
                </Balancer>
              </h1>
              <h2 className='text-xl md:text-2xl lg:text-3xl font-bold font-rubik '>
                <Balancer>
                  Your all-in-one
                  <span className='text-accent-blue font-rubik'>
                    {' '}
                    Arabian League{' '}
                  </span>
                  companion now enhanced and improved.
                </Balancer>
              </h2>
              <p className='font-rubik font-thin'>
                <Balancer>
                  The Arabian League Grounds is back with a new look, feel and
                  an array of new features to make your Arabian League
                  experience much more enjoyable.
                </Balancer>
              </p>
              <div className='hidden md:flex md:gap-2 '>
                <span className='hidden md:inline'>Check Out:</span>
                <span className='underline cursor-pointer hover:text-accent-gold duration-300 '>
                  Schedule
                </span>
                <span className='underline cursor-pointer hover:text-accent-gold duration-300'>
                  Standings
                </span>
                <span className='underline cursor-pointer hover:text-accent-gold duration-300'>
                  Teams
                </span>
                <span className='underline cursor-pointer hover:text-accent-gold duration-300'>
                  Stats
                </span>
                <span className='underline cursor-pointer hover:text-accent-gold duration-300'>
                  Predictions
                </span>
                <span className='underline cursor-pointer hover:text-accent-gold duration-300'>
                  Fantasy
                </span>
              </div>
            </div>
            <div className='flex items-center justify-center md:justify-start flex-col md:flex-row gap-4 relative top-5 md:top-20 '>
              <button className='bg-accent-gold w-40 rounded px-4 py-3  hover:bg-primary hover:text-secondary duration-300'>
                <span className='font-light font-gluten'>Get Started</span>
              </button>
              <button className='border-accent-gold border rounded-3xl px-3 py-2 hover:border-accent-gold hover:text-accent-gold duration-300 font-bold'>
                <span className='font-light font-gluten'>Upcoming Matches</span>
              </button>
            </div>
          </div>
          <Image
            src='/al_logo.png'
            alt='Arabian League Logo'
            width={480}
            height={480}
            draggable={false}
            className='z-[10] duration-200 animate-bounce-y xl:w-[480px] xl:h-[480px] lg:w-[320px] lg:h-[320px] md:w-[280px] md:h-[280px] hidden md:inline-block'
          />
        </div>
      </section>
      <section className='w-full min-h-screen relative flex flex-col justify-center items-center '></section>
    </main>
  );
}
