import {
  TeamRostersByRole,
  getTeamRostersByRole,
} from '@/utils/functions/getTeamRosters';
import { currentUser } from '@clerk/nextjs';
import {
  getFantasyRoster,
  getFantasyTeamId,
} from '@/entities/fantasy/fantasy.db';
import { User } from '@/db/types';
import { FantasyRoster } from '@/entities/fantasy/fantasy.types';

import Image from 'next/image';
const Fantasy = async ({
  rostersByRole,
  currentFantasyTeam,
  user,
}: {
  rostersByRole: TeamRostersByRole;
  currentFantasyTeam: FantasyRoster;
  user: User;
}) => {
  return (
    <div className='relative w-full h-full overflow-x-hidden p-5 md:p-8 xl:p-16'>
      <div className='w-full h-full flex flex-col items-center gap-4 sm:gap-20'>
        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/70 text-center font-rubik font-bold filter tracking-wider mt-16'>
          Your current line-up
        </h2>
        <div className='items-center flex flex-col text-muted-foreground lg:flex-row gap-5 justify-center w-full font-geist'>
          <div className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '>
            {currentFantasyTeam.top && (
              <div className='absolute top-3 w-full flex justify-between'>
                <span className='absolute text-xl left-3'>
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
            <div>
              {currentFantasyTeam.top
                ? `${currentFantasyTeam.top.teamCode} ${currentFantasyTeam.top.summonerName}`
                : 'No player selected'}
            </div>
            <span className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'>
              {currentFantasyTeam.top ? `Change player` : 'Add Player'}
            </span>
          </div>
          <div className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '>
            {currentFantasyTeam.jungle && (
              <div className='absolute top-3 w-full flex justify-between'>
                <span className='absolute text-xl left-3'>
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
            <div>
              {currentFantasyTeam.jungle
                ? `${currentFantasyTeam.jungle.teamCode} ${currentFantasyTeam.jungle.summonerName}`
                : 'No player selected'}
            </div>
            <span className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'>
              {currentFantasyTeam.jungle ? `Change player` : 'Add Player'}
            </span>
          </div>
          <div className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '>
            {currentFantasyTeam.mid && (
              <div className='absolute top-3 w-full flex justify-between'>
                <span className='absolute text-xl left-3'>
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
            <div>
              {currentFantasyTeam.mid
                ? `${currentFantasyTeam.mid.teamCode} ${currentFantasyTeam.mid.summonerName}`
                : 'No player selected'}
            </div>
            <span className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'>
              {currentFantasyTeam.mid ? `Change player` : 'Add Player'}
            </span>
          </div>
          <div className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '>
            {currentFantasyTeam.bot && (
              <div className='absolute top-3 w-full flex justify-between'>
                <span className='absolute text-xl left-3'>
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
            <div>
              {currentFantasyTeam.bot
                ? `${currentFantasyTeam.bot.teamCode} ${currentFantasyTeam.bot.summonerName}`
                : 'No player selected'}
            </div>
            <span className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'>
              {currentFantasyTeam.bot ? `Change player` : 'Add Player'}
            </span>
          </div>
          <div className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '>
            {currentFantasyTeam.support && (
              <div className='absolute top-3 w-full flex justify-between'>
                <span className='absolute text-xl left-3'>
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
            <div>
              {currentFantasyTeam.support
                ? `${currentFantasyTeam.support.teamCode} ${currentFantasyTeam.support.summonerName}`
                : 'No player selected'}
            </div>
            <span className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'>
              {currentFantasyTeam.support ? `Change player` : 'Add Player'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fantasy;
