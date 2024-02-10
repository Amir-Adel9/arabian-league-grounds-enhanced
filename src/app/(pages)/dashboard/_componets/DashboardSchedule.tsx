import { Game, GameDay } from '@/utils/types/types';
import GameCard from './GameCard';
import { requestParams } from '@/utils/constants/requestParams';

const DashboardSchedule = ({ gameDays }: { gameDays: GameDay[] }) => {
  return (
    <div className='flex flex-col'>
      {gameDays.map((gameDay: GameDay, index: number) => {
        const { date, events } = gameDay;
        return (
          <div key={index}>
            <h2>{date}</h2>
            <div className='flex flex-wrap gap-2'>
              {events.map(async (event) => {
                const gameIds = await fetch(
                  `https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=en-US&id=${event.match.id}`,
                  requestParams
                )
                  .then((res) => res.json())
                  .then((res) => {
                    return res.data.event.match.games
                      .filter((game: Game) => {
                        return game.state === 'completed';
                      })
                      .map((game: Game) => {
                        return game.id;
                      });
                  });
                console.log(gameIds);
                return (
                  <GameCard
                    key={event.match.id}
                    teams={{
                      firstTeam: event.match.teams[0],
                      secondTeam: event.match.teams[1],
                    }}
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
