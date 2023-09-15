import Link from 'next/link';
import Image from 'next/image';
import PlayNow from '../dropdowns/PlayNowDropdown';
import PlayNowDropDown from '../dropdowns/PlayNowDropdown';
import { Menu } from 'lucide-react';

const Header = () => {
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
            <span className='hover:text-accent-gold cursor-pointer duration-300  font-bold'>
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
            {/* <PlayNowDropDown /> */}
            <span className='hover:text-accent-gold cursor-pointer duration-300 font-bold'>
              Stats
            </span>
          </li>
        </ul>
      </nav>

      <button className='hidden md:inline mr-10 border-primary border rounded-3xl w-[100px] h-9 hover:border-accent-gold hover:text-accent-gold duration-300 font-bold'>
        Sign in
      </button>
      <Menu className='inline md:hidden' size={32} />
    </header>
  );
};

export default Header;
