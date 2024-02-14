import Link from 'next/link';
import { Goal, Info, Medal, Swords, Trophy, UserCircle } from 'lucide-react';
import WildCard from '../ui/wild-card';

const MobileNavbar = () => {
  return (
    <nav className='flex lg:hidden fixed bottom-0 w-screen h-16 bg-secondary text-primary font-inter p-2 z-[500] duration-300'>
      <ul className='flex justify-around items-center relative w-full '>
        <li className=' duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Link href='/fantasy' className='flex flex-col gap-1 items-center'>
            <Swords size={24} className='w-5 h-5 xs:w-auto xs:h-auto' />
            <span className='hidden xs:inline font-bold text-xs'>Fantasy</span>
          </Link>
        </li>
        <li className=' items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Link
            href='/predictions'
            className='flex flex-col gap-1 items-center'
          >
            <Goal size={24} className='w-5 h-5 xs:w-auto xs:h-auto' />
            <span className='hidden xs:inline font-bold text-xs'>
              Predictions
            </span>
          </Link>
        </li>
        <li className='duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Link href='/wildcards' className='flex flex-col gap-1 items-center'>
            <WildCard />
            <span className='hidden xs:inline font-bold text-xs'>
              Wildcards
            </span>
          </Link>
        </li>
        <li className=' items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Link
            href='/leaderboard/fantasy'
            className='flex flex-col gap-1 items-center'
          >
            <Medal size={24} className='w-5 h-5 xs:w-auto xs:h-auto' />
            <span className='hidden xs:inline font-bold text-xs'>
              Leaderboard
            </span>
          </Link>
        </li>
        {/* <li className=' items-center duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
          <Link href='/profile' className='flex flex-col gap-1 items-center'>
            <UserCircle size={24} className='w-5 h-5 xs:w-auto xs:h-auto' />
            <span className='hidden xs:inline font-bold text-xs'>Profile</span>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default MobileNavbar;
