'use client';

import { useRouter } from 'next/navigation';

const CloseModalBtn = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.refresh();
        router.back();
      }}
      className='absolute top-0 right-0 z-[150] text-secondary mr-3 cursor-pointer font-rubik text-xl'
    >
      X
    </div>
  );
};

export default CloseModalBtn;
