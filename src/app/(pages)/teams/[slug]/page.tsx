import TeamMatchesSlider from './_componets/TeamMatchesSlider';
import { requestParams } from '@/utils/constants/requestParams';
import { getTeamRosters } from '@/utils/functions/getTeamRosters';

import Image from 'next/image';

async function Teams(props: any) {
  const { params } = props;
  const teamSlug = params.slug;
  const teamRosters = await getTeamRosters();
  const team = teamRosters.filter((team) => team.slug === teamSlug)[0];

  const teamData = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getTeams?hl=en-US&id=${teamSlug}`,
    requestParams
  )
    .then((res) => res.json())
    .then((data) => data.data.teams[0]);

  const teamMatches = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    requestParams
  )
    .then((res) => res.json())
    .then((data) => {
      const matchesWithTeam = data.data.schedule.events.filter((event: any) => {
        if (event.type !== 'match') return false;
        const matchTeams = event.match.teams;
        const teamNames = matchTeams.map((team: any) => team.name);
        return teamNames.includes(team.teamName);
      });
      return matchesWithTeam;
    });

  return (
    <main className='w-full min-h-screen relative overflow-x-hidden justify-start items-center text-primary lg:ml-20 lg:w-[calc(100%-5rem)] h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)] flex flex-col gap-5 font-geist'>
      <section className=' w-full min-h-screen relative flex flex-col justify-start items-center mt-20 '>
        <div className='relative w-full h-96 top-0'>
          <div className='absolute w-full h-full bg-secondary opacity-30 z-[10] top-0 left-0 rounded-lg border-b-2 border-border'></div>
          <div className='absolute bottom-0 left-0 m-10 z-50 text-2xl text-primary flex justify-center items-center'>
            <div className='relative w-32 h-32'>
              <Image
                src={`${teamData.image}`}
                alt=''
                fill={true}
                draggable={false}
              />
            </div>
            <div className='ml-2 flex flex-col '>
              <h1 className='text-5xl'>{teamData.name}</h1>
              <span className='text-base font-semibold text-[#8fa3b0]'>
                {teamData.homeLeague.name} - {teamData.homeLeague.region}
              </span>
            </div>
          </div>
          <Image
            src='/images/teamsbg.avif'
            alt=''
            fill={true}
            draggable={false}
          />
        </div>
        {/* <TeamMatchesSlider teamMatches={teamMatches} /> */}
        <div className='flex flex-col justify-center items-center lg:flex-row gap-5 relative w-[85%] bg-card border-border border text-primary p-4 xs:p-8 rounded-lg shadow-lg mt-16'>
          {team.players.map((player, index) => {
            return (
              <div
                className='relative border border-accent-gold flex w-full h-56 flex-col justify-between rounded-lg shadow-lg p-4 cursor-pointer duration-200  hover:scale-105'
                key={index}
              >
                <div className='absolute w-full h-full bg-secondary opacity-80 z-[10] top-0 left-0 rounded-lg '></div>
                <div className='absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-[6]  rounded-lg '>
                  <Image
                    src={`${teamData.image}`}
                    alt=''
                    fill={true}
                    draggable={false}
                  />
                </div>
                <Image
                  src='/images/background.jpg'
                  alt='Background Image'
                  className='w-full h-full z-[5] rounded-lg'
                  layout='fill'
                  objectFit='cover'
                  draggable={false}
                  objectPosition='center'
                />
                {player.role === 'top' ? (
                  <svg
                    className='icon z-50'
                    width='48'
                    height='48'
                    viewBox='0 0 400 400'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g>
                      <path
                        fill-rule='evenodd'
                        fill='#555d64'
                        d='M247.059, 247.059V164.706H164.706v82.353h82.353ZM352.936, 352.933V82.537l-47.054, 46.875v176.47l-176.309.019L82.532,352.933h270.4Z'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        fill='#c79e57'
                        d='M329.946, 47.1l-59.358,58.787H105.882V270.588L47.1,329.945,47.059,47.059Z'
                      ></path>
                    </g>
                  </svg>
                ) : player.role === 'jungle' ? (
                  <svg
                    className='icon z-50'
                    xmlns='http://www.w3.org/2000/svg'
                    width='48'
                    height='48'
                    viewBox='0 0 400 400'
                  >
                    <path
                      fill-rule='evenodd'
                      fill='#c79e57'
                      d='M294.118, 35.294c-25.034,38.865-60.555,80.6-81.959,134.935,8.81,21.507, 17.469,42.872,23.135,65.065,5.088-12.873,5.51-23.4, 11.765-35.294C247, 141.447,268.9,97.375,294.118,35.294m-141.177, 200c-17.5-52.79-56-81.948-105.882-105.882,45.506,36.9,52.025, 88.47,58.823,141.176l44.035,38.96c17.313,18.887, 44.514,48.694,50.083,55.158, 53.589-111.119-39.6-244.759-94.118-329.412C137.292, 112.618,161.376,156.962, 152.941,235.294Zm94.118,58.824c1.1,9.873-.075,13.739,0, 23.529l47.059-47.059c6.8-52.706,13.318-104.28, 58.823-141.176C290.728,159.259,260.4,221.817, 247.059,294.118Z'
                    ></path>
                  </svg>
                ) : player.role === 'mid' ? (
                  <svg
                    className='icon z-50'
                    width='48'
                    height='48'
                    viewBox='0 0 400 400'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g>
                      <path
                        fill-rule='evenodd'
                        fill='#555d64'
                        d='M305.755,199.6L352.9,152.569l0.039,200.372h-200L200,305.882H305.883Zm-58.7-152.541L199.753,94.1H94.1L94.117,200,47.065,246.79V47.068Z'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        fill='#c79e57'
                        d='M105.882,352.941l247.06-247.059V47.059H294.118L47.059,294.117v58.824h58.823Z'
                      ></path>
                    </g>
                  </svg>
                ) : player.role === 'bot' ? (
                  <svg
                    className='icon z-50'
                    xmlns='http://www.w3.org/2000/svg'
                    width='48'
                    height='48'
                    viewBox='0 0 400 400'
                  >
                    <g>
                      <path
                        fill-rule='evenodd'
                        fill='#555d64'
                        d='M152.942,152.941v82.353h82.352V152.941H152.942ZM47.064,47.067v270.4L93.6,270.436l0.52-176.318,176.31-.019,47.041-47.032H47.064Z'
                      ></path>
                      <path
                        fill-rule='evenodd'
                        fill='#c79e57'
                        d='M70.054,352.905l59.357-58.787H294.118V129.412L352.9,70.055l0.039,282.886Z'
                      ></path>
                    </g>
                  </svg>
                ) : player.role === 'support' ? (
                  <svg
                    className='icon z-50'
                    xmlns='http://www.w3.org/2000/svg'
                    width='48'
                    height='48'
                    viewBox='0 0 400 400'
                  >
                    <path
                      fill-rule='evenodd'
                      fill='#c8aa6e'
                      d='M317.647,200l-35.294-47.059h23.53c41.584,0,94.117-47.058,94.117-47.058H270.588l-35.294,35.293,23.53,82.354ZM245.026,35.3H153.673l-12.5,23.523L200,129.412l58.823-70.588L245.026,35.3m-33.262,117.64L200,164.706l-11.765-11.765L152.941,329.412,200,364.706l47.059-35.294ZM82.353,200l35.294-47.059H94.118C52.533,152.941,0,105.883,0,105.883H129.412l35.294,35.293-23.53,82.354Z'
                    ></path>
                  </svg>
                ) : (
                  ''
                )}
                <div className='flex flex-col items-start z-20'>
                  <h3 className='text-xl text-accent-gold font-bold mt-2 text-center'>
                    {player.summonerName}
                  </h3>
                  <h3 className='text-sm flex justify-between w-full items-center font-bold mt-2 text-center capitalize'>
                    {player.name}
                    <div className='relative h-5 w-8'>
                      <Image
                        src={player.flagUrl}
                        alt=''
                        fill={true}
                        draggable={false}
                      />
                    </div>
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Teams;
