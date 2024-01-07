'use client';

import { TeamRostersByRole } from '@/utils/functions/getTeamRosters';
import React, { useEffect, useState } from 'react';
import getFantasyStats from '../actions/getFantasyStats';

type FantasyPlayer = {
  id: number;
  name: string;
  nationality: string;
  flagUrl: string;
  summonerName: string;
  role: 'top' | 'jungle' | 'mid' | 'bot' | 'support';
  cost: number;
  teamName: string;
  teamSlug: string;
  teamCode: string;
};
type FantasyRoster = {
  top: FantasyPlayer | undefined;
  jungle: FantasyPlayer | undefined;
  mid: FantasyPlayer | undefined;
  bot: FantasyPlayer | undefined;
  support: FantasyPlayer | undefined;
};

const FantasyTest = ({
  roostersByRole,
}: {
  roostersByRole: TeamRostersByRole;
}) => {
  const [fantasyRoster, setFantasyRoster] = useState<FantasyRoster>({
    top: undefined,
    jungle: undefined,
    mid: undefined,
    bot: undefined,
    support: undefined,
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

  const [credits, setCredits] = useState<number>(125);
  const [fantasyPoints, setFantasyPoints] = useState<{
    top: {
      fromGameWins: number;
      fromKills: number;
      fromDeaths: number;
      total: number;
    };
    jungle: {
      fromGameWins: number;
      fromKills: number;
      fromDeaths: number;
      total: number;
    };
    mid: {
      fromGameWins: number;
      fromKills: number;
      fromDeaths: number;
      total: number;
    };
    bot: {
      fromGameWins: number;
      fromKills: number;
      fromDeaths: number;
      total: number;
    };
    support: {
      fromGameWins: number;
      fromKills: number;
      fromDeaths: number;
      total: number;
    };
    total: number;
  }>({
    top: {
      fromGameWins: 0,
      fromKills: 0,
      fromDeaths: 0,
      total: 0,
    },
    jungle: {
      fromGameWins: 0,
      fromKills: 0,
      fromDeaths: 0,
      total: 0,
    },
    mid: {
      fromGameWins: 0,
      fromKills: 0,
      fromDeaths: 0,
      total: 0,
    },
    bot: {
      fromGameWins: 0,
      fromKills: 0,
      fromDeaths: 0,
      total: 0,
    },
    support: {
      fromGameWins: 0,
      fromKills: 0,
      fromDeaths: 0,
      total: 0,
    },
    total: 0,
  });

  useEffect(() => {
    console.log(fantasyRoster);
    console.log(fantasyPoints);
  }, [fantasyRoster, fantasyPoints]);

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

    if (isPlayerAlreadySelected) {
      alert('Player already selected');
      return;
    }
    if (playersFromTheSameTeam.length >= 2) {
      alert('You can only have 2 players from the same team');
      return;
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
    <div>
      <div className='flex flex-col items-center'>
        <h3 className='font-kanit text-xl mt-5'>Top Laners</h3>
        <div className='flex flex-row gap-2 justify-center items-center'>
          {roostersByRole['top'].map((player, i) => {
            return (
              <div
                className={`flex flex-col items-center cursor-pointer hover:bg-accent-gold rounded p-2 ${
                  fantasyRoster.top?.summonerName === player.summonerName
                    ? 'bg-accent-gold'
                    : ''
                }`}
                key={i}
              >
                <h4
                  className='font-kanit text-lg'
                  onClick={() => playerSelect(player)}
                >
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
          {roostersByRole['jungle'].map((player, i) => {
            return (
              <div
                className={`flex flex-col items-center cursor-pointer hover:bg-accent-gold rounded p-2 ${
                  fantasyRoster.jungle?.summonerName === player.summonerName
                    ? 'bg-accent-gold'
                    : ''
                }`}
                key={i}
              >
                <h4
                  className='font-kanit text-lg'
                  onClick={() => playerSelect(player)}
                >
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
          {roostersByRole['mid'].map((player, i) => {
            return (
              <div
                className={`flex flex-col items-center cursor-pointer hover:bg-accent-gold rounded p-2 ${
                  fantasyRoster.mid?.summonerName === player.summonerName
                    ? 'bg-accent-gold'
                    : ''
                }`}
                key={i}
              >
                <h4
                  className='font-kanit text-lg'
                  onClick={() => playerSelect(player)}
                >
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
          {roostersByRole['bot'].map((player, i) => {
            return (
              <div
                className={`flex flex-col items-center cursor-pointer hover:bg-accent-gold rounded p-2 ${
                  fantasyRoster.bot?.summonerName === player.summonerName
                    ? 'bg-accent-gold'
                    : ''
                }`}
                key={i}
              >
                <h4
                  className='font-kanit text-lg'
                  onClick={() => playerSelect(player)}
                >
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
          {roostersByRole['support'].map((player, i) => {
            return (
              <div
                className={`flex flex-col items-center cursor-pointer hover:bg-accent-gold rounded p-2 ${
                  fantasyRoster.support?.summonerName === player.summonerName
                    ? 'bg-accent-gold'
                    : ''
                }`}
                key={i}
              >
                <h4
                  className='font-kanit text-lg'
                  onClick={() => playerSelect(player)}
                >
                  {player.teamCode} {player.summonerName}
                </h4>
                {/* <h6>{player.teamName}</h6> */}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className='font-kanit text-xl mt-5 text-center'>Fantasy Roster</h3>
        <div className='flex flex-row gap-5 justify-center items-center'>
          {Object.values(fantasyRoster).map((player, i) => {
            if (player === undefined) {
              return (
                <div
                  className={`flex flex-col items-center cursor-pointer hover:bg-accent-gold rounded p-2`}
                  key={i}
                >
                  <h4 className='font-kanit text-lg'>Empty</h4>
                </div>
              );
            }
            return (
              <div className={`flex flex-col items-center rounded p-2`} key={i}>
                <h4 className='font-kanit text-lg'>
                  {player.teamCode} {player.summonerName}
                </h4>
                <h6 className='capitalize'>{player.role}</h6>
              </div>
            );
          })}
        </div>
        {fantasyPoints.total !== 0 && (
          <div>
            <h3 className='font-kanit text-xl mt-5 text-center'>
              Fantasy Points
            </h3>
            <div className='flex flex-row gap-5 justify-center items-center'>
              {Object.values(fantasyPoints).map((player, i) => {
                if (player === undefined) {
                  return (
                    <div
                      className={`flex flex-col items-center cursor-pointer hover:bg-accent-gold rounded p-2`}
                      key={i}
                    >
                      <h4 className='font-kanit text-lg'>Empty</h4>
                    </div>
                  );
                }

                if (typeof player === 'number') {
                  return (
                    <div
                      className={`flex flex-col items-center cursor-pointer hover:bg-accent-gold rounded p-2`}
                      key={i}
                    >
                      <h4 className='font-kanit text-lg text-center'>
                        Total Fantasy Points: {player}
                      </h4>
                    </div>
                  );
                }
                return (
                  <div
                    className={`flex flex-col items-center rounded p-2 text-center`}
                    key={i}
                  >
                    <h4 className='font-kanit text-lg text-center'>
                      From Game Wins: {player.fromGameWins}
                    </h4>
                    <h4 className='font-kanit text-lg v'>
                      From Kills {player.fromKills}
                    </h4>
                    <h4 className='font-kanit text-lg text-center'>
                      From Deaths: {player.fromDeaths}
                    </h4>
                    <h6 className='capitalize text-center'>
                      Player Total: {player.total}
                    </h6>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className='flex flex-col items-center rounded p-2'>
          <h4 className='font-kanit text-lg'>
            Total Cost: {fantasyTeam.totalCost}
          </h4>
          <h4 className='font-kanit text-lg'>Credits: {credits}</h4>
        </div>
      </div>
      <div className='text-center'>
        <button
          className='bg-accent-gold p-3 rounded'
          onClick={() => {
            // if (fantasyTeam.isLockedIn) {
            //   alert('Team is already locked in');
            //   return;
            // }

            if (fantasyTeam.totalCost > credits) {
              alert('Not enough credits');
              return;
            }

            if (Object.values(fantasyRoster).some((p) => p === undefined)) {
              alert('You need to fill all the roles');
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

            console.log(fantasyTeam.roster);
          }}
        >
          {fantasyTeam.isLockedIn ? 'Locked In' : 'Lock In'}
        </button>
        <button
          className='bg-accent-gold p-3 rounded ml-5'
          onClick={async () => {
            if (!fantasyTeam.isLockedIn || !fantasyTeam.roster) {
              alert('Team is not locked in');
              return;
            } else {
              const res = await getFantasyStats({
                fantasyRoster: fantasyTeam.roster,
              }).then((res) => {
                setFantasyPoints({
                  top: {
                    fromGameWins: res.top.pointsFromGameWins,
                    fromKills: res.top.pointsFromKills,
                    fromDeaths: res.top.pointsFromDeaths,
                    total: res.top.totalPoints,
                  },
                  jungle: {
                    fromGameWins: res.jungle.pointsFromGameWins,
                    fromKills: res.jungle.pointsFromKillParticipation,
                    fromDeaths: res.jungle.pointsFromDeaths,
                    total: res.jungle.totalPoints,
                  },
                  mid: {
                    fromGameWins: res.mid.pointsFromGameWins,
                    fromKills: res.mid.pointsFromKills,
                    fromDeaths: res.mid.pointsFromDeaths,
                    total: res.mid.totalPoints,
                  },
                  bot: {
                    fromGameWins: res.bot.pointsFromGameWins,
                    fromKills: res.bot.pointsFromKills,
                    fromDeaths: res.bot.pointsFromDeaths,
                    total: res.bot.totalPoints,
                  },
                  support: {
                    fromGameWins: res.support.pointsFromGameWins,
                    fromKills: res.support.pointsFromAssists,
                    fromDeaths: res.support.pointsFromDeaths,
                    total: res.support.totalPoints,
                  },
                  total: res.totalFantasyPoints,
                });
                return res;
              });
              console.log('res', res);
            }
          }}
        >
          Fantasy!
        </button>
      </div>
    </div>
  );
};

export default FantasyTest;
