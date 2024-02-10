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

const PointsDialog = () => {
  return (
    <AlertDialog
      defaultOpen={localStorage.getItem('points_dialog') ? false : true}
      onOpenChange={() => {
        localStorage.setItem('points_dialog', 'true');
      }}
    >
      <AlertDialogTrigger>
        <span className='text-xl sm:text-2xl md:w-[320px] flex items-center gap-2 cursor-pointer md:text-2xl lg:text-3xl text-white/70 text-center font-rubik font-bold filter tracking-wider duration-300 hover:text-accent-gold'>
          Points System
          <Info className='w-5 h-5 text-accent-gold cursor-pointer' />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-[525px] border-border text-white flex flex-col gap-6'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-accent-gold font-black text-center text-2xl font-rubik'>
            AL Fantasy
          </AlertDialogTitle>
          <p className='text-center'>
            You earn <span className='font-semibold'>Fantasy Points </span>
            based on the indvidual performance of each player in the Arabian
            League games
          </p>
        </AlertDialogHeader>
        <AlertDialogDescription className='flex flex-col gap-2'>
          <h6 className='w-full text-center text-accent-gold font-semibold text-lg font-geist'>
            How points are calculated?
          </h6>
          <ul className='flex flex-col gap-1'>
            <li>
              <span className='font-semibold text-white'>Wins:</span>{' '}
              <span className='font-semibold'>+5 points</span> per game won.
            </li>
            <li>
              <span className='font-semibold text-white'>Kills:</span>{' '}
              <span className='font-semibold'>+3 points</span> per kill.
            </li>
            <li>
              <span className='font-semibold text-white'>Deaths:</span>
              <span className='font-semibold'> -2 points</span> per death.
            </li>
            <li>
              <span className='font-semibold text-white'>Assists:</span>
              <span className='font-semibold'> +2 points</span> per death (only
              for support players).
            </li>
          </ul>
          <p>
            <span className='font-semibold'>Note:</span> The points are updated
            for all players after each game, only points since you added the
            player to your team will be counted.
          </p>
        </AlertDialogDescription>
        <AlertDialogAction className='w-[100%] bg-accent-gold text-secondary justify-self-center hover:opacity-90'>
          Confirm
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PointsDialog;
