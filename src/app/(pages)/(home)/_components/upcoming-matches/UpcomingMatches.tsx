'use client';
import { ReactNode } from 'react';

import { motion } from 'framer-motion';

const UpcomingMatches = (props: { children?: ReactNode }) => {
  return (
    <>
      <motion.h2
        initial={{ translateX: -100, opacity: 0 }}
        whileInView={{ translateX: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className='font-bold text-2xl md:text-4xl lg:text-5xl text-center font-kanit mb-7'
      >
        Upcoming Matches
      </motion.h2>
      <div className='my-auto flex flex-col gap-10 p-10 lg:flex-row lg:gap-0 lg:p-0 justify-around w-[85%]'>
        {/*  @ts-ignore Async Server Component */}
        {props.children}
      </div>
    </>
  );
};

export default UpcomingMatches;
