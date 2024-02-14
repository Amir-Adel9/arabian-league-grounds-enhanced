import Link from 'next/link';

import { Goal, Medal, Swords, UserCircle } from 'lucide-react';
import MobileNavbar from './MobileNavbar';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  ToolTipArrow,
} from '@/components/ui/tooltip';
import WildCard from '../ui/wild-card';

const Navbar = () => {
  return (
    <>
      <nav className='hidden lg:flex fixed w-20 h-screen bg-background text-primary font-inter flex-col p-2 z-[500]'>
        <TooltipProvider delayDuration={0}>
          <ul className='flex flex-col items-start relative top-1/3 gap-14'>
            <Tooltip>
              <TooltipTrigger>
                <li className='duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
                  <Link href='/fantasy' className='flex gap-2 items-center'>
                    <Swords size={28} />
                  </Link>
                </li>
              </TooltipTrigger>
              <TooltipContent
                className='bg-accent-gold border-none font-medium text-secondary rounded-lg px-4 py-2'
                side='left'
                sideOffset={-10}
              >
                <p>Fantasy</p>
                <ToolTipArrow className='fill-accent-gold' />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <li className=' duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
                  <Link href='/predictions' className='flex gap-2 items-center'>
                    <Goal size={28} />
                  </Link>
                </li>
              </TooltipTrigger>
              <TooltipContent
                className='bg-accent-gold border-none font-medium text-secondary rounded-lg px-4 py-2'
                side='left'
                sideOffset={-10}
              >
                <p>Predictions</p>
                <ToolTipArrow className='fill-accent-gold' />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <li className='duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
                  <Link href='/wildcards' className='flex gap-2 items-center'>
                    <WildCard />
                  </Link>
                </li>
              </TooltipTrigger>
              <TooltipContent
                className='bg-accent-gold border-none font-medium text-secondary rounded-lg px-4 py-2'
                side='left'
                sideOffset={-10}
              >
                <p>Wildcards</p>
                <ToolTipArrow className='fill-accent-gold' />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <li className='duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
                  <Link
                    href='/leaderboard/fantasy'
                    className='flex gap-2 items-center'
                  >
                    <Medal size={28} />
                  </Link>
                </li>
              </TooltipTrigger>
              <TooltipContent
                className='bg-accent-gold border-none font-medium text-secondary rounded-lg px-4 py-2'
                side='left'
                sideOffset={-10}
              >
                <p>Leaderboard</p>
                <ToolTipArrow className='fill-accent-gold' />
              </TooltipContent>
            </Tooltip>
            {/* <Tooltip>
              <TooltipTrigger>
                <li className='duration-300 hover:text-accent-gold rounded-lg cursor-pointer px-4'>
                  <Link href='/profile' className='flex gap-2 items-center'>
                    <UserCircle size={28} />
                  </Link>
                </li>
              </TooltipTrigger>
              <TooltipContent
                className='bg-accent-gold border-none font-medium text-secondary rounded-lg px-4 py-2'
                side='left'
                sideOffset={-10}
              >
                <p>Profile</p>
                <ToolTipArrow className='fill-accent-gold' />
              </TooltipContent>
            </Tooltip> */}
          </ul>
        </TooltipProvider>
      </nav>
      <MobileNavbar />
    </>
  );
};

export default Navbar;
