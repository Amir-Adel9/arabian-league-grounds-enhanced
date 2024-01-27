'use client';

import Image from 'next/image';

import { FantasyPlayer } from '@/entities/fantasy/fantasy.types';
import { TeamRostersByRole } from '@/utils/functions/getTeamRosters';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Role } from '@/entities/fantasy/fantasy.actions';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { User } from '@/db/types';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import handleFantasy from '../actions/getFantasyStats';

type FantasyRoster = {
  top: FantasyPlayer | undefined;
  jungle: FantasyPlayer | undefined;
  mid: FantasyPlayer | undefined;
  bot: FantasyPlayer | undefined;
  support: FantasyPlayer | undefined;
};

const CreateFantasyTeam = ({
  rostersByRole,
  currentFantasyTeam,
  isShowing,
  user,
}: {
  rostersByRole: TeamRostersByRole;
  currentFantasyTeam?: FantasyRoster;
  isShowing: boolean;
  user: User;
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const roleVariants = {
    selected: {
      scale: 1.05,
      translateY: -40,
    },
    unselected: {
      scale: 1,
      translateY: 0,
    },
  };

  const createRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const jungleRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const [selectedRole, setSelectedRole] = useState<Role>();
  const [selectedPlayer, setSelectedPlayer] = useState<FantasyPlayer>();
  const [credits, setCredits] = useState<number>(user.credits);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const [fantasyRoster, setFantasyRoster] = useState<FantasyRoster>({
    top: currentFantasyTeam?.top || undefined,
    jungle: currentFantasyTeam?.jungle || undefined,
    mid: currentFantasyTeam?.mid || undefined,
    bot: currentFantasyTeam?.bot || undefined,
    support: currentFantasyTeam?.support || undefined,
  });
  const [fantasyTeam, setFantasyTeam] = useState<{
    roster?: {
      top: FantasyPlayer;
      jungle: FantasyPlayer;
      mid: FantasyPlayer;
      bot: FantasyPlayer;
      support: FantasyPlayer;
    };
    totalCost: number;
    isLockedIn: boolean;
  }>({
    totalCost: 0,
    isLockedIn: false,
  });

  useEffect(() => {
    console.log('currentFantasyTeam', currentFantasyTeam);
    setTimeout(() => {
      if (createRef.current?.style.display === 'none' && isShowing) {
        console.log('displaying');
        createRef.current.style.display = 'flex';
        console.log('displayed');
        return;
      }
      if (createRef.current?.style.display === 'flex') {
        console.log('hiding');
        createRef.current.style.display = 'none';
        console.log('hidden');
        return;
      }
    }, 500);

    window.addEventListener('click', (e) => {
      if (
        !topRef.current?.contains(e.target as Node) &&
        !jungleRef.current?.contains(e.target as Node) &&
        !midRef.current?.contains(e.target as Node) &&
        !botRef.current?.contains(e.target as Node) &&
        !supportRef.current?.contains(e.target as Node) &&
        !drawerRef.current?.contains(e.target as Node)
      )
        setSelectedRole(undefined);
    });
  }, [isShowing]);

  useEffect(() => {
    console.log('fantasyRoster', fantasyRoster);
    console.log('fantasyTeam', fantasyTeam);
  }, [fantasyRoster, fantasyTeam]);

  const playerSelect = (player: FantasyPlayer) => {
    const { role } = player;

    const isRoleAlreadySelected = Object.values(fantasyRoster).some((p) => {
      if (p === undefined) return false;
      return p.role === role;
    });

    const isPlayerAlreadySelected = Object.values(fantasyRoster).some((p) => {
      if (p === undefined) return false;
      return p.summonerName === player.summonerName;
    });

    const playersFromTheSameTeam = Object.values(fantasyRoster).filter((p) => {
      if (player === undefined || p === undefined) return false;
      return player.teamCode === p.teamCode;
    });

    console.log(playersFromTheSameTeam);

    let error = '';

    if (isPlayerAlreadySelected) {
      toast.error('Player already selected');
      error = 'Player already selected';
      return error;
    }
    if (playersFromTheSameTeam.length >= 2) {
      toast.error('You can only have 2 players from the same team');
      error = 'You can only have 2 players from the same team';
      return error;
    }
    switch (role) {
      case 'top':
        setFantasyRoster({ ...fantasyRoster, top: player });
        if (!isRoleAlreadySelected) {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost: fantasyTeam.totalCost + player.cost,
          });
        } else {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost:
              fantasyTeam.totalCost + player.cost - fantasyRoster[role]!.cost,
          });
        }
        break;
      case 'jungle':
        setFantasyRoster({ ...fantasyRoster, jungle: player });
        if (!isRoleAlreadySelected) {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost: fantasyTeam.totalCost + player.cost,
          });
        } else {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost:
              fantasyTeam.totalCost + player.cost - fantasyRoster[role]!.cost,
          });
        }
        break;
      case 'mid':
        setFantasyRoster({ ...fantasyRoster, mid: player });
        if (!isRoleAlreadySelected) {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost: fantasyTeam.totalCost + player.cost,
          });
        } else {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost:
              fantasyTeam.totalCost + player.cost - fantasyRoster[role]!.cost,
          });
        }
        break;
      case 'bot':
        setFantasyRoster({ ...fantasyRoster, bot: player });
        if (!isRoleAlreadySelected) {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost: fantasyTeam.totalCost + player.cost,
          });
        } else {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost:
              fantasyTeam.totalCost + player.cost - fantasyRoster[role]!.cost,
          });
        }
        break;
      case 'support':
        setFantasyRoster({ ...fantasyRoster, support: player });
        if (!isRoleAlreadySelected) {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost: fantasyTeam.totalCost + player.cost,
          });
        } else {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost:
              fantasyTeam.totalCost + player.cost - fantasyRoster[role]!.cost,
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      style={{ display: 'none' }}
      ref={createRef}
      animate={isShowing ? 'visible' : 'hidden'}
      transition={{ delay: 0.6 }}
      className='w-full h-full flex flex-col items-center gap-4 sm:gap-20'
    >
      <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/70 text-center font-rubik font-bold filter tracking-wider mt-16'>
        Your current line-up
      </h2>
      <div className='items-center flex flex-col text-muted-foreground lg:flex-row gap-5 justify-center w-full font-geist'>
        <Drawer
          shouldScaleBackground
          closeThreshold={0.1}
          scrollLockTimeout={5000}
          preventScrollRestoration={false}
        >
          <DrawerTrigger asChild>
            <motion.div
              initial={{ translateX: -250, opacity: 0 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                translateY: -40,
              }}
              transition={{
                duration: 0.05,
                type: 'tween',
              }}
              ref={topRef}
              variants={roleVariants}
              animate={selectedRole === 'top' ? 'selected' : 'unselected'}
              onClick={() => setSelectedRole('top')}
              className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '
            >
              {fantasyRoster.top && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-xl left-3'>
                    ${fantasyRoster.top.cost}
                  </span>
                  <Image
                    src={fantasyRoster.top.teamLogo}
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
                {fantasyRoster.top
                  ? `${fantasyRoster.top.teamCode} ${fantasyRoster.top.summonerName}`
                  : 'No player selected'}
              </div>
              <span
                onClick={() => setSelectedRole('top')}
                className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
              >
                {fantasyRoster.top ? `Change player` : 'Add Player'}
              </span>
            </motion.div>
          </DrawerTrigger>
          <DrawerTrigger asChild>
            <motion.div
              initial={{ translateX: -200, opacity: 0 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                translateY: -40,
              }}
              transition={{
                duration: 0.05,
                type: 'tween',
              }}
              ref={jungleRef}
              variants={roleVariants}
              animate={selectedRole === 'jungle' ? 'selected' : 'unselected'}
              onClick={() => setSelectedRole('jungle')}
              className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center  w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '
            >
              {fantasyRoster.jungle && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-xl left-3'>
                    ${fantasyRoster.jungle.cost}
                  </span>
                  <Image
                    src={fantasyRoster.jungle.teamLogo}
                    alt='team logo'
                    width={50}
                    height={50}
                    draggable={false}
                    className='sm:w-[50px] sm:h-[50px] absolute right-3'
                  />
                </div>
              )}
              <div className='flex flex-col items-center justify-center gap-5 z-20 text-primary'>
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
              <div>
                {fantasyRoster.jungle
                  ? `${fantasyRoster.jungle.teamCode} ${fantasyRoster.jungle.summonerName}`
                  : 'No player selected'}
              </div>
              <span
                onClick={() => setSelectedRole('jungle')}
                className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
              >
                {fantasyRoster.jungle ? `Change player` : 'Add Player'}
              </span>
            </motion.div>
          </DrawerTrigger>
          <DrawerTrigger asChild>
            <motion.div
              initial={{ translateX: -150, opacity: 0 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                translateY: -40,
              }}
              transition={{
                duration: 0.05,
                type: 'tween',
              }}
              ref={midRef}
              variants={roleVariants}
              animate={selectedRole === 'mid' ? 'selected' : 'unselected'}
              onClick={() => setSelectedRole('mid')}
              className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center  w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '
            >
              {fantasyRoster.mid && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-xl left-3'>
                    ${fantasyRoster.mid.cost}
                  </span>
                  <Image
                    src={fantasyRoster.mid.teamLogo}
                    alt='team logo'
                    width={50}
                    height={50}
                    draggable={false}
                    className='sm:w-[50px] sm:h-[50px] absolute right-3'
                  />
                </div>
              )}
              <div className='flex flex-col items-center justify-center gap-5 z-20 text-primary'>
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
              <div>
                {fantasyRoster.mid
                  ? `${fantasyRoster.mid.teamCode} ${fantasyRoster.mid.summonerName}`
                  : 'No player selected'}
              </div>
              <span
                onClick={() => setSelectedRole('mid')}
                className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
              >
                {fantasyRoster.mid ? `Change player` : 'Add Player'}
              </span>
            </motion.div>
          </DrawerTrigger>
          <DrawerTrigger asChild>
            <motion.div
              initial={{ translateX: -100, opacity: 0 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                translateY: -40,
              }}
              transition={{
                duration: 0.05,
                type: 'tween',
              }}
              ref={botRef}
              variants={roleVariants}
              animate={selectedRole === 'bot' ? 'selected' : 'unselected'}
              onClick={() => setSelectedRole('bot')}
              className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center  w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '
            >
              {fantasyRoster.bot && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-xl left-3'>
                    ${fantasyRoster.bot.cost}
                  </span>
                  <Image
                    src={fantasyRoster.bot.teamLogo}
                    alt='team logo'
                    width={50}
                    height={50}
                    draggable={false}
                    className='sm:w-[50px] sm:h-[50px] absolute right-3'
                  />
                </div>
              )}
              <div className='flex flex-col items-center justify-center gap-5 z-20 text-primary'>
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
              <div>
                {fantasyRoster.bot
                  ? `${fantasyRoster.bot.teamCode} ${fantasyRoster.bot.summonerName}`
                  : 'No player selected'}
              </div>
              <span
                onClick={() => setSelectedRole('bot')}
                className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
              >
                {fantasyRoster.bot ? `Change player` : 'Add Player'}
              </span>
            </motion.div>
          </DrawerTrigger>
          <DrawerTrigger asChild>
            <motion.div
              initial={{ translateX: -50, opacity: 0 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                translateY: -40,
              }}
              transition={{
                duration: 0.05,
                type: 'tween',
              }}
              ref={supportRef}
              variants={roleVariants}
              animate={selectedRole === 'support' ? 'selected' : 'unselected'}
              onClick={() => setSelectedRole('support')}
              className='relative duration-300 flex flex-col items-center justify-around bg-card border border-border text-center  w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 '
            >
              {fantasyRoster.support && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-xl left-3'>
                    ${fantasyRoster.support.cost}
                  </span>
                  <Image
                    src={fantasyRoster.support.teamLogo}
                    alt='team logo'
                    width={50}
                    height={50}
                    draggable={false}
                    className='sm:w-[50px] sm:h-[50px] absolute right-3'
                  />
                </div>
              )}
              <div className='flex flex-col items-center justify-center gap-5 z-20 text-primary'>
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
              <div>
                {fantasyRoster.support
                  ? `${fantasyRoster.support.teamCode} ${fantasyRoster.support.summonerName}`
                  : 'No player selected'}
              </div>
              <span
                onClick={() => setSelectedRole('support')}
                className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
              >
                {fantasyRoster.support ? `Change player` : 'Add Player'}
              </span>
            </motion.div>
          </DrawerTrigger>
          {selectedRole && (
            <DrawerContent
              ref={drawerRef}
              className='w-[90%] left-[7.5%] border-border px-5 text-white outline-none mb-16 lg:mb-0 max-h-[500px]'
            >
              <div className=' w-full overflow-y-scroll no-scrollbar'>
                <DrawerHeader className='w-full flex justify-between'>
                  <span>Your credits: ${credits}</span>
                  <DrawerTitle className='text-center text-2xl'>
                    Choose a <span className='capitalize'>{selectedRole} </span>
                    player
                  </DrawerTitle>
                  <span>Roster&apos;s credits: ${fantasyTeam.totalCost}</span>
                </DrawerHeader>
                <div className='font-bold flex flex-wrap flex-col md:flex-row items-center justify-center gap-5 z-20 text-center my-10'>
                  {rostersByRole[selectedRole]?.map((player) => {
                    return (
                      <Button
                        variant={'outline'}
                        key={player.id + player.summonerName}
                        onClick={() => {
                          setSelectedPlayer(player);
                        }}
                        className={`flex flex-col gap-2 w-[200px] text-lg border-border border rounded-lg h-auto duration-300 p-4 font-bold cursor-pointer ${
                          selectedPlayer?.summonerName ===
                            player.summonerName ||
                          (!selectedPlayer &&
                            fantasyRoster[player.role]?.summonerName ===
                              player.summonerName)
                            ? 'bg-accent-gold text-secondary hover:brightness-105 hover:bg-accent-gold hover:text-secondary'
                            : ''
                        }`}
                      >
                        <div className='w-full flex items-center justify-between'>
                          <span className='text-sm'>${player.cost}</span>
                          <Image
                            src={player.teamLogo}
                            alt='team logo'
                            width={30}
                            height={30}
                            draggable={false}
                            className='sm:w-[30px] sm:h-[30px]'
                          />
                        </div>
                        <div>
                          {player.teamCode} {player.summonerName}
                        </div>
                      </Button>
                    );
                  })}
                </div>
                <DrawerFooter>
                  <Button
                    className='w-[320px] self-center text-secondary bg-accent-gold hover:brightness-105 hover:opacity-90 duration-300'
                    variant={'default'}
                    onClick={() => {
                      if (!selectedPlayer) return;
                      const pickError = playerSelect(selectedPlayer);
                      console.log('error', pickError);
                      if (!pickError) {
                        setSelectedPlayer(undefined);
                        setSelectedRole(undefined);
                      }
                    }}
                  >
                    Confirm
                  </Button>
                  <DrawerClose>
                    <Button
                      className='w-[320px] self-center duration-300'
                      variant={'outline'}
                      onClick={() => {
                        setSelectedPlayer(undefined);
                        setSelectedRole(undefined);
                      }}
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          )}
        </Drawer>
      </div>
      <div>
        <AlertDialog open={showConfirmModal}>
          <button
            className='w-[320px] py-2 rounded-md font-inter font-semibold text-secondary bg-accent-gold hover:brightness-105 hover:opacity-80 !duration-300'
            onClick={() => {
              if (fantasyTeam.totalCost > credits) {
                toast.error('Not enough credits');
                return;
              }

              if (Object.values(fantasyRoster).some((p) => p === undefined)) {
                toast.error('You need to fill all the roles');
                return;
              }

              setFantasyTeam({
                roster: {
                  top: fantasyRoster.top!,
                  jungle: fantasyRoster.jungle!,
                  mid: fantasyRoster.mid!,
                  bot: fantasyRoster.bot!,
                  support: fantasyRoster.support!,
                },
                totalCost: fantasyTeam.totalCost,
                isLockedIn: true,
              });
              setShowConfirmModal(true);
            }}
          >
            Lock In
          </button>
          <AlertDialogContent className='border-border'>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-white'>
                Are you sure you?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You won&apos;t be allowed to make any changes to your roster
                during the Arabian League game days (Thursday and Friday).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setShowConfirmModal(false)}
                className='text-white'
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await handleFantasy({
                    fantasyRoster: fantasyTeam.roster!,
                  })
                    .then(() => {
                      toast.success('Team locked in successfully');
                      setShowConfirmModal(false);
                    })
                    .catch((err: Error) => {
                      toast.error(`Something went wrong: ${err.message}`);
                      setShowConfirmModal(false);
                    });
                }}
                className='bg-accent-gold'
              >
                Lock In
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
};

export default CreateFantasyTeam;
