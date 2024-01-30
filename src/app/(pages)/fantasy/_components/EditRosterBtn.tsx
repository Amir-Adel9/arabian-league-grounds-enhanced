'use client';

import { checkWeekDay } from '@/entities/fantasy/fantasy.helpers';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const EditRosterBtn = () => {
  const router = useRouter();
  return (
    <button
      className='w-[320px] py-2 relative  rounded-md font-inter font-semibold text-secondary bg-accent-gold hover:brightness-105 hover:opacity-80 !duration-300'
      onClick={() => {
        const isInGameDay = checkWeekDay();
        if (isInGameDay) {
          toast.error('You cannot edit your roster on game days');
        } else {
          router.push('/fantasy/edit');
        }
      }}
    >
      Edit Roster
    </button>
  );
};

export default EditRosterBtn;
