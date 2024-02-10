'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { lockInWildCard } from '../actions/wildcardActions';
import { toast } from 'sonner';
import { isLockInLocked } from '@/entities/fantasy/fantasy.helpers';

const TeamCard = ({
  team,
  selectedTeam,
  setSelectedTeam,
}: {
  team: {
    name: string;
    logo: string;
  };
  selectedTeam:
    | {
        name: string;
        logo: string;
      }
    | null
    | undefined;
  setSelectedTeam: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          logo: string;
        }
      | null
      | undefined
    >
  >;
}) => {
  return (
    <Button
      variant={'outline'}
      onClick={async () => {
        if (isLockInLocked()) {
          return toast.error('You cannot lock in a wildcard on a game day.');
        } else {
          setSelectedTeam(team);
          await lockInWildCard({
            _wildcard: {
              name: 'baronSpecialists',
              picked: team.name,
            },
          })
            .then(() => toast.success('Wildcard locked in!'))
            .catch(() =>
              toast.error('You cannot lock in a wildcard on a game day.')
            );
        }
      }}
      className={`flex flex-col gap-2 w-[200px] text-lg border rounded-lg h-auto duration-300 p-3 font-bold cursor-pointer ${
        selectedTeam?.name === team.name && 'bg-accent-gold text-secondary'
      }`}
    >
      <div className='w-full flex items-center justify-center'>
        <Image
          src={team.logo}
          alt='team logo'
          width={40}
          height={40}
          draggable={false}
          className='sm:w-[40px] sm:h-[40px]'
        />
      </div>
      <div className='text-base'>{team.name}</div>
    </Button>
  );
};

export default TeamCard;
