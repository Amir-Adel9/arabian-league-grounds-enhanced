'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='flex md:hidden '>
      <div
        className={`fixed w-full h-full bg-secondary top-0 left-0 rounded-lg ${
          !menuOpen
            ? 'opacity-0 translate-x-[90rem]'
            : 'opacity-80 translate-x-0'
        } duration-500 `}
      ></div>
      <div
        className={` bg-secondary top-0 z-[200] fixed h-screen w-2/3 right-0 duration-500 ${
          !menuOpen ? 'translate-x-[96rem]' : 'translate-x-0'
        } flex flex-col justify-start items-start gap-6 text-primary font-bold text-xl px-6 py-10 overflow-hidden`}
      >
        <div className='absolute w-12 h-12 z-[200] top-6 left-5'>
          <Link href='/'>
            <Image src='/al_logo.png' alt='' fill={true} draggable={false} />
          </Link>
        </div>
        <ul className='flex flex-col items-start justify-around h-1/2 w-full mt-[25%]'>
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
        <div className='absolute bottom-10 mr-5 duration-300 cursor-pointer w-full rounded  after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1  after:left-0 after:absolute after:-bottom-4 after:w-full'>
          <button className='mr- border-primary border rounded-3xl w-[100px] h-9 hover:border-accent-gold hover:text-accent-gold duration-300 font-bold'>
            Sign in
          </button>
        </div>
      </div>
      {!menuOpen ? (
        <Menu
          className='inline md:hidden hover:text-accent-gold cursor-pointer duration-300 '
          size={32}
          onClick={() => setMenuOpen(!menuOpen)}
        />
      ) : (
        <X
          className='inline md:hidden hover:text-accent-gold cursor-pointer duration-300 z-[502]'
          size={32}
          onClick={() => setMenuOpen(!menuOpen)}
        />
      )}
    </nav>
  );
};

export default MobileHeader;
