import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FantasyPlayer } from '@/entities/fantasy/fantasy.types';
import { lockInWildCard } from '../actions/wildcardActions';
import { toast } from 'sonner';
import { isLockInLocked } from '@/entities/fantasy/fantasy.helpers';

const WinningPlayerCard = ({
  player,
  selectedPlayer,
}: {
  player: FantasyPlayer;
  selectedPlayer: FantasyPlayer | null | undefined;
}) => {
  return (
    <Button
      variant={'outline'}
      className={`flex flex-col gap-2 flex-grow text-lg border rounded-lg h-auto duration-300 p-3 font-bold cursor-pointer`}
    >
      <div className='w-full flex items-center justify-center'>
        <Image
          src={player.teamLogo}
          alt='team logo'
          width={50}
          height={50}
          draggable={false}
          className='sm:w-[50px] sm:h-[50px]'
        />
      </div>
      <div className='text-lg text-accent-gold'>{player.summonerName}</div>
      {/* @ts-ignore */}
      <span className='text-base capitalize'>({player.kills} kills)</span>
      <span className='text-base capitalize'>{player.role}</span>
    </Button>
  );
};

export default WinningPlayerCard;
