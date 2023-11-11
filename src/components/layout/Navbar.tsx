import Link from 'next/link';

import { Goal, Info, Medal, Trophy, UserCircle } from 'lucide-react';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
  return (
    <>
      <nav className='hidden lg:flex fixed w-20 h-screen bg-secondary text-primary font-inter flex-col p-2 z-[500] group duration-300'>
        <ul className='flex flex-col items-start relative top-1/3 gap-14'>
          <li className='duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
            <Link href='/fantasy' className='flex gap-2 items-center'>
              <Trophy size={28} />
              <span className='hidden group-hover:inline font-bold text-lg'>
                Fantasy
              </span>
            </Link>
          </li>
          <li className=' duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
            <Link href='/predictions' className='flex gap-2 items-center'>
              <Goal size={28} />
              <span className='hidden group-hover:inline font-bold text-lg'>
                Predictions
              </span>
            </Link>
          </li>
          <li className='duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
            <Link href='/leaderboard' className='flex gap-2 items-center'>
              <Medal size={28} />
              <span className='hidden group-hover:inline font-bold text-lg'>
                Leaderboard
              </span>
            </Link>
          </li>
          <li className='duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
            <Link href='/profile' className='flex gap-2 items-center'>
              <UserCircle size={28} />
              <span className='hidden group-hover:inline font-bold text-lg'>
                Profile
              </span>
            </Link>
          </li>
          <li className='duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
            <Link href='/about' className='flex gap-2 items-center'>
              <Info size={28} />
              <span className='hidden group-hover:inline font-bold text-lg'>
                About
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <MobileNavbar />
    </>
  );
};

export default Navbar;
