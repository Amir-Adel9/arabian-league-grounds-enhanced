'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { Balancer } from 'react-wrap-balancer';

import { CalendarClock, ListOrdered, FileLineChart } from 'lucide-react';

const UpToDate = () => {
  return (
    <>
      <motion.h2
        initial={{ translateX: -100, opacity: 0 }}
        whileInView={{ translateX: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className='font-bold text-2xl md:text-4xl lg:text-5xl text-center font-kanit'
      >
        <Balancer>Stay up to date!</Balancer>
      </motion.h2>
      <div className='my-auto text-muted-foreground flex flex-col gap-10 py-10 lg:flex-row lg:gap-10 xl:gap-0 lg:p-0 justify-around w-[85%] font-geist '>
        <Link href='/schedule' className='lg:w-1/3 xl:w-1/4 h-[500px]'>
          <motion.div
            initial={{ translateY: 140, opacity: 0 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            className='relative flex flex-col items-center justify-around bg-card border border-border w-full h-full text-center cursor-pointer rounded-2xl group hover:scale-105 duration-300 hover:text-secondary hover:rounded-sm p-3'
          >
            <div className='absolute bg-accent-gold w-full rounded-2xl scale-[1.01] cursor-pointer top-0 h-0 duration-300 group-hover:h-full group-hover:rounded-none z-10'></div>
            <div className='flex flex-col items-center justify-center gap-5 z-20 text-primary group-hover:text-secondary'>
              <CalendarClock
                size={80}
                className='text-accent-gold group-hover:text-secondary'
              />

              <h3 className='text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold   '>
                Schedule
              </h3>
            </div>
            <div className='z-20'>
              <p className='font-inter'>
                <Balancer>
                  Never miss a game again. View the schedule for the Arabian
                  League matches throughout the split!
                </Balancer>
              </p>
            </div>
            <span className='bg-accent-gold text-secondary group-hover:bg-accent-blue group-hover:text-primary group-hover:rounded-none z-20  font-b py-2 px-3 cursor-pointer rounded-sm duration-300 hover:scale-105'>
              View Schedule
            </span>
          </motion.div>
        </Link>
        <Link href='/standings' className='lg:w-1/3 xl:w-1/4 h-[500px]'>
          <motion.div
            initial={{ translateY: 240, opacity: 0 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            className='relative flex flex-col items-center justify-around bg-card border border-border text-center  w-full h-full cursor-pointer rounded-2xl group hover:scale-105 duration-300 hover:text-secondary hover:rounded-sm p-3'
          >
            <div className='absolute bg-accent-gold w-full rounded-2xl scale-[1.01] cursor-pointer top-0 h-0 duration-300 group-hover:h-full group-hover:rounded-none z-10'></div>{' '}
            <div className='flex flex-col items-center justify-center gap-5 z-20 text-primary group-hover:text-secondary'>
              <ListOrdered
                size={80}
                className='text-accent-gold group-hover:text-secondary'
              />
              <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold  '>
                Standings
              </h3>
            </div>
            <div className='z-20'>
              <p className=''>
                <Balancer>
                  See how your favorite teams are doing in the Arabian League by
                  viewing the current standings!
                </Balancer>
              </p>
            </div>
            <span className='bg-accent-gold text-secondary group-hover:bg-accent-blue group-hover:text-primary group-hover:rounded-none z-20  font-b py-2 px-3 cursor-pointer rounded-sm duration-300 hover:scale-105'>
              View Standings
            </span>
          </motion.div>
        </Link>
        <Link href='/stats' className='lg:w-1/3 xl:w-1/4 h-[500px]'>
          <motion.div
            initial={{ translateY: 340, opacity: 0 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            className='relative flex flex-col items-center justify-around bg-card border border-border text-center  w-full h-full cursor-pointer rounded-2xl group hover:scale-105 duration-300 hover:text-secondary hover:rounded-sm p-3'
          >
            <div className='absolute bg-accent-gold w-full rounded-2xl scale-[1.01] cursor-pointer top-0 h-0 duration-300 group-hover:h-full group-hover:rounded-none z-10'></div>{' '}
            <div className='flex flex-col items-center justify-center gap-5 z-20 text-primary group-hover:text-secondary'>
              <FileLineChart
                size={80}
                className='text-accent-gold group-hover:text-secondary'
              />
              <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold '>
                Stats
              </h3>
            </div>
            <div className='z-20'>
              <p className='  '>
                <Balancer>
                  Ever wondered who has the most wards placed? Check out the
                  stats page for exciting stats about the games, players and
                  teams!
                </Balancer>
              </p>
            </div>
            <span className='bg-accent-gold text-secondary group-hover:bg-accent-blue group-hover:text-primary group-hover:rounded-none z-20  font-b py-2 px-3 cursor-pointer rounded-sm duration-300 hover:scale-105'>
              View Stats
            </span>
          </motion.div>
        </Link>
      </div>
    </>
  );
};

export default UpToDate;
