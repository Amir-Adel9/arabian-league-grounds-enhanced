import {
  getTeamRosters,
  getTeamRostersByRole,
} from '@/utils/functions/getTeamRosters';
import FantasyTest from './_components/FantasyTest';

export default async function FantasyPage() {
  const teamRosters = await getTeamRosters();
  const teamRostersByRole = await getTeamRostersByRole();
  // console.log(teamRosters);

  return (
    <main className='w-full min-h-screen relative flex flex-col justify-start items-center text-primary'>
      <h1 className='font-rubik text-4xl mt-32'>Arabian League Fantasy Demo</h1>
      <h2 className='font-geist text-2xl mt-5'>2023 Summer Split</h2>
      <div className='w-full'>
        {/* {teamRosters.map((team, index) => {
          return (
            <div className='flex flex-col items-center' key={index}>
              <h3 className='font-kanit text-xl mt-5'>{team.teamName}</h3>
              <div className='flex flex-row gap-2 justify-center items-center'>
                {team.players.map((player, i) => {
                  return (
                    <div className='flex flex-col items-center' key={i}>
                      <h4 className='font-kanit text-lg'>
                        {player.summonerName}
                      </h4>
                      <h6>{player.role}</h6>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })} */}
        <FantasyTest roostersByRole={teamRostersByRole} />
      </div>
    </main>
  );
}
