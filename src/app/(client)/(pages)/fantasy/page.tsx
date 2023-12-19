import {
  getTeamRosters,
  getTeamRostersByRole,
} from '@/utils/functions/getTeamRosters';

export default async function FantasyPage() {
  const teamRosters = await getTeamRosters();
  const teamRostersByRole = await getTeamRostersByRole();
  // console.log(teamRosters);
  console.log(teamRostersByRole['top']);
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

        <div className='flex flex-col items-center'>
          <h3 className='font-kanit text-xl mt-5'>Top Laners</h3>
          <div className='flex flex-row gap-2 justify-center items-center'>
            {teamRostersByRole['top'].map((player, i) => {
              return (
                <div
                  className='flex flex-col items-center cursor-pointer hover:bg-accent-gold hover:text-secondary rounded p-2'
                  key={i}
                >
                  <h4 className='font-kanit text-lg'>
                    {player.teamCode} {player.summonerName}
                  </h4>
                  {/* <h6>{player.teamName}</h6> */}
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h3 className='font-kanit text-xl mt-5'>Junglers</h3>
          <div className='flex flex-row gap-2 justify-center items-center'>
            {teamRostersByRole['jungle'].map((player, i) => {
              return (
                <div
                  className='flex flex-col items-center cursor-pointer hover:bg-accent-gold hover:text-secondary rounded p-2'
                  key={i}
                >
                  <h4 className='font-kanit text-lg'>
                    {player.teamCode} {player.summonerName}
                  </h4>
                  {/* <h6>{player.teamName}</h6> */}
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h3 className='font-kanit text-xl mt-5'>Mid Laners</h3>
          <div className='flex flex-row gap-2 justify-center items-center'>
            {teamRostersByRole['mid'].map((player, i) => {
              return (
                <div
                  className='flex flex-col items-center cursor-pointer hover:bg-accent-gold hover:text-secondary rounded p-2'
                  key={i}
                >
                  <h4 className='font-kanit text-lg'>
                    {player.teamCode} {player.summonerName}
                  </h4>
                  {/* <h6>{player.teamName}</h6> */}
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h3 className='font-kanit text-xl mt-5'>Bot Laners</h3>
          <div className='flex flex-row gap-2 justify-center items-center'>
            {teamRostersByRole['bot'].map((player, i) => {
              return (
                <div
                  className='flex flex-col items-center cursor-pointer hover:bg-accent-gold hover:text-secondary rounded p-2'
                  key={i}
                >
                  <h4 className='font-kanit text-lg'>
                    {player.teamCode} {player.summonerName}
                  </h4>
                  {/* <h6>{player.teamName}</h6> */}
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h3 className='font-kanit text-xl mt-5'>Supports</h3>
          <div className='flex flex-row gap-2 justify-center items-center'>
            {teamRostersByRole['support'].map((player, i) => {
              return (
                <div
                  className='flex flex-col items-center cursor-pointer hover:bg-accent-gold hover:text-secondary rounded p-2'
                  key={i}
                >
                  <h4 className='font-kanit text-lg'>
                    {player.teamCode} {player.summonerName}
                  </h4>
                  {/* <h6>{player.teamName}</h6> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
