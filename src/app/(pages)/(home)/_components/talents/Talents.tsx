'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { Balancer } from 'react-wrap-balancer';
import { talentsArray } from '@/utils/constants/talents';
import TalentCard from './TalentCard';

const Talents = () => {
  return (
    <>
      <motion.h2
        initial={{ translateX: -100, opacity: 0 }}
        whileInView={{ translateX: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className='font-bold text-2xl md:text-4xl lg:text-5xl text-center font-kanit'
      >
        Talents
      </motion.h2>
      <div className='my-auto flex flex-col gap-10 py-10 lg:flex-row lg:gap-0 lg:p-0 justify-around w-[85%]'>
        <div className='w-full flex justify-center bg-card py-8 px-4 xl:p-10 border-border border rounded-xl'>
          <div className='flex flex-col lg:flex-row items-center justify-center gap-2 xl:gap-5'>
            {talentsArray.map((talent, index) => (
              <TalentCard key={index} talent={talent} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Talents;
