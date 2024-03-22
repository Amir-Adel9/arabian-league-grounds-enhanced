'use client';

import { Select } from '@/components/ui/select';
import { getTeamRosters } from '@/utils/functions/getTeamRosters';
import { Event, Team } from '@/utils/types/types';
import Image from 'next/image';

const GameCard = ({
  teams,
  event,
  playersInGame,
}: {
  teams: {
    firstTeam: Team;
    secondTeam: Team;
  };
  event: Event;
  playersInGame: any;
}) => {
  console.log(playersInGame);
  return (
    <div className='px-8 py-4 border border-border text-muted-foreground rounded-lg bg-card duration-300 group  flex flex-col items-center justify-center'>
      <div className='flex justify-between items-center gap-4'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <Image
            src={teams.firstTeam.image}
            alt={teams.firstTeam.name}
            width={50}
            height={50}
          />
          <h3
            className={`font-semibold font-rubik text-center ${
              teams.firstTeam.result.outcome === 'win'
                ? 'text-accent-gold '
                : ' group-hover:text-primary'
            }`}
          >
            {teams.firstTeam.code}
          </h3>
        </div>
        <div className='text-xl font-bold'>vs</div>
        <div className='flex flex-col justify-center items-center gap-2'>
          <Image
            src={teams.secondTeam.image}
            alt={teams.secondTeam.name}
            width={50}
            height={50}
          />
          <h3
            className={`font-semibold font-rubik text-center ${
              teams.secondTeam.result.outcome === 'win'
                ? 'text-accent-gold '
                : ' group-hover:text-primary'
            }`}
          >
            {teams.secondTeam.code}
          </h3>
        </div>
      </div>
      <span className=''>Best of: {event.match.strategy.count}</span>
      <div>
        First Blood:{' '}
        <Select>
          {/* {playersInGame.map((player) => (
            <option key={player.summonerName}>{player.summonerName}</option>
          ))} */}
        </Select>
      </div>
    </div>
  );
};

export default GameCard;
