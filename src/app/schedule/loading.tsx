import Image from 'next/image';

export default function Loading() {
  return (
    <main className='w-full lg:w-[calc(100%-5rem)] lg:ml-20 min-h-screen relative flex justify-start items-center'>
      <div className='relative w-full z-10 flex flex-col items-center justify-center'>
        <Image
          src='/images/dinger.gif'
          alt='dinger Image'
          width={260}
          height={260}
          draggable={false}
        />
        <h1 className='text-5xl font-bold text-accent-gold text-center'>
          Loading...
        </h1>
      </div>
    </main>
  );
}
