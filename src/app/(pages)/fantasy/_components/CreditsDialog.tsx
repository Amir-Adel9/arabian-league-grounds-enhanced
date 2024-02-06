'use client';

import Link from 'next/link';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';

const CreditsDialog = ({ isCreatingTeam }: { isCreatingTeam: boolean }) => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (!isCreatingTeam || localStorage.getItem('credits_dialog')) return;
    setIsOpened(true);
  }, [isCreatingTeam]);

  return (
    <AlertDialog open={isOpened}>
      <AlertDialogTrigger onClick={() => setIsOpened(true)}>
        <span className='text-xl sm:text-2xl md:w-[320px] flex items-center gap-2 cursor-pointer md:text-2xl lg:text-3xl text-white/70  text-center font-rubik font-bold filter tracking-wider duration-300 hover:text-accent-gold'>
          Credits System
          <Info className='w-5 h-5 text-accent-gold cursor-pointer' />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-[525px] border-border text-white flex flex-col gap-6'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-accent-gold font-black text-center text-2xl font-rubik'>
            Welcome to AL Fantasy
          </AlertDialogTitle>
          <p className='text-center'>
            You are given <span className='font-semibold'>$700 credits </span>
            to start with and create your dream team of Arabian League pros
          </p>
        </AlertDialogHeader>
        <AlertDialogDescription className='flex flex-col gap-2'>
          <h6 className='w-full text-center text-accent-gold font-semibold text-lg font-geist'>
            How to aquire more credits?
          </h6>
          <ul className='flex flex-col gap-1'>
            <li>
              <span className='font-semibold text-white'>Fantasy Points:</span>{' '}
              <span className='font-semibold'>$0.5 credits</span> per point.
            </li>
            <li>
              <Link
                href={'/schedule'}
                target='_blank'
                className='font-semibold text-white'
              >
                Predictions:
              </Link>{' '}
              <span className='font-semibold'>$10 credits</span> for each
              correct match outcome prediction.
            </li>
            <li>
              <Link
                href={'/stats'}
                target='_blank'
                className='font-semibold text-white'
              >
                Weekly Wildcards:
              </Link>
              <span className='font-semibold'> $200 credits</span> for each
              correct guess.
            </li>
          </ul>
        </AlertDialogDescription>
        <AlertDialogAction
          onClick={() => {
            setIsOpened(false);
            localStorage.setItem('credits_dialog', 'true');
          }}
          className='w-[100%] bg-accent-gold text-secondary justify-self-center hover:opacity-90'
        >
          Confirm
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreditsDialog;
