'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

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
        } flex flex-col justify-start items-start gap-6 text-primary font-bold text-xl px-6 py-10 overflow-hidden border-l border-accent-gold`}
      >
        <div className='absolute w-12 h-12 z-[200] top-6 left-5'>
          <Link href='/'>
            <Image
              src='/images/al_logo.png'
              alt=''
              fill={true}
              draggable={false}
              onClick={() => setMenuOpen(false)}
            />
          </Link>
        </div>
        <ul className='flex flex-col items-start justify-around h-1/2 w-full mt-[25%]'>
          <li onClick={() => setMenuOpen(false)}>
            <Link href='/schedule'>
              <span className='hover:text-accent-gold cursor-pointer duration-300 font-bold'>
                Schedule
              </span>
            </Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link href='/standings'>
              <span className='hover:text-accent-gold cursor-pointer duration-300 font-bold'>
                Standings
              </span>
            </Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link href='/teams'>
              <span className='hover:text-accent-gold cursor-pointer duration-300 font-bold'>
                Teams
              </span>
            </Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link href='/stats'>
              <span className='hover:text-accent-gold cursor-pointer duration-300 font-bold'>
                Stats
              </span>
            </Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <SignedOut>
              <span className='hover:text-accent-gold cursor-pointer duration-300 font-bold'>
                <SignInButton />
              </span>
            </SignedOut>
            <SignedIn>
              <span className='hover:text-accent-gold cursor-pointer duration-300 font-bold'>
                <SignInButton />
              </span>
            </SignedIn>
          </li>
        </ul>
        <SignedIn>
          <div className='absolute bottom-10 '>
            <UserButton
              showName={true}
              appearance={{
                elements: {
                  userButtonBox: 'flex-row-reverse ',
                  userButtonOuterIdentifier: ' text-primary font-bold',
                },
              }}
            />
          </div>
        </SignedIn>
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
