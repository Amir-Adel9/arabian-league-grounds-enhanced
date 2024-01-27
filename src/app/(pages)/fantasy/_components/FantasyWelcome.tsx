'use client';

import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Balancer from 'react-wrap-balancer';
import CreateFantasyTeam from './CreateFantasyTeam';
import { TeamRostersByRole } from '@/utils/functions/getTeamRosters';
import { FantasyRoster } from '@/entities/fantasy/fantasy.types';
import { User } from '@/db/types';

const variants = {
  visible: { opacity: [0, 1] },
  hidden: { opacity: 0 },
};

const FantasyWelcome = ({
  rostersByRole,
  currentFantasyTeam,
  user,
}: {
  rostersByRole: TeamRostersByRole;
  currentFantasyTeam?: FantasyRoster;
  user?: User;
}) => {
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const welcomeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showCreateTeam) return;
    setTimeout(() => {
      welcomeRef.current?.style.setProperty('display', 'none');
      welcomeRef.current?.classList.remove('overflow-y-hidden');
    }, 500);
  }, [showCreateTeam]);
  return (
    <div className='relative w-full h-full overflow-x-hidden p-5 md:p-8 xl:p-16'>
      <motion.div
        animate={showCreateTeam ? 'hidden' : 'visible'}
        variants={variants}
        ref={welcomeRef}
        transition={{ duration: !showCreateTeam ? 2 : 0.5 }}
        className='h-full flex flex-col justify-center items-center gap-4 sm:gap-28'
      >
        <div className='flex flex-col items-center justify-center gap-4'>
          <div className='flex flex-col md:flex-row gap-1 items-center justify-center w-full'>
            <Image
              src='/images/al_logo.png'
              alt='Arabian League Logo'
              width={120}
              height={120}
              draggable={false}
              className='sm:w-[120px] sm:h-[120px] hidden xs:inline-block filter brightness-[0.7]'
            />
            <div className='flex flex-col '>
              <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white/70 text-center font-rubik font-bold filter tracking-wider'>
                AL Fantasy
              </h1>
              <h2 className='text-sm text-accent-gold brightness-90 text-center sm:text-start font-rubik font-bold filter tracking-wider animate-opacity'>
                <Balancer>Arabian League&apos;s peak experience</Balancer>
              </h2>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-10 justify-center items-center'>
          <div className='flex flex-col sm:flex-row justify-between gap-5 text-[#eff7ff9d]'>
            <div className='flex flex-col gap-2 '>
              <h6 className='text-center text-xl'>Scout</h6>
              <p className='max-w-xs text-center'>
                <Balancer>
                  The best pro players in the league and assemble your own dream
                  fantasy team.
                </Balancer>
              </p>
            </div>
            <div className='flex flex-col gap-2 '>
              <h6 className='text-center text-xl'>Manage</h6>
              <p className='max-w-xs text-center'>
                <Balancer>
                  Your fantasy team and make changes to the roster througuout
                  the split.
                </Balancer>
              </p>
            </div>
            <div className='flex flex-col gap-2 '>
              <h6 className='text-center text-xl'>Compete</h6>
              <p className='max-w-xs text-center'>
                <Balancer>
                  Against your friends and other players to see who has the best
                  fantasy team.
                </Balancer>
              </p>
            </div>
          </div>
          {!user ? (
            <SignInButton
              redirectUrl='/fantasy'
              afterSignInUrl='/fantasy'
              afterSignUpUrl='/fantasy'
            >
              <button className='flex gap-1 items-center group border border-accent-gold px-5 py-2 rounded-full'>
                <span className='group-hover:text-accent-gold duration-200'>
                  Create your team
                </span>
                <ArrowRight
                  size={20}
                  className='group-hover:translate-x-1 inline group-hover:text-accent-gold duration-200'
                />
              </button>
            </SignInButton>
          ) : (
            <button
              onClick={() => setShowCreateTeam(true)}
              className='flex gap-1 items-center group border border-accent-gold px-5 py-2 rounded-full'
            >
              <span className='group-hover:text-accent-gold duration-200'>
                Create your team
              </span>
              <ArrowRight
                size={20}
                className='group-hover:translate-x-1 inline group-hover:text-accent-gold duration-200'
              />
            </button>
          )}
        </div>
      </motion.div>
      {user && (
        <CreateFantasyTeam
          isShowing={showCreateTeam}
          rostersByRole={rostersByRole}
          currentFantasyTeam={currentFantasyTeam}
          user={user}
        />
      )}
    </div>
  );
};

export default FantasyWelcome;
