import Image from 'next/image';
import Link from 'next/link';

function NotFound() {
  return (
    <section className='w-full min-h-screen relative flex flex-col justify-center items-center'>
      <div className='font-bold  relative w-full flex flex-col gap-4 justify-center items-center '>
        <Image
          src='/dinger.gif'
          alt='dinger Image'
          width={260}
          height={260}
          draggable={false}
        />
        <h2 className='text-4xl text-accent-gold font-rubik'>
          There was a problem
        </h2>
        <p className='text-center text-secondary font-inter text-xl'>
          The page you are looking for does not exist or has been moved.
        </p>
        <p className='text-secondary font-inter text-lg'>
          Go back to the{' '}
          <Link href='/' className='underline text-accent-gold'>
            home
          </Link>{' '}
          page.
        </p>
      </div>
    </section>
  );
}

export default NotFound;
