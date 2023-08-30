import Link from 'next/link';
import Image from 'next/image';
import { BadgeInfo, Goal, Medal, Trophy, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className=' fixed w-20 h-screen bg-secondary text-primary font-inter flex flex-col p-2 z-[500] group hover:w-72 duration-300 hover:border-r'>
      <ul className='flex flex-col items-start relative top-1/3 gap-14'>
        <li className='flex gap-2 items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Trophy size={28} />
          <span className='hidden group-hover:inline font-bold text-lg'>
            Fantasy
          </span>
        </li>
        <li className='flex gap-2 items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Medal size={28} />
          <span className='hidden group-hover:inline font-bold text-lg'>
            Leaderboard
          </span>
        </li>
        <li className='flex gap-2 items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Goal size={28} />
          <span className='hidden group-hover:inline font-bold text-lg'>
            Predictions
          </span>
        </li>
        <li className='flex gap-2 items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <UserCircle size={28} />
          <span className='hidden group-hover:inline font-bold text-lg'>
            Profile
          </span>
        </li>
        <li className='flex gap-2 items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <BadgeInfo size={28} />
          <span className='hidden group-hover:inline font-bold text-lg'>
            About
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
