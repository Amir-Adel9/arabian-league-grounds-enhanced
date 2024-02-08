'use client';

import { SignInButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

let featuresDiv: HTMLElement;
let upcomingMatchesDiv: HTMLElement;

const HeroButtons = () => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    featuresDiv = document.getElementById('features')!;
    upcomingMatchesDiv = document.getElementById('upcoming-matches')!;
  }, []);

  return (
    <>
      <SignedIn>
        <button
          onClick={() => {
            featuresDiv.scrollIntoView({ behavior: 'smooth' });
          }}
          className='bg-accent-gold w-40 rounded px-4 py-3 hover:bg-primary hover:text-secondary duration-300 delay-0 animate-translate-y'
        >
          <span className='font-rubik'>Get Started</span>
        </button>
      </SignedIn>
      <SignedOut>
        <SignInButton afterSignInUrl='/' afterSignUpUrl='/' redirectUrl='/'>
          <button className='bg-accent-gold w-40 rounded px-4 py-3 hover:bg-primary hover:text-secondary duration-300 delay-0 animate-translate-y'>
            <span className='font-rubik'>Get Started</span>
          </button>
        </SignInButton>
      </SignedOut>
      <button
        onClick={() =>
          upcomingMatchesDiv.scrollIntoView({ behavior: 'smooth' })
        }
        className='border-accent-gold border  rounded-3xl px-3 py-2 hover:border-accent-gold hover:text-accent-gold duration-300 animate-translate-y-late'
      >
        <span className='font-rubik'>Upcoming Matches</span>
      </button>
    </>
  );
};

export default HeroButtons;
