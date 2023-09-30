'use client';
import { motion } from 'framer-motion';
import { Balancer } from 'react-wrap-balancer';

import { Goal, Medal, Trophy } from 'lucide-react';
import Link from 'next/link';

const FeaturesCards = () => {
  return (
    <>
      <Link href='/fantasy' className='lg:w-1/4 xl:w-1/5 h-[500px]'>
        <motion.div
          initial={{ translateY: 140, opacity: 0 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true }}
          className='relative flex flex-col items-center justify-around bg-secondary w-full h-full text-center cursor-pointer rounded-2xl group hover:scale-105 duration-300 hover:text-secondary hover:rounded-sm p-3 shadow-2xl'
        >
          <div className='absolute bg-accent-gold w-full rounded-2xl scale-[1.01] cursor-pointer top-0 h-0 duration-300 group-hover:h-full group-hover:rounded-none z-10'></div>
          <div className='flex flex-col items-center justify-center gap-5 z-20'>
            <Trophy size={80} />
            <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold font-rubik '>
              Fantasy
            </h3>
          </div>
          <div className='z-20'>
            <p className='font-rubik  '>
              <Balancer>
                Assemble your dream team of your favorite Arabian League players
                and compete with your friends to see who has the best team.
              </Balancer>
            </p>
          </div>
          <span className='bg-primary text-secondary group-hover:bg-secondary group-hover:text-primary group-hover:rounded-none z-20 font-rubik font-b py-2 px-3 cursor-pointer rounded-sm duration-300 hover:scale-105 hover:opacity-95'>
            Create Team
          </span>
        </motion.div>
      </Link>
      <Link href='/predictions' className='lg:w-1/4 xl:w-1/5 h-[500px]'>
        <motion.div
          initial={{ translateY: 240, opacity: 0 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true }}
          className='relative flex flex-col items-center justify-around bg-secondary text-center  w-full h-full cursor-pointer rounded-2xl group hover:scale-105 duration-300 hover:text-secondary hover:rounded-sm p-3 shadow-2xl'
        >
          <div className='absolute bg-accent-gold w-full rounded-2xl scale-[1.01] cursor-pointer top-0 h-0 duration-300 group-hover:h-full group-hover:rounded-none z-10'></div>{' '}
          <div className='flex flex-col items-center justify-center gap-5 z-20'>
            <Goal size={80} />
            <h3 className='text-xl md:text-2xl lg:text-3xl xl::text-4xl font-bold font-rubik '>
              Predictions
            </h3>
          </div>
          <div className='z-20'>
            <p className='font-rubik'>
              <Balancer>
                Predict the outcome of Arabian League matches and compete with
                your friends to see who knows the Arabian League best.
              </Balancer>
            </p>
          </div>
          <span className='bg-primary text-secondary group-hover:bg-secondary group-hover:text-primary group-hover:rounded-none z-20 font-rubik font-b py-2 px-3 cursor-pointer rounded-sm duration-300 hover:scale-105 hover:opacity-95'>
            Predict Now
          </span>
        </motion.div>
      </Link>
      <Link href='/leaderboard' className='lg:w-1/4 xl:w-1/5 h-[500px]'>
        <motion.div
          initial={{ translateY: 340, opacity: 0 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true }}
          className='relative flex flex-col items-center justify-around bg-secondary text-center  w-full h-full cursor-pointer rounded-2xl group hover:scale-105 duration-300 hover:text-secondary hover:rounded-sm p-3 shadow-2xl'
        >
          <div className='absolute bg-accent-gold w-full rounded-2xl scale-[1.01] cursor-pointer top-0 h-0 duration-300 group-hover:h-full group-hover:rounded-none z-10'></div>{' '}
          <div className='flex flex-col items-center justify-center gap-5 z-20'>
            <Medal size={80} />
            <h3 className='text-xl md:text-2xl lg:text-3xl xl::text-4xl font-bold font-rubik  '>
              Leaderboard
            </h3>
          </div>
          <div className='z-20'>
            <p className='font-rubik  '>
              <Balancer>
                See how you stack up against the rest of the Arabian League
                Grounds community. Earn points by predicting matches correctly
                and having fantasy matches.
              </Balancer>
            </p>
          </div>
          <span className='bg-primary text-secondary group-hover:bg-secondary group-hover:text-primary group-hover:rounded-none z-20 font-rubik font-b py-2 px-3 cursor-pointer rounded-sm duration-300 hover:scale-105 hover:opacity-95'>
            View Rankings
          </span>
        </motion.div>
      </Link>
    </>
  );
};

export default FeaturesCards;
