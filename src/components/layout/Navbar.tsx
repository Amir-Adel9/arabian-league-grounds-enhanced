import Link from 'next/link';
import Image from 'next/image';
import { BadgeInfo, Trophy } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className=' fixed w-20 h-screen bg-secondary text-primary font-inter flex flex-col p-2 z-[500] group hover:w-56 duration-300'>
      <ul className='flex flex-col items-start relative  top-1/3 gap-5'>
        <li className='flex gap-2 items-center duration-300 hover:text-accent-gold  cursor-pointer p-5'>
          <Trophy />
          {/* make header and navbar same height/width respectively */}
          <span className='hidden group-hover:inline font-bold text-2xl'>
            Leaderboard
          </span>
        </li>
        <li className='flex gap-2 duration-300 hover:text-accent-gold cursor-pointer p-5'>
          <Trophy />
          <span className='hidden group-hover:inline'>Leaderboard</span>
        </li>
        <li className='flex gap-2 duration-300 hover:text-accent-gold cursor-pointer p-5'>
          <Trophy />
          <span className='hidden group-hover:inline'>Leaderboard</span>
        </li>
        <li className='flex gap-2 duration-300 hover:text-accent-gold cursor-pointer p-5'>
          <BadgeInfo />
          <span className='hidden group-hover:inline'>About</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
