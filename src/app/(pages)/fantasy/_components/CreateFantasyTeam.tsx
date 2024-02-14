'use client';

import Image from 'next/image';

import { FantasyPlayer, FantasyRoster } from '@/entities/fantasy/fantasy.types';
import { TeamRostersByRole } from '@/utils/functions/getTeamRosters';
import { motion } from 'framer-motion';
import { use, useEffect, useRef, useState } from 'react';
import { Role, makeCaptain } from '@/entities/fantasy/fantasy.actions';
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
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import handleFantasy from '../actions/getFantasyStats';
import { usePathname, useRouter } from 'next/navigation';
import CreditsDialog from './CreditsDialog';
import {
  areTeamsEqual,
  isLockInLocked,
} from '@/entities/fantasy/fantasy.helpers';
import Link from 'next/link';

type CreateFantasyRoster = {
  top: FantasyPlayer | undefined;
  jungle: FantasyPlayer | undefined;
  mid: FantasyPlayer | undefined;
  bot: FantasyPlayer | undefined;
  support: FantasyPlayer | undefined;
};

const CreateFantasyTeam = ({
  rostersByRole,
  currentFantasyTeam,
  teamCaptain,
  isShowing,
  user,
}: {
  rostersByRole: TeamRostersByRole;
  currentFantasyTeam?: FantasyRoster;
  teamCaptain?: FantasyPlayer;
  isShowing: boolean;
  user: User;
}) => {
  const router = useRouter();
  const currentPath = usePathname();

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [rosterCostDifference, setRosterCostDifference] = useState<number>(0);
  const [fantasyRoster, setFantasyRoster] = useState<CreateFantasyRoster>({
    top: currentFantasyTeam?.top || undefined,
    jungle: currentFantasyTeam?.jungle || undefined,
    mid: currentFantasyTeam?.mid || undefined,
    bot: currentFantasyTeam?.bot || undefined,
    support: currentFantasyTeam?.support || undefined,
  });
  const [fantasyTeam, setFantasyTeam] = useState<{
    roster?: {
      top: FantasyPlayer | undefined;
      jungle: FantasyPlayer | undefined;
      mid: FantasyPlayer | undefined;
      bot: FantasyPlayer | undefined;
      support: FantasyPlayer | undefined;
    };
    totalCost: number;
    isLockedIn: boolean;
  }>({
    roster: {
      top: currentFantasyTeam?.top || undefined,
      jungle: currentFantasyTeam?.jungle || undefined,
      mid: currentFantasyTeam?.mid || undefined,
      bot: currentFantasyTeam?.bot || undefined,
      support: currentFantasyTeam?.support || undefined,
    },
    totalCost: currentFantasyTeam
      ? Object.values(currentFantasyTeam).reduce((acc, p) => acc + p!.cost, 0)
      : 0,
    isLockedIn: false,
  });
  const [captain, setCaptain] = useState<FantasyPlayer | undefined>(
    teamCaptain
  );
  const [cart, setCart] = useState<FantasyPlayer[]>([]);
  useEffect(() => {}, [cart]);
  useEffect(() => {
    setTimeout(() => {
      if (createRef.current?.style.display === 'none' && isShowing) {
        createRef.current.style.display = 'flex';
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
    console.log(
      'capitan',
      captain,
      Object.values(currentFantasyTeam as FantasyRoster)
    );
  }, [captain]);

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

    const isPlayerInTeam = currentFantasyTeam
      ? Object.values(currentFantasyTeam as FantasyRoster).some((p) => {
          if (p === undefined) return false;
          return p.summonerName === player.summonerName;
        })
      : false;

    const playersFromTheSameTeam = Object.values(fantasyRoster).filter((p) => {
      if (player === undefined || p === undefined) return false;
      return player.teamCode === p.teamCode;
    });

    let error = '';

    if (isPlayerInTeam) {
      toast.error('This player is already in your team');
      error = 'Player already selected';
      return error;
    }

    if (isPlayerAlreadySelected) {
      toast.error('This player is already selected');
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
          setCart([...cart, player]);
          setRosterCostDifference(rosterCostDifference + player.cost);
        } else {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost:
              fantasyTeam.totalCost + player.cost - fantasyRoster![role]?.cost!,
          });
          setCart(
            [...cart, player]
              .filter((p) => p.role !== fantasyRoster[role]!.role)
              .concat(player)
          );
          setRosterCostDifference(player.cost - fantasyRoster![role]?.cost!);
        }
        break;
      case 'jungle':
        setFantasyRoster({ ...fantasyRoster, jungle: player });
        if (!isRoleAlreadySelected) {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost: fantasyTeam.totalCost + player.cost,
          });
          setCart([...cart, player]);
          setRosterCostDifference(rosterCostDifference + player.cost);
        } else {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost:
              fantasyTeam.totalCost + player.cost - fantasyRoster![role]?.cost!,
          });
          setCart(
            [...cart, player]
              .filter((p) => p.role !== fantasyRoster[role]!.role)
              .concat(player)
          );
          setRosterCostDifference(player.cost - fantasyRoster![role]?.cost!);
        }
        break;
      case 'mid':
        setFantasyRoster({ ...fantasyRoster, mid: player });
        if (!isRoleAlreadySelected) {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost: fantasyTeam.totalCost + player.cost,
          });
          setCart([...cart, player]);
          setRosterCostDifference(rosterCostDifference + player.cost);
        } else {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost:
              fantasyTeam.totalCost + player.cost - fantasyRoster![role]?.cost!,
          });
          setCart(
            [...cart, player]
              .filter((p) => p.role !== fantasyRoster[role]!.role)
              .concat(player)
          );
          setRosterCostDifference(player.cost - fantasyRoster![role]?.cost!);
        }
        break;
      case 'bot':
        setFantasyRoster({ ...fantasyRoster, bot: player });
        if (!isRoleAlreadySelected) {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost: fantasyTeam.totalCost + player.cost,
          });
          setCart([...cart, player]);
          setRosterCostDifference(rosterCostDifference + player.cost);
        } else {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost:
              fantasyTeam.totalCost + player.cost - fantasyRoster![role]?.cost!,
          });
          setCart(
            [...cart, player]
              .filter((p) => p.role !== fantasyRoster[role]!.role)
              .concat(player)
          );
          setRosterCostDifference(player.cost - fantasyRoster![role]?.cost!);
        }
        break;
      case 'support':
        setFantasyRoster({ ...fantasyRoster, support: player });
        if (!isRoleAlreadySelected) {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost: fantasyTeam.totalCost + player.cost,
          });
          setCart([...cart, player]);
          setRosterCostDifference(rosterCostDifference + player.cost);
        } else {
          setFantasyTeam({
            ...fantasyTeam,
            totalCost:
              fantasyTeam.totalCost + player.cost - fantasyRoster![role]?.cost!,
          });
          setCart(
            [...cart, player]
              .filter((p) => p.role !== fantasyRoster[role]!.role)
              .concat(player)
          );
          setRosterCostDifference(player.cost - fantasyRoster![role]?.cost!);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(selectedRole);
  }, [selectedRole]);
  return (
    <motion.div
      variants={variants}
      initial='hidden'
      style={{ display: 'none' }}
      ref={createRef}
      id='create'
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
              onClick={() => {
                setSelectedRole('top');
              }}
              className={`relative duration-300 flex flex-col items-center justify-around bg-card border ${
                captain?.id === fantasyRoster.top?.id &&
                captain?.summonerName === fantasyRoster.top?.summonerName
                  ? 'border-accent-gold'
                  : 'border-border'
              } text-center w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 `}
            >
              {fantasyRoster.top && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-lg left-3'>
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
              <div className=' font-bold font-kanit flex flex-col justify-center items-center'>
                {fantasyRoster.top ? (
                  <>
                    <span className='text-accent-gold text-2xl'>
                      {fantasyRoster.top.teamName}
                    </span>
                    <span className='text-xl'>
                      {fantasyRoster.top.summonerName}
                    </span>
                    <div className='relative h-5 w-8 mt-2'>
                      <Image
                        src={fantasyRoster.top.flagUrl}
                        alt=''
                        title={fantasyRoster.top.nationality}
                        fill={true}
                        draggable={false}
                      />
                    </div>
                  </>
                ) : (
                  'No player selected'
                )}
              </div>
              <div className='flex flex-col gap-4'>
                <span
                  onClick={() => setSelectedRole('top')}
                  className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
                >
                  {fantasyRoster.top ? `Change player` : 'Add Player'}
                </span>
                {fantasyRoster.top && (
                  <Button
                    disabled={isLoading}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (isLockInLocked()) {
                        toast.error(
                          'You cannot set your team captain on game days'
                        );
                      }
                      if (
                        captain?.id === fantasyRoster.top?.id &&
                        captain?.summonerName ===
                          fantasyRoster.top?.summonerName
                      ) {
                        toast.info('This player is already the team captain');
                        return;
                      }
                      setIsLoading(true);

                      setSelectedRole(undefined);
                      await makeCaptain({
                        fantasyPlayer: fantasyRoster.top!,
                      })
                        .then(() => {
                          setCaptain(fantasyRoster.top);
                          toast.success(
                            `${fantasyRoster.top?.summonerName} is now your team captain`
                          );
                          setIsLoading(false);
                        })
                        .catch((err) => {
                          setIsLoading(false);
                        });
                    }}
                    variant={'outline'}
                    className='border-accent-gold bg-transparent hover:!bg-transparent hover:text-accent-gold text-accent-gold group-hover:rounded-none  duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
                  >
                    {captain === fantasyRoster.top
                      ? 'Team Captain'
                      : 'Make Captain'}
                  </Button>
                )}
              </div>
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
              className={`relative duration-300 flex flex-col items-center justify-around bg-card border ${
                captain?.id === fantasyRoster.jungle?.id &&
                captain?.summonerName === fantasyRoster.jungle?.summonerName
                  ? 'border-accent-gold'
                  : 'border-border'
              } text-center  w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 `}
            >
              {fantasyRoster.jungle && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-lg left-3'>
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
              <div className=' font-bold font-kanit flex flex-col justify-center items-center'>
                {fantasyRoster.jungle ? (
                  <>
                    <span className='text-accent-gold text-2xl'>
                      {fantasyRoster.jungle.teamName}
                    </span>
                    <span className='text-xl'>
                      {fantasyRoster.jungle.summonerName}
                    </span>
                    <div className='relative h-5 w-8 mt-2'>
                      <Image
                        src={fantasyRoster.jungle.flagUrl}
                        alt=''
                        title={fantasyRoster.jungle.nationality}
                        fill={true}
                        draggable={false}
                      />
                    </div>
                  </>
                ) : (
                  'No player selected'
                )}
              </div>
              <div className='flex flex-col gap-4'>
                <span
                  onClick={() => setSelectedRole('jungle')}
                  className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
                >
                  {fantasyRoster.jungle ? `Change player` : 'Add Player'}
                </span>
                {fantasyRoster.jungle && (
                  <Button
                    disabled={isLoading}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (isLockInLocked()) {
                        toast.error(
                          'You cannot set your team captain on game days'
                        );
                      }
                      if (
                        captain?.id === fantasyRoster.jungle?.id &&
                        captain?.summonerName ===
                          fantasyRoster.jungle?.summonerName
                      ) {
                        toast.info('This player is already the team captain');
                        return;
                      }
                      setIsLoading(true);

                      setSelectedRole(undefined);
                      await makeCaptain({
                        fantasyPlayer: fantasyRoster.jungle!,
                      })
                        .then(() => {
                          setCaptain(fantasyRoster.jungle);
                          toast.success(
                            `${fantasyRoster.jungle?.summonerName} is now your team captain`
                          );
                          setIsLoading(false);
                        })
                        .catch((err) => {
                          setIsLoading(false);
                        });
                    }}
                    variant={'outline'}
                    className='border-accent-gold bg-transparent hover:!bg-transparent hover:text-accent-gold text-accent-gold group-hover:rounded-none  duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
                  >
                    {captain === fantasyRoster.jungle
                      ? 'Team Captain'
                      : 'Make Captain'}
                  </Button>
                )}
              </div>
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
              className={`relative duration-300 flex flex-col items-center justify-around bg-card border ${
                captain?.id === fantasyRoster.mid?.id &&
                captain?.summonerName === fantasyRoster.mid?.summonerName
                  ? 'border-accent-gold'
                  : 'border-border'
              } text-center  w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 `}
            >
              {fantasyRoster.mid && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-lg left-3'>
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
              <div className=' font-bold font-kanit flex flex-col justify-center items-center'>
                {fantasyRoster.mid ? (
                  <>
                    <span className='text-accent-gold text-2xl'>
                      {fantasyRoster.mid.teamName}
                    </span>
                    <span className='text-xl'>
                      {fantasyRoster.mid.summonerName}
                    </span>
                    <div className='relative h-5 w-8 mt-2'>
                      <Image
                        src={fantasyRoster.mid.flagUrl}
                        alt=''
                        title={fantasyRoster.mid.nationality}
                        fill={true}
                        draggable={false}
                      />
                    </div>
                  </>
                ) : (
                  'No player selected'
                )}
              </div>
              <div className='flex flex-col gap-4'>
                <span
                  onClick={() => setSelectedRole('mid')}
                  className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
                >
                  {fantasyRoster.mid ? `Change player` : 'Add Player'}
                </span>
                {fantasyRoster.mid && (
                  <Button
                    disabled={isLoading}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (isLockInLocked()) {
                        toast.error(
                          'You cannot set your team captain on game days'
                        );
                      }
                      if (
                        captain?.id === fantasyRoster.mid?.id &&
                        captain?.summonerName ===
                          fantasyRoster.mid?.summonerName
                      ) {
                        toast.info('This player is already the team captain');
                        return;
                      }
                      setIsLoading(true);

                      setSelectedRole(undefined);
                      await makeCaptain({
                        fantasyPlayer: fantasyRoster.mid!,
                      })
                        .then(() => {
                          setCaptain(fantasyRoster.mid);
                          toast.success(
                            `${fantasyRoster.mid?.summonerName} is now your team captain`
                          );
                          setIsLoading(false);
                        })
                        .catch((err) => {
                          setIsLoading(false);
                        });
                    }}
                    variant={'outline'}
                    className='border-accent-gold bg-transparent hover:!bg-transparent hover:text-accent-gold text-accent-gold group-hover:rounded-none  duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
                  >
                    {captain === fantasyRoster.mid
                      ? 'Team Captain'
                      : 'Make Captain'}
                  </Button>
                )}
              </div>
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
              className={`relative duration-300 flex flex-col items-center justify-around bg-card border ${
                captain?.id === fantasyRoster.bot?.id &&
                captain?.summonerName === fantasyRoster.bot?.summonerName
                  ? 'border-accent-gold'
                  : 'border-border'
              } text-center  w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 `}
            >
              {fantasyRoster.bot && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-lg left-3'>
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
              <div className=' font-bold font-kanit flex flex-col justify-center items-center'>
                {fantasyRoster.bot ? (
                  <>
                    <span className='text-accent-gold text-2xl'>
                      {fantasyRoster.bot.teamName}
                    </span>
                    <span className='text-xl'>
                      {fantasyRoster.bot.summonerName}
                    </span>
                    <div className='relative h-5 w-8 mt-2'>
                      <Image
                        src={fantasyRoster.bot.flagUrl}
                        alt=''
                        title={fantasyRoster.bot.nationality}
                        fill={true}
                        draggable={false}
                      />
                    </div>
                  </>
                ) : (
                  'No player selected'
                )}
              </div>
              <div className='flex flex-col gap-4'>
                <span
                  onClick={() => setSelectedRole('bot')}
                  className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
                >
                  {fantasyRoster.bot ? `Change player` : 'Add Player'}
                </span>
                {fantasyRoster.bot && (
                  <Button
                    disabled={isLoading}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (isLockInLocked()) {
                        toast.error(
                          'You cannot set your team captain on game days'
                        );
                      }
                      if (
                        captain?.id === fantasyRoster.bot?.id &&
                        captain?.summonerName ===
                          fantasyRoster.bot?.summonerName
                      ) {
                        toast.info('This player is already the team captain');
                        return;
                      }
                      setIsLoading(true);

                      setSelectedRole(undefined);
                      await makeCaptain({
                        fantasyPlayer: fantasyRoster.bot!,
                      })
                        .then(() => {
                          setCaptain(fantasyRoster.bot);
                          toast.success(
                            `${fantasyRoster.bot?.summonerName} is now your team captain`
                          );
                          setIsLoading(false);
                        })
                        .catch((err) => {
                          setIsLoading(false);
                        });
                    }}
                    variant={'outline'}
                    className='border-accent-gold bg-transparent hover:!bg-transparent hover:text-accent-gold text-accent-gold group-hover:rounded-none  duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
                  >
                    {captain === fantasyRoster.bot
                      ? 'Team Captain'
                      : 'Make Captain'}
                  </Button>
                )}
              </div>
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
              className={`relative duration-300 flex flex-col items-center justify-around bg-card border ${
                captain?.id === fantasyRoster.support?.id &&
                captain?.summonerName === fantasyRoster.support?.summonerName
                  ? 'border-accent-gold'
                  : 'border-border'
              } text-center  w-full lg:w-1/3 xl:w-1/5 h-[500px] cursor-pointer rounded-2xl group hover:scale-105 hover:rounded-sm p-3 abs hover:-translate-y-10 `}
            >
              {fantasyRoster.support && (
                <div className='absolute top-3 w-full flex justify-between'>
                  <span className='absolute text-lg left-3'>
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
              <div className=' font-bold font-kanit flex flex-col justify-center items-center'>
                {fantasyRoster.support ? (
                  <>
                    <span className='text-accent-gold text-2xl'>
                      {fantasyRoster.support.teamName}
                    </span>
                    <span className='text-xl'>
                      {fantasyRoster.support.summonerName}
                    </span>
                    <div className='relative h-5 w-8 mt-2'>
                      <Image
                        src={fantasyRoster.support.flagUrl}
                        alt=''
                        title={fantasyRoster.support.nationality}
                        fill={true}
                        draggable={false}
                      />
                    </div>
                  </>
                ) : (
                  'No player selected'
                )}
              </div>
              <div className='flex flex-col gap-4'>
                <span
                  onClick={() => setSelectedRole('support')}
                  className='bg-accent-gold text-secondary group-hover:rounded-none z-20 duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
                >
                  {fantasyRoster.support ? `Change player` : 'Add Player'}
                </span>
                {fantasyRoster.support && (
                  <Button
                    disabled={isLoading}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (isLockInLocked()) {
                        toast.error(
                          'You cannot set your team captain on game days'
                        );
                      }
                      if (
                        captain?.id === fantasyRoster.support?.id &&
                        captain?.summonerName ===
                          fantasyRoster.support?.summonerName
                      ) {
                        toast.info('This player is already the team captain');
                        return;
                      }
                      setIsLoading(true);

                      setSelectedRole(undefined);
                      await makeCaptain({
                        fantasyPlayer: fantasyRoster.support!,
                      })
                        .then(() => {
                          setCaptain(fantasyRoster.support);
                          toast.success(
                            `${fantasyRoster.support?.summonerName} is now your team captain`
                          );
                          setIsLoading(false);
                        })
                        .catch((err) => {
                          setIsLoading(false);
                        });
                    }}
                    variant={'outline'}
                    className='border-accent-gold bg-transparent hover:!bg-transparent hover:text-accent-gold text-accent-gold group-hover:rounded-none  duration-300 font-b py-2 px-3 cursor-pointer rounded-sm'
                  >
                    {captain === fantasyRoster.support
                      ? 'Team Captain'
                      : 'Make Captain'}
                  </Button>
                )}
              </div>
            </motion.div>
          </DrawerTrigger>
          {selectedRole && (
            <DrawerContent
              ref={drawerRef}
              className='w-[90%] left-[7.5%] border-border px-5 text-white outline-none mb-16 lg:mb-0 max-h-[500px]'
            >
              <div className=' w-full overflow-y-scroll no-scrollbar'>
                <DrawerHeader className='w-full flex justify-between'>
                  <span>
                    Your credits: ${user.credits} (
                    {rosterCostDifference < 0 ? '+' : ''}
                    {rosterCostDifference})
                  </span>
                  <DrawerTitle className='text-center text-2xl'>
                    Choose a <span className='capitalize'>{selectedRole} </span>
                    player
                  </DrawerTitle>
                  <span>
                    Roster&apos;s cost: ${fantasyTeam.totalCost} (
                    {rosterCostDifference > 0 ? '+' : ''}
                    {rosterCostDifference})
                  </span>
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
                        className={`flex flex-col gap-2 w-[300px] text-lg ${
                          fantasyRoster[player.role]?.summonerName ===
                          player.summonerName
                            ? 'border-accent-gold'
                            : 'border-border'
                        } border rounded-lg h-auto duration-300 p-3 font-bold cursor-pointer ${
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
                          <div className='relative h-5 w-8'>
                            <Image
                              src={player.flagUrl}
                              alt=''
                              title={player.nationality}
                              fill={true}
                              draggable={false}
                            />
                          </div>
                          <span
                            className={`text-sm ${
                              selectedPlayer?.summonerName ===
                                player.summonerName ||
                              (!selectedPlayer &&
                                fantasyRoster[player.role]?.summonerName ===
                                  player.summonerName)
                                ? 'text-secondary'
                                : 'text-accent-gold'
                            }`}
                          >
                            ${player.cost}
                          </span>
                          <Image
                            src={player.teamLogo}
                            alt='team logo'
                            width={40}
                            height={40}
                            draggable={false}
                            className='sm:w-[40px] sm:h-[40px]'
                          />
                        </div>
                        <div className='text-xl'>
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
      <div className='flex flex-col-reverse md:flex-row relative justify-between items-center w-full'>
        <div className='flex flex-col gap-1 items-start md:w-[420px]'>
          <span className='sm:text-lg md:text-xl lg:text-2xl text-white/70 text-center font-rubik font-bold filter tracking-wide'>
            Your Credits: ${credits} (
            {rosterCostDifference < 0
              ? '+'
              : rosterCostDifference === 0
              ? ''
              : '-'}
            {Math.abs(rosterCostDifference)})
          </span>
          <span className='sm:text-lg md:text-xl lg:text-2xl text-white/70 text-center font-rubik font-bold filter tracking-wide'>
            Roster&apos;s cost: ${fantasyTeam.totalCost} (
            {rosterCostDifference > 0 ? '+' : ''}
            {rosterCostDifference})
          </span>
        </div>
        <div className='flex flex-col justify-center items-center gap-4'>
          <AlertDialog open={showConfirmModal}>
            <button
              className='md:w-[320px] px-2 py-2 relative rounded-md font-inter font-semibold text-secondary bg-accent-gold hover:brightness-105 hover:opacity-80 !duration-300'
              onClick={() => {
                if (isLockInLocked()) {
                  toast.error('You cannot change your team on game days');
                  return;
                }

                if (Object.values(fantasyRoster).some((p) => p === undefined)) {
                  toast.error('You need to fill all the roles');
                  return;
                }
                if (currentFantasyTeam) {
                  if (
                    areTeamsEqual(
                      Object.values(fantasyRoster).map((p) => p!.summonerName),
                      Object.values(currentFantasyTeam as FantasyRoster).map(
                        (p) => p?.summonerName
                      )
                    )
                  ) {
                    toast.error('No changes made');
                    return;
                  }
                  if (rosterCostDifference > credits) {
                    toast.error('Not enough credits');
                    return;
                  }
                }
                if (
                  !currentFantasyTeam &&
                  cart.map((p) => p.cost).reduce((acc, c) => acc + c, 0) >
                    credits
                ) {
                  toast.error('Not enough credits');
                  return;
                } else {
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
                }
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
                  disabled={isLoading}
                  onClick={async () => {
                    setIsLoading(true);
                    await handleFantasy({
                      fantasyRoster: fantasyTeam.roster! as FantasyRoster,
                    })
                      .then(() => {
                        toast.success('Team locked in successfully');
                        setIsLoading(false);
                        setShowConfirmModal(false);
                        router.refresh();
                        router.push('/fantasy');
                      })
                      .catch((err: Error) => {
                        toast.error(`Something went wrong: ${err.message}`);
                        setIsLoading(false);
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
          <span
            className='underline cursor-pointer'
            onClick={() => {
              if (currentFantasyTeam) {
                if (
                  areTeamsEqual(
                    Object.values(fantasyRoster).map((p) => p!.summonerName),
                    Object.values(currentFantasyTeam as FantasyRoster).map(
                      (p) => p?.summonerName
                    )
                  )
                ) {
                  toast.error('No changes made');
                  return;
                }
              }

              setFantasyRoster({
                top: currentFantasyTeam?.top || undefined,
                jungle: currentFantasyTeam?.jungle || undefined,
                mid: currentFantasyTeam?.mid || undefined,
                bot: currentFantasyTeam?.bot || undefined,
                support: currentFantasyTeam?.support || undefined,
              });
              setFantasyTeam({
                roster: {
                  top: currentFantasyTeam?.top || undefined,
                  jungle: currentFantasyTeam?.jungle || undefined,
                  mid: currentFantasyTeam?.mid || undefined,
                  bot: currentFantasyTeam?.bot || undefined,
                  support: currentFantasyTeam?.support || undefined,
                },
                totalCost: currentFantasyTeam
                  ? Object.values(currentFantasyTeam).reduce(
                      (acc, p) => acc + p!.cost,
                      0
                    )
                  : 0,
                isLockedIn: false,
              });

              setCart([]);
              setRosterCostDifference(0);
            }}
          >
            Reset
          </span>
          {currentPath.includes('edit') && (
            <Link className='underline cursor-pointer' href={'/fantasy'}>
              Stop editing
            </Link>
          )}
        </div>
        <CreditsDialog isCreatingTeam={isShowing} />
      </div>
    </motion.div>
  );
};

export default CreateFantasyTeam;
