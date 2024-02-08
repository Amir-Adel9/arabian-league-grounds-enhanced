'use client ';

let count = 0;
import { Button } from '@/components/ui/button';
import { Prediction } from '@/db/types';
import { Event, Team } from '@/utils/types/types';
import { toast } from 'sonner';

const PredictButton = ({
  event,
  teams,
  user,
  currentPrediction,
  isLockedIn,
  selectedTeam,
  setSelectedTeam,
  isPredicting,
  setIsLockedIn,
  setIsPredicting,
  color,
}: {
  color: 'bg-accent-gold' | 'bg-accent-blue';
  event: Event;
  teams: { firstTeam: Team; secondTeam: Team };
  user: { id: string | undefined; name: string | undefined | null };
  currentPrediction:
    | {
        status: 'lockedIn' | 'notLockedIn' | 'notLoggedIn';
        prediction: Prediction;
      }
    | undefined;
  isLockedIn: boolean;
  selectedTeam: Team | null | undefined;
  setSelectedTeam: React.Dispatch<
    React.SetStateAction<Team | null | undefined>
  >;
  isPredicting: boolean;
  setIsLockedIn: (isLockedIn: boolean) => void;
  setIsPredicting: (isPredicting: boolean) => void;
}) => {
  return (
    <button
      onClick={async () => {
        count++;
        setIsPredicting(true);
        if (currentPrediction?.status === 'notLoggedIn' && selectedTeam) {
          toast.error('Please sign in to predict!');
          throw new Error('Not logged in!');
        } else {
          if (currentPrediction?.status === 'lockedIn' && !isPredicting) {
            setSelectedTeam(null);
            return;
          } else if (!selectedTeam) {
            isPredicting && toast.error('Please select a team');
            throw new Error('No team selected!');
          } else if (
            event.state === 'completes' ||
            event.state === 'inProgress'
          ) {
            toast.error('This match has already been played.');
            throw new Error('Match has already been played.');
          } else if (
            event.match.teams[0].code === 'TBD' ||
            event.match.teams[1].code === 'TBD'
          ) {
            toast.error('Teams for this match are to be decided.');
            throw new Error('Teams for match have not been decided.');
          } else {
            setIsLockedIn(true);
            fetch('/api/match/prediction/lock-in', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userClerkId: user.id,
                username: user.name,
                matchId: event.match.id,
                winningTeamId: selectedTeam.code,
                losingTeamId: event.match.teams.find((team: Team) => {
                  return team.code !== selectedTeam.code;
                })?.code,
                bestOf: event.match.strategy.count,
              } as Prediction),
            });
          }
        }
        toast.success('Prediction Locked In!');
        setIsPredicting(false);
      }}
      className={`w-18 sm:w-28 h-8 ${color} text-primary py-1 px-2 rounded font-rubik z-10 duration-300 hover:filter hover:opacity-90 text-xs sm:text-sm font-medium`}
      hidden={teams.firstTeam.name === 'TBD' || teams.secondTeam.name === 'TBD'}
    >
      {currentPrediction?.status === 'lockedIn' && !isPredicting
        ? 'Edit'
        : selectedTeam
        ? 'Lock in'
        : isPredicting
        ? 'Pick a team'
        : currentPrediction?.status === 'lockedIn' || isLockedIn
        ? 'Edit'
        : 'Predict'}
    </button>
  );
};

export default PredictButton;
