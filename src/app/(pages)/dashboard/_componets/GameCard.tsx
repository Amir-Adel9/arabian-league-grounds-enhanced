import { Team } from '@/utils/types/types';
import Image from 'next/image';

const GameCard = ({
  teams,
}: {
  teams: {
    firstTeam: Team;
    secondTeam: Team;
  };
}) => {
  return (
    <div className='p-4 border border-border text-muted-foreground rounded-lg bg-card duration-300 hover:bg-accent-gold group  flex flex-col items-center justify-center'>
      <div className='flex gap-2'>
        <div className='flex flex-col gap-1'>
          <Image
            src={teams.firstTeam.image}
            alt={teams.firstTeam.name}
            width={80}
            height={80}
            className={`w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20  ${
              teams.firstTeam.result.outcome === 'loss'
                ? 'opacity-30 group-hover:opacity-100 duration-300'
                : ''
            }`}
            draggable={false}
          />
          <h3
            className={`hidden lg:inline  ${
              teams.firstTeam.result.outcome === 'win'
                ? 'text-accent-gold '
                : ' group-hover:text-primary'
            }`}
          >
            {teams.firstTeam.name}
          </h3>
          <h3
            className={`inline lg:hidden font-semibold group-hover:text-primary lg:font-normal ${
              teams.firstTeam.result.outcome === 'win' ? 'text-primary' : ''
            }`}
          >
            {teams.firstTeam.code}
          </h3>
        </div>
        <div className='flex flex-col gap-1'>
          <Image
            src={teams.secondTeam.image}
            alt={teams.secondTeam.name}
            width={80}
            height={80}
            className={`w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20  ${
              teams.secondTeam.result.outcome === 'loss'
                ? 'opacity-30 group-hover:opacity-100 duration-300'
                : ''
            }`}
            draggable={false}
          />
          <h3
            className={`hidden lg:inline  ${
              teams.secondTeam.result.outcome === 'win'
                ? 'text-accent-gold '
                : ' group-hover:text-primary'
            }`}
          >
            {teams.secondTeam.name}
          </h3>
          <h3
            className={`inline lg:hidden font-semibold group-hover:text-primary lg:font-normal ${
              teams.secondTeam.result.outcome === 'win' ? 'text-primary' : ''
            }`}
          >
            {teams.secondTeam.code}
          </h3>
        </div>
      </div>
      <div className='font-bold px-8 xl:px-14 hidden lg:inline'>
        <span
          className={`relative ${
            teams.secondTeam.result.outcome === 'win'
              ? 'before:content-["◀"] before: before:text-accent-gold before:text-xs'
              : ''
          }`}
        >
          {` ${teams.secondTeam.result.gameWins} `}
        </span>
        <span>- </span>
        <span
          className={`relative ${
            teams.secondTeam.result.outcome === 'win'
              ? 'after:content-["▶"]  after:text-accent-gold after:text-xs'
              : ''
          }`}
        >
          {`${teams.secondTeam.result.gameWins} `}
        </span>
      </div>
    </div>
  );
};

export default GameCard;
