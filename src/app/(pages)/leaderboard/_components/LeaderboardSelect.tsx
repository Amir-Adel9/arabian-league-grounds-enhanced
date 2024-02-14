'use client';

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
const LeaderboardSelect = ({
  sortBy,
}: {
  sortBy: 'predictions' | 'fantasy';
}) => {
  const router = useRouter();
  return (
    <Select
      onValueChange={(value) => {
        router.push(`/leaderboard/${value}`);
      }}
    >
      <SelectTrigger className=' outline-none'>
        {sortBy === 'predictions' ? 'Predictions' : 'Fantasy'}
      </SelectTrigger>
      <SelectContent className='border-border outline-none'>
        <SelectItem value='fantasy' className='cursor-pointer'>
          Fantasy
        </SelectItem>
        <SelectItem value='predictions' className='cursor-pointer'>
          Predictions
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LeaderboardSelect;
