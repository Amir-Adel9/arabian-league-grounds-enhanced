'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const PlayNowDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <span
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsOpen(true)}
        className=' hover:text-accent-gold cursor-pointer duration-300 font-bold'
      >
        Play Now <ChevronDown className='inline' size={18} />
      </span>

      {isOpen && (
        <ul
          className='absolute bg-accent-gold mt-2 p-[2px]'
          onMouseLeave={() => setIsOpen(false)}
        >
          <li className='hover:bg-secondary px-2'>Predict</li>
          <li className='hover:bg-secondary px-2'>Fantasy</li>
        </ul>
      )}
    </div>
  );
};

export default PlayNowDropDown;
