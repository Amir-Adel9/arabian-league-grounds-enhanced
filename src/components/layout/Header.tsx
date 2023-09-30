import Link from 'next/link';
import Image from 'next/image';
import MobileHeader from './MobileHeader';
import { currentUser, SignInButton, UserButton } from '@clerk/nextjs';

const Header = async () => {
  const loggedInUser = await currentUser();

  return (
    <header
      className='h-20 fixed w-full bg-secondary text-primary font-inter flex items-center justify-between z-[501] py-2 px-4'
      id='header'
    >
      <nav className='flex h-full gap-6 items-center'>
        <Link href='/'>
          <div className='relative w-10 h-10 sm:w-14 sm:h-14 '>
            <Image
              src='/al_logo.png'
              alt='Arabian League Logo'
              fill={true}
              draggable={false}
            />
          </div>
        </Link>
        <ul className='hidden md:flex items-center gap-16'>
          <li>
            <span className='hover:text-accent-gold cursor-pointer duration-300 font-bold'>
              Schedule
            </span>
          </li>
          <li>
            <span className='hover:text-accent-gold cursor-pointer duration-300 font-bold'>
              Standings
            </span>
          </li>
          <li>
            <span className='hover:text-accent-gold cursor-pointer duration-300 font-bold'>
              Teams
            </span>
          </li>
          <li className=' cursor-pointer duration-300 font-bold'>
            <span className='hover:text-accent-gold cursor-pointer duration-300 font-bold'>
              Stats
            </span>
          </li>
        </ul>
      </nav>
      <div className='hidden md:inline'>
        {!loggedInUser ? (
          <button className='border-primary border rounded-3xl w-[100px] h-9 hover:border-accent-gold hover:text-accent-gold duration-300 font-bold'>
            <SignInButton />
          </button>
        ) : (
          <UserButton
            appearance={{
              elements: {
                userButtonOuterIdentifier: 'capitalize text-primary font-bold',
              },
            }}
          />
        )}
      </div>

      <MobileHeader />
    </header>
  );
};

export default Header;
