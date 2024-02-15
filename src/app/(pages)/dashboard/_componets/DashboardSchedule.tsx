import { Game, GameDay } from '@/utils/types/types';
import GameCard from './GameCard';
import { requestParams } from '@/utils/constants/requestParams';
import { getTeamRosters } from '@/utils/functions/getTeamRosters';

const DashboardSchedule = ({ gameDays }: { gameDays: GameDay[] }) => {
  return (
    <div className='flex flex-col gap-2'>
      {gameDays.map((gameDay: GameDay, index: number) => {
        const { date, events } = gameDay;
        return (
          <div className='flex flex-col gap-2' key={index}>
            <h2>{date}</h2>
            <div className='flex flex-wrap gap-2'>
              {events.map(async (event) => {
                const playersInGame = await getTeamRosters().then((teams) =>
                  teams
                    .filter(
                      (team) =>
                        team.teamCode === event.match.teams[0].code ||
                        team.teamCode === event.match.teams[1].code
                    )
                    .map((team) => team.players)
                );
                return (
                  <GameCard
                    key={event.match.id}
                    teams={{
                      firstTeam: event.match.teams[0],
                      secondTeam: event.match.teams[1],
                    }}
                    event={event}
                    playersInGame={playersInGame}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardSchedule;
