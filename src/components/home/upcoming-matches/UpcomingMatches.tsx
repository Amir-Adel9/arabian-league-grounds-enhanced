'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { Balancer } from 'react-wrap-balancer';

const UpcomingMatches = () => {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className='text-accent-gold font-bold md:2xl: text-4xl underline underline-offset-2 text-center font-kanit'
      >
        Upcoming Matches
      </motion.h2>
      <div className='my-auto flex flex-col gap-10 p-10 lg:flex-row lg:gap-0 lg:p-0 justify-around w-[85%]'>
        <div className='w-full bg-secondary h-[500px]'>k</div>
      </div>
    </>
  );
};

export default UpcomingMatches;
