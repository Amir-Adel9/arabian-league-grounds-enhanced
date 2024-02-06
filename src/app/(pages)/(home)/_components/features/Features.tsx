'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { Balancer } from 'react-wrap-balancer';

import { Goal, Medal, Trophy } from 'lucide-react';

import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

const Features = () => {
  return (
    <>
      <motion.h2
        initial={{ translateX: -100, opacity: 0 }}
        whileInView={{ translateX: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className='font-bold text-2xl md:text-4xl lg:text-5xl text-center font-kanit'
      >
        <Balancer>Enhance your Arabian League experience!</Balancer>
      </motion.h2>
      <div className='my-auto flex flex-col gap-10 py-10 text-muted-foreground lg:flex-row lg:gap-10 xl:gap-0 lg:p-0 justify-around w-[85%] font-geist'>
        <Link href='/fantasy' className='lg:w-1/3 xl:w-1/4 h-[500px]'>
          <motion.div
            initial={{ translateY: 140, opacity: 0 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            className='relative flex flex-col items-center justify-around bg-card border border-border w-full h-full text-center cursor-pointer rounded-2xl group hover:scale-105 duration-300 hover:text-secondary hover:rounded-sm p-3 '
          >
            <div className='absolute bg-accent-gold w-full rounded-2xl scale-[1.01] cursor-pointer top-0 h-0 duration-300 group-hover:h-full group-hover:rounded-none z-10'></div>
            <div className='flex flex-col items-center justify-center gap-5 z-20 text-primary group-hover:text-secondary'>
              <Trophy
                size={80}
                className='text-accent-gold group-hover:text-secondary'
              />
              <h3 className='text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold   duration-300'>
                Fantasy
              </h3>
            </div>
            <div className='z-20'>
              <p>
                <Balancer>
                  Assemble a dream team of your favorite Arabian League players
                  and compete with your friends to see who has the best team!
                </Balancer>
              </p>
            </div>
            <span className='bg-accent-gold text-secondary group-hover:bg-accent-blue group-hover:text-primary group-hover:rounded-none z-20  font-b py-2 px-3 cursor-pointer rounded-sm duration-300 hover:scale-105'>
              Create Team
            </span>
          </motion.div>
        </Link>
        <Link href='/predictions' className='lg:w-1/3 xl:w-1/4 h-[500px]'>
          <motion.div
            initial={{ translateY: 240, opacity: 0 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            className='relative flex flex-col items-center justify-around bg-card border border-border text-center  w-full h-full cursor-pointer rounded-2xl group hover:scale-105 duration-300 hover:text-secondary hover:rounded-sm p-3 '
          >
            <div className='absolute bg-accent-gold w-full rounded-2xl scale-[1.01] cursor-pointer top-0 h-0 duration-300 group-hover:h-full group-hover:rounded-none z-10'></div>{' '}
            <div className='flex flex-col items-center justify-center gap-5 z-20 text-primary group-hover:text-secondary'>
              <Goal
                size={80}
                className='text-accent-gold group-hover:text-secondary duration-300'
              />
              <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold  duration-300'>
                Predictions
              </h3>
            </div>
            <div className='z-20'>
              <p className=''>
                <Balancer>
                  Predict the outcome of Arabian League matches and compete with
                  your friends to see who knows the Arabian League best!
                </Balancer>
              </p>
            </div>
            <SignedIn>
              <span className='bg-accent-gold text-secondary group-hover:bg-accent-blue group-hover:text-primary group-hover:rounded-none z-20  font-b py-2 px-3 cursor-pointer rounded-sm duration-300 hover:scale-105'>
                Predict Now
              </span>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <span className='bg-accent-gold text-secondary group-hover:bg-accent-blue group-hover:text-primary group-hover:rounded-none z-20  font-b py-2 px-3 cursor-pointer rounded-sm duration-300 hover:scale-105'>
                  Predict Now
                </span>
              </SignInButton>
            </SignedOut>
          </motion.div>
        </Link>
        <Link
          href='/leaderboard/predictions'
          className='lg:w-1/3 xl:w-1/4 h-[500px]'
        >
          <motion.div
            initial={{ translateY: 340, opacity: 0 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            className='relative flex flex-col items-center justify-around bg-card border border-border text-center  w-full h-full cursor-pointer rounded-2xl group hover:scale-105 duration-300 hover:text-secondary hover:rounded-sm p-3 '
          >
            <div className='absolute bg-accent-gold w-full rounded-2xl scale-[1.01] cursor-pointer top-0 h-0 duration-300 group-hover:h-full group-hover:rounded-none z-10'></div>
            <div className='flex flex-col items-center justify-center gap-5 z-20 text-primary group-hover:text-secondary'>
              <Medal
                size={80}
                className='text-accent-gold group-hover:text-secondary duration-300'
              />
              <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold  duration-300'>
                Leaderboard
              </h3>
            </div>
            <div className='z-20'>
              <p className='  '>
                <Balancer>
                  See how you stack up against the rest of the Arabian League
                  Grounds community. Earn points by predicting matches correctly
                  and having a preforming team in fantasy matches!
                </Balancer>
              </p>
            </div>
            <span className='bg-accent-gold text-secondary group-hover:bg-accent-blue group-hover:text-primary group-hover:rounded-none z-20  font-b py-2 px-3 cursor-pointer rounded-sm duration-300 hover:scale-105'>
              View Rankings
            </span>
          </motion.div>
        </Link>
      </div>
    </>
  );
};

export default Features;
