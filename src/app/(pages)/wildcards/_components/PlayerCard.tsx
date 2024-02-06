'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FantasyPlayer } from '@/entities/fantasy/fantasy.types';
import { lockInWildCard } from '../actions/wildcardActions';
import { toast } from 'sonner';

const PlayerCard = ({
  player,
  selectedPlayer,
  setSelectedPlayer,
}: {
  player: FantasyPlayer;
  selectedPlayer: FantasyPlayer | null | undefined;
  setSelectedPlayer: React.Dispatch<
    React.SetStateAction<FantasyPlayer | null | undefined>
  >;
}) => {
  return (
    <Button
      variant={'outline'}
      onClick={async () => {
        setSelectedPlayer(player);
        await lockInWildCard({
          _wildcard: {
            name: 'killLeader',
            picked: player.summonerName,
          },
        })
          .then(() => toast.success('Wildcard locked in!'))
          .catch(() => toast.error('Error locking in wildcard'));
      }}
      className={`flex flex-col gap-2 w-[100px] text-lg border rounded-lg h-auto duration-300 p-3 font-bold cursor-pointer ${
        selectedPlayer?.summonerName === player.summonerName &&
        'bg-accent-gold text-secondary'
      }`}
    >
      <div className='w-full flex items-center justify-center'>
        <Image
          src={player.teamLogo}
          alt='team logo'
          width={40}
          height={40}
          draggable={false}
          className='sm:w-[40px] sm:h-[40px]'
        />
      </div>
      <div className='text-base'>{player.summonerName}</div>
      <span className='text-xs capitalize'>{player.role}</span>
    </Button>
  );
};

export default PlayerCard;
