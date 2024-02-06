import { TeamRostersByRole } from '@/utils/functions/getTeamRosters';

import { User } from '@/db/types';
import { FantasyRoster } from '@/entities/fantasy/fantasy.types';

import Image from 'next/image';
import { getFantasyTeamStats } from '@/entities/fantasy/fantasy.actions';
import EditRosterBtn from './EditRosterBtn';
import Link from 'next/link';
import {
  ToolTipArrow,
  Tooltip,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import PointsDialog from './PointsDialog';
const Fantasy = async ({
  rostersByRole,
  currentFantasyTeam,
  user,
}: {
  rostersByRole: TeamRostersByRole;
  currentFantasyTeam: FantasyRoster;
  user: User;
}) => {
  const stats = await getFantasyTeamStats();
  // console.log(stats);
  return (
    <div className='relative w-full h-full overflow-x-hidden p-5 md:p-8 xl:p-16'>
      <div className='w-full h-full flex flex-col items-center gap-4 sm:gap-20'>
        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/70 text-center font-rubik font-bold filter tracking-wider mt-16'>
          Your current line-up
        </h2>
        <TooltipProvider delayDuration={0}>
          <div className='items-center flex flex-col text-muted-foreground lg:flex-row gap-5 justify-center w-full font-geist'>
            <div className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-4 abs hover:-translate-y-10 '>
              {currentFantasyTeam.top && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-lg left-3'>
                    ${currentFantasyTeam.top.cost}
                  </span>
                  <Image
                    src={currentFantasyTeam.top.teamLogo}
                    alt='team logo'
                    width={50}
                    height={50}
                    draggable={false}
                    className='sm:w-[50px] sm:h-[50px] absolute right-3'
                  />
                </div>
              )}
              <div className='w-full flex flex-col items-center justify-center gap-5 z-20 text-primary'>
                <Image
                  src='/images/top_icon.png'
                  alt='role icon'
                  width={60}
                  height={60}
                  draggable={false}
                  className='sm:w-[60px] sm:h-[60px] filter brightness-[0.7]'
                />
                <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold '>
                  Top
                </h3>
              </div>
              <div className=' font-bold font-kanit flex flex-col justify-center items-center'>
                <span className='text-accent-gold text-2xl'>
                  {currentFantasyTeam.top.teamName}
                </span>
                <span className='text-xl'>
                  {currentFantasyTeam.top.summonerName}
                </span>
                <div className='relative h-5 w-8 mt-2'>
                  <Image
                    src={currentFantasyTeam.top.flagUrl}
                    alt=''
                    title={currentFantasyTeam.top.nationality}
                    fill={true}
                    draggable={false}
                  />
                </div>
              </div>
              <div className='flex justify-center w-full border-y border-border py-4'>
                <div className='flex flex-col gap-2 items-center mx-auto'>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Kills:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        <span className='font-bold'>
                          {stats.top.pointsFromKA / 3}
                        </span>
                      </span>
                      {` +(${stats.top.pointsFromKA})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Deaths:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {String(stats.top.pointsFromDeaths / 2).split('-')}
                      </span>
                      {` -(${String(stats.top.pointsFromDeaths)
                        .split('-')
                        .join('')})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Wins:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {stats.top.pointsFromGameWins / 5}
                      </span>
                      {` +(${stats.top.pointsFromGameWins})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Points:</span>
                    <span className='text-start font-bold'>
                      {stats.top.totalFantasyPoints}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '>
              {currentFantasyTeam.jungle && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-lg left-3'>
                    ${currentFantasyTeam.jungle.cost}
                  </span>
                  <Image
                    src={currentFantasyTeam.jungle.teamLogo}
                    alt='team logo'
                    width={50}
                    height={50}
                    draggable={false}
                    className='sm:w-[50px] sm:h-[50px] absolute right-3'
                  />
                </div>
              )}
              <div className='w-full flex flex-col items-center justify-center gap-5 z-20 text-primary'>
                <Image
                  src='/images/jungle_icon.png'
                  alt='role icon'
                  width={60}
                  height={60}
                  draggable={false}
                  className='sm:w-[60px] sm:h-[60px] filter brightness-[0.7]'
                />
                <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold '>
                  Jungle
                </h3>
              </div>
              <div className=' font-bold font-kanit flex flex-col justify-center items-center'>
                <span className='text-accent-gold text-2xl'>
                  {currentFantasyTeam.jungle.teamName}
                </span>
                <span className='text-xl'>
                  {currentFantasyTeam.jungle.summonerName}
                </span>
                <div className='relative h-5 w-8 mt-2'>
                  <Image
                    src={currentFantasyTeam.jungle.flagUrl}
                    alt=''
                    title={currentFantasyTeam.jungle.nationality}
                    fill={true}
                    draggable={false}
                  />
                </div>
              </div>
              <div className='flex justify-center w-full border-y border-border py-4'>
                <div className='flex flex-col gap-2 items-center mx-auto'>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Kills:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {stats.jungle.pointsFromKA / 3}
                      </span>
                      {` +(${stats.jungle.pointsFromKA})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Deaths:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {String(stats.jungle.pointsFromDeaths / 2).split('-')}
                      </span>

                      {` -(${String(stats.jungle.pointsFromDeaths)
                        .split('-')
                        .join('')})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Wins:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {stats.jungle.pointsFromGameWins / 5}
                      </span>
                      {` +(${stats.jungle.pointsFromGameWins})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Points:</span>
                    <span className='text-start font-bold'>
                      {stats.jungle.totalFantasyPoints}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '>
              {currentFantasyTeam.mid && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-lg left-3'>
                    ${currentFantasyTeam.mid.cost}
                  </span>
                  <Image
                    src={currentFantasyTeam.mid.teamLogo}
                    alt='team logo'
                    width={50}
                    height={50}
                    draggable={false}
                    className='sm:w-[50px] sm:h-[50px] absolute right-3'
                  />
                </div>
              )}
              <div className='w-full flex flex-col items-center justify-center gap-5 z-20 text-primary'>
                <Image
                  src='/images/mid_icon.png'
                  alt='role icon'
                  width={60}
                  height={60}
                  draggable={false}
                  className='sm:w-[60px] sm:h-[60px] filter brightness-[0.7]'
                />
                <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold '>
                  Mid
                </h3>
              </div>
              <div className=' font-bold font-kanit flex flex-col justify-center items-center'>
                <span className='text-accent-gold text-2xl'>
                  {currentFantasyTeam.mid.teamName}
                </span>
                <span className='text-xl'>
                  {currentFantasyTeam.mid.summonerName}
                </span>
                <div className='relative h-5 w-8 mt-2'>
                  <Image
                    src={currentFantasyTeam.mid.flagUrl}
                    alt=''
                    title={currentFantasyTeam.mid.nationality}
                    fill={true}
                    draggable={false}
                  />
                </div>
              </div>
              <div className='flex justify-center w-full border-y border-border py-4'>
                <div className='flex flex-col gap-2 items-center mx-auto'>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Kills:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {stats.mid.pointsFromKA / 3}{' '}
                      </span>
                      {`+(${stats.mid.pointsFromKA})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Deaths:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {String(stats.mid.pointsFromDeaths / 2).split('-')}
                      </span>
                      {` -(${String(stats.mid.pointsFromDeaths)
                        .split('-')
                        .join('')})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Wins:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {stats.mid.pointsFromGameWins / 5}
                      </span>
                      {` +(${stats.mid.pointsFromGameWins})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Points:</span>
                    <span className='text-start font-bold'>
                      {stats.mid.totalFantasyPoints}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '>
              {currentFantasyTeam.bot && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-lg left-3'>
                    ${currentFantasyTeam.bot.cost}
                  </span>
                  <Image
                    src={currentFantasyTeam.bot.teamLogo}
                    alt='team logo'
                    width={50}
                    height={50}
                    draggable={false}
                    className='sm:w-[50px] sm:h-[50px] absolute right-3'
                  />
                </div>
              )}
              <div className='w-full flex flex-col items-center justify-center gap-5 z-20 text-primary'>
                <Image
                  src='/images/bot_icon.png'
                  alt='role icon'
                  width={60}
                  height={60}
                  draggable={false}
                  className='sm:w-[60px] sm:h-[60px] filter brightness-[0.7]'
                />
                <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold '>
                  Bot
                </h3>
              </div>
              <div className=' font-bold font-kanit flex flex-col justify-center items-center'>
                <span className='text-accent-gold text-2xl'>
                  {currentFantasyTeam.bot.teamName}
                </span>
                <span className='text-xl'>
                  {currentFantasyTeam.bot.summonerName}
                </span>
                <div className='relative h-5 w-8 mt-2'>
                  <Image
                    src={currentFantasyTeam.bot.flagUrl}
                    alt=''
                    title={currentFantasyTeam.bot.nationality}
                    fill={true}
                    draggable={false}
                  />
                </div>
              </div>
              <div className='flex justify-center w-full border-y border-border py-4'>
                <div className='flex flex-col gap-2 items-center mx-auto'>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Kills:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        <span className='font-bold'>
                          {' '}
                          {stats.bot.pointsFromKA / 3}
                        </span>
                      </span>
                      {` +(${stats.bot.pointsFromKA})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Deaths:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {String(stats.bot.pointsFromDeaths / 2).split('-')}
                      </span>
                      {` -(${String(stats.bot.pointsFromDeaths)
                        .split('-')
                        .join('')})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Wins:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {' '}
                        {stats.bot.pointsFromGameWins / 5}
                      </span>

                      {` +(${stats.bot.pointsFromGameWins})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Points:</span>
                    <span className='text-start font-bold'>
                      {stats.bot.totalFantasyPoints}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '>
              {currentFantasyTeam.support && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-lg left-3'>
                    ${currentFantasyTeam.support.cost}
                  </span>
                  <Image
                    src={currentFantasyTeam.support.teamLogo}
                    alt='team logo'
                    width={50}
                    height={50}
                    draggable={false}
                    className='sm:w-[50px] sm:h-[50px] absolute right-3'
                  />
                </div>
              )}
              <div className='w-full flex flex-col items-center justify-center gap-5 z-20 text-primary'>
                <Image
                  src='/images/support_icon.png'
                  alt='role icon'
                  width={60}
                  height={60}
                  draggable={false}
                  className='sm:w-[60px] sm:h-[60px] filter brightness-[0.7]'
                />
                <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold '>
                  Support
                </h3>
              </div>
              <div className=' font-bold font-kanit flex flex-col justify-center items-center'>
                <span className='text-accent-gold text-2xl'>
                  {currentFantasyTeam.support.teamName}
                </span>
                <span className='text-xl'>
                  {currentFantasyTeam.support.summonerName}
                </span>
                <div className='relative h-5 w-8 mt-2'>
                  <Image
                    src={currentFantasyTeam.support.flagUrl}
                    alt=''
                    title={currentFantasyTeam.support.nationality}
                    fill={true}
                    draggable={false}
                  />
                </div>
              </div>
              <div className='flex justify-center w-full border-y border-border py-4'>
                <div className='flex flex-col gap-2 items-center mx-auto'>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Assists:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {stats.support.pointsFromKA / 2}{' '}
                      </span>
                      {`+(${stats.support.pointsFromKA})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Deaths:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {String(stats.support.pointsFromDeaths / 2).split('-')}
                      </span>
                      {` -(${String(stats.support.pointsFromDeaths)
                        .split('-')
                        .join('')})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Wins:</span>
                    <span className='text-start'>
                      <span className='font-bold'>
                        {stats.support.pointsFromGameWins / 5}
                      </span>
                      {` +(${stats.support.pointsFromGameWins})`}
                    </span>
                  </div>
                  <div className='flex gap-1 items-start'>
                    <span className='text-start'>Points:</span>
                    <span className='text-start font-bold'>
                      {stats.support.totalFantasyPoints}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-y-2 relative justify-between items-center w-full'>
            <div className='flex flex-col gap-1 items-center md:items-start'>
              <span className='sm:text-lg md:text-xl lg:text-2xl text-white/70  font-rubik font-bold filter tracking-wide'>
                Current roster Points:{' '}
                {stats.bot.totalFantasyPoints +
                  stats.top.totalFantasyPoints +
                  stats.mid.totalFantasyPoints +
                  stats.jungle.totalFantasyPoints +
                  stats.support.totalFantasyPoints}
              </span>
              <span className='flex gap-2 items-center sm:text-lg md:text-xl lg:text-2xl text-white/70  font-rubik font-bold filter tracking-wider'>
                Total Fantasy Points: {user.fantasyPoints}
                <Tooltip>
                  <TooltipTrigger>
                    <Info className='w-5 h-5 text-accent-gold cursor-pointer' />
                  </TooltipTrigger>
                  <TooltipContent className='text-secondary bg-accent-gold max-w-xs p-2 border-none'>
                    <span className='text-sm tracking-normal font-normal'>
                      A grand total that also includes previous players&apos;
                      points.
                    </span>
                    <ToolTipArrow className='fill-accent-gold' />
                  </TooltipContent>
                </Tooltip>
              </span>
            </div>
            <EditRosterBtn />
            <PointsDialog />
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Fantasy;
