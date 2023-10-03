'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { Balancer } from 'react-wrap-balancer';

const Talents = () => {
  return (
    <>
      <motion.h2
        initial={{ translateX: -100, opacity: 0 }}
        whileInView={{ translateX: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className='text-accent-gold font-bold text-2xl md:text-4xl lg:text-6xl text-center font-kanit'
      >
        Talents
      </motion.h2>
      <div className='my-auto flex flex-col gap-10 p-10 lg:flex-row lg:gap-0 lg:p-0 justify-around w-[85%]'>
        <div className='w-full bg-secondary h-[500px]'>k</div>
      </div>
    </>
  );
};

export default Talents;
