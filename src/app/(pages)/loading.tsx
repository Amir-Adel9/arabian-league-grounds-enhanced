import Image from 'next/image';
import Link from 'next/link';

function Loading() {
  return (
    <main className='w-full min-h-screen relative flex flex-col justify-center items-center '>
      <div className='font-bold  relative w-full flex flex-col gap-4 justify-center items-center '>
        <Image
          src='/images/dinger.gif'
          alt='dinger Image'
          width={260}
          height={260}
          className='animate-bounce-y  opacity-75 brightness-105 -z-10'
          draggable={false}
        />
        <h2 className='text-4xl text-accent-gold font-rubik'>Loading...</h2>
      </div>
    </main>
  );
}

export default Loading;
