import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header
      className='h-20 fixed w-full bg-secondary text-primary font-inter flex items-center justify-between z-[501] py-2 px-4'
      id='header'
    >
      <nav className='flex h-full gap-6'>
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

        <ul className='flex items-center gap-20 '>
          <li className='hover:text-accent-gold cursor-pointer duration-300'>
            Schedule
          </li>
          <li className='hover:text-accent-gold cursor-pointer duration-300'>
            Standings
          </li>
          <li className='hover:text-accent-gold cursor-pointer duration-300'>
            Teams
          </li>
        </ul>
      </nav>

      <button className='mr-10 border-primary border  rounded-3xl w-[100px] h-9  hover:border-accent-gold hover:text-accent-gold duration-300'>
        Sign in
      </button>
    </header>
  );
};

export default Header;
