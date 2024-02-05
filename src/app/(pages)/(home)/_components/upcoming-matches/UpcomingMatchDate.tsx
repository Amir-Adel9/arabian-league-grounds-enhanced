'use client';

import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);
dayjs.extend(timezone);

const UpcomingMatchCardDate = ({ matchDate }: { matchDate: string }) => {
  const targetDate = dayjs.utc(matchDate);
  const [formattedDate, setFormattedDate] = useState(
    targetDate.add(3, 'hour').format('MMMM DD HH:mm')
  );

  useEffect(() => {
    const userDate = targetDate.local();
    const newFormattedDate = userDate.format('MMMM DD HH:mm');
    setFormattedDate(newFormattedDate);
  }, []);

  return (
    <p className='text-accent-gold font-light font-kanit text-center w-full mt-2 col-span-full'>
      {formattedDate}
    </p>
  );
};

export default UpcomingMatchCardDate;
