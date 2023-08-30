import Image from 'next/image';

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
          className='z-[10] duration-200 animate-bounce-y mt-24 sm:mt-20'
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
      <section className='w-full h-screen relative flex flex-col  text-primary'>
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
        <div className='h-full p-32 flex justify-between items-center'>
          <div className='flex flex-col  h-full justify-center relative'>
            <div className='flex flex-col gap-5'>
              <h1 className='text-3xl md:text-4xl lg:text-6xl font-bold font-rubik'>
                Welcome back to the <br />
                <span className='text-accent-gold font-light font-gluten animate-puls'>
                  {' '}
                  Arabian League
                </span>{' '}
                Grounds!
              </h1>
              <h2 className='text-xl md:text-2xl lg:text-3xl font-bold font-rubi '>
                Your all-in-one
                <span className='text-accent-blue font-rubik'>
                  {' '}
                  Arabian League{' '}
                </span>
                companion <br /> now enhanced and improved.
              </h2>
              <p className='font-rubik font-thin'>
                The Arabian League Grounds is back with a new look, feel and an
                array of new features <br /> to make your Arabian League
                experience much more enjoyable.
              </p>
              <div className='flex gap-2'>
                Check Out:
                <span className='underline cursor-pointer hover:text-accent-gold'>
                  Schedule
                </span>
                <span className='underline cursor-pointer hover:text-accent-gold'>
                  Standings
                </span>
                <span className='underline cursor-pointer hover:text-accent-gold'>
                  Teams
                </span>
                <span className='underline cursor-pointer hover:text-accent-gold'>
                  Stats
                </span>
                <span className='underline cursor-pointer hover:text-accent-gold'>
                  Predictions
                </span>
                <span className='underline cursor-pointer hover:text-accent-gold'>
                  Fantasy
                </span>
              </div>
            </div>

            <button className='bg-accent-gold w-40 rounded px-4 py-3 absolute bottom-16 hover:bg-primary hover:text-secondary duration-300'>
              <span className='font-light font-gluten'>Get Started</span>
            </button>
          </div>
          {/* <Image
            src='/al_logo.png'
            alt='Arabian League Logo'
            width={260}
            height={260}
            draggable={false}
            className='z-[10] duration-200 '
          /> */}
        </div>
      </section>
      <section className='w-full min-h-screen relative flex flex-col justify-center items-center '></section>
    </main>
  );
}
