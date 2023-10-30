'use client';

import { Prediction } from '@/db/schema';
import { Event, Team } from '@/utils/types/types';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

const LockInButton = ({
  event,
  currentPrediction,
  selectedTeam,
  islockedIn,
  setIsLockedIn,
}: {
  event: Event;
  currentPrediction: {
    status: 'lockedIn' | 'notLockedIn' | 'notLoggedIn';
    prediction: Prediction;
  };
  selectedTeam: Team | null | undefined;
  islockedIn: boolean;
  setIsLockedIn: (isLockedIn: boolean) => void;
}) => {
  const { user } = useUser();

  const { status, prediction } = currentPrediction;

  return (
    <>
      <SignedIn>
        <button
          onClick={async () => {
            if (status === 'lockedIn' || islockedIn)
              return toast.error('You have already locked in!');
            if (!selectedTeam) {
              toast.error('Please select a team!');
              throw new Error('No team selected!');
            }
            if (event.state === 'completed' || event.state === 'inProgress') {
              toast.error('This match has already been played.');
              throw new Error('Match has already been played.');
            } else {
              setIsLockedIn(true);
              fetch('/api/predictions/lock-in', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userClerkId: user?.id,
                  username: user?.username,
                  matchId: event.match.id,
                  winningTeamId: selectedTeam.code,
                  losingTeamId: event.match.teams.find((team: Team) => {
                    return team.code !== selectedTeam.code;
                  })?.code,
                  bestOf: event.match.strategy.count,
                } as Prediction),
              });
            }
            toast.success('Prediction Locked In!');
          }}
          className={`absolute bottom-0 sm: h-full lg:h-auto text-base font-mono shadow-lg font-bold p-1 px-8 duration-500 rounded cursor-pointer ${
            selectedTeam === event.match.teams[0] ||
            prediction.winningTeamId === event.match.teams[0].code
              ? 'bg-accent-blue text-accent-gold border border-accent-gold hover:bg-secondary hover:text-primary hover:opacity-90'
              : selectedTeam === event.match.teams[1] ||
                prediction.winningTeamId === event.match.teams[1].code
              ? 'bg-accent-gold text-accent-blue border border-accent-blue hover:bg-secondary hover:text-primary hover:opacity-90'
              : 'text-primary'
          } `}
          style={{
            background: `${
              !selectedTeam && status !== 'lockedIn'
                ? 'linear-gradient(-45deg, #bea85d 50%, #19485a 50%)'
                : ''
            } `,
            transition: 'background-color 0.5s ease-in-out',
          }}
        >
          <h1>
            {!selectedTeam && status !== 'lockedIn' && !islockedIn
              ? '(Select a Team)'
              : `#${
                  prediction.winningTeamId
                    ? prediction.winningTeamId
                    : selectedTeam?.code
                }_WIN${islockedIn || status === 'lockedIn' ? '' : '?'}`}
          </h1>
          <span className='hidden lg:inline'>
            {status == 'lockedIn' || islockedIn
              ? '(Locked In)'
              : selectedTeam
              ? '(Click to Lock In)'
              : ''}
          </span>
        </button>
      </SignedIn>
      <SignedOut>
        <button
          className={`absolute bottom-0 sm: h-full lg:h-auto text-base font-mono shadow-lg font-bold p-1 px-8 duration-500 rounded cursor-pointer ${
            selectedTeam === event.match.teams[0] ||
            prediction.winningTeamId === event.match.teams[0].code
              ? 'bg-accent-blue text-accent-gold border border-accent-gold hover:bg-secondary hover:text-primary hover:opacity-90'
              : selectedTeam === event.match.teams[1] ||
                prediction.winningTeamId === event.match.teams[1].code
              ? 'bg-accent-gold text-accent-blue border border-accent-blue hover:bg-secondary hover:text-primary hover:opacity-90'
              : 'text-primary'
          } `}
          style={{
            background: `${
              !selectedTeam && status !== 'lockedIn' && !islockedIn
                ? 'linear-gradient(-45deg, #bea85d 50%, #19485a 50%)'
                : ''
            } `,
            transition: 'background-color 0.5s ease-in-out',
          }}
        >
          <SignInButton redirectUrl={`/match/${event.match.id}`}>
            <div>
              <h1>
                {!selectedTeam && status !== 'lockedIn' && !islockedIn
                  ? '(Select a Team)'
                  : `#${
                      prediction.winningTeamId
                        ? prediction.winningTeamId
                        : selectedTeam?.code
                    }_WIN${islockedIn || status === 'lockedIn' ? '' : '?'}`}
              </h1>

              <span className='hidden lg:inline'>
                {status == 'lockedIn' || islockedIn
                  ? '(Locked In)'
                  : selectedTeam
                  ? '(Click to Lock In)'
                  : ''}
              </span>
            </div>
          </SignInButton>
        </button>
      </SignedOut>
    </>
  );
};

export default LockInButton;
