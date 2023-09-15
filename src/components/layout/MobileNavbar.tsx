import Link from 'next/link';
import { Goal, Info, Medal, Trophy, UserCircle } from 'lucide-react';

const MobileNavbar = () => {
  return (
    <nav className='flex lg:hidden fixed bottom-0 w-screen h-16 bg-secondary text-primary font-inter p-2 z-[500] duration-300'>
      <ul className='flex justify-around items-center relative w-full '>
        <li className='flex flex-col gap-1 items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Trophy size={24} className='w-5 h-5 xs:w-auto xs:h-auto' />
          <span className='hidden xs:inline font-bold text-xs'>Fantasy</span>
        </li>
        <li className='flex flex-col gap-1 items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Medal size={24} className='w-5 h-5 xs:w-auto xs:h-auto' />
          <span className='hidden xs:inline font-bold text-xs'>
            Leaderboard
          </span>
        </li>
        <li className='flex flex-col gap-1 items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Goal size={24} className='w-5 h-5 xs:w-auto xs:h-auto' />
          <span className='hidden xs:inline font-bold text-xs'>
            Predictions
          </span>
        </li>
        <li className='flex flex-col gap-1 items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <UserCircle size={24} className='w-5 h-5 xs:w-auto xs:h-auto' />
          <span className='hidden xs:inline font-bold text-xs'>Profile</span>
        </li>
        <li className='flex flex-col gap-1 items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Info size={24} className='w-5 h-5 xs:w-auto xs:h-auto' />
          <span className='hidden xs:inline font-bold text-xs'>About</span>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
