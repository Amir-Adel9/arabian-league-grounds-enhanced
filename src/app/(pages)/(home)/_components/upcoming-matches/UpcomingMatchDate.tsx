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
    targetDate.add(3, 'hour').format('DD/MM/YYYY HH:mm')
  );

  useEffect(() => {
    const userDate = targetDate.local();
    const newFormattedDate = userDate.format('DD/MM/YYYY HH:mm');
    setFormattedDate(newFormattedDate);
  }, []);

  return (
    <p className='text-accent-gold text-center w-full mt-1 col-span-3'>
      Date: {formattedDate}
    </p>
  );
};

export default UpcomingMatchCardDate;
