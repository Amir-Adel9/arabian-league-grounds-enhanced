import Image from 'next/image';

export default function StatsPage() {
  return (
    <main className='w-full min-h-screen relative flex flex-col justify-center items-center'>
      <Image
        src='/images/dinger.gif'
        alt='dinger Image'
        width={260}
        height={260}
        draggable={false}
      />
      <p className='text-2xl font-bold text-accent-gold font-inter'>
        Come back after the Arabian League week 1 games to see the stats!
      </p>
    </main>
  );
}
