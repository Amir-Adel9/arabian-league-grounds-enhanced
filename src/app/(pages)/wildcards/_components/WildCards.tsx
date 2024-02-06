'use client';

import WildCard from './WildCard';
import { TeamRostersByRole } from '@/utils/functions/getTeamRosters';
import PlayerCard from './PlayerCard';
import TeamCard from './TeamCard';
import { FantasyPlayer } from '@/entities/fantasy/fantasy.types';
import { useState } from 'react';
import { Wildcard } from '@/db/types';

const WildCards = ({
  allPlayers,
  allTeams,
  wildcards,
}: {
  allPlayers: TeamRostersByRole;
  allTeams: {
    name: string;
    logo: string;
  }[];
  wildcards: {
    killLeader: Wildcard | undefined;
    champion: Wildcard | undefined;
  };
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<
    FantasyPlayer | null | undefined
  >(
    Object.values(allPlayers)
      .flat()
      .find(
        (player) => player.summonerName === wildcards.killLeader?.picked
      ) as FantasyPlayer
  );
  const [selectedTeam, setSelectedTeam] = useState<
    | {
        name: string;
        logo: string;
      }
    | null
    | undefined
  >(
    allTeams.find((team) => team.name === wildcards.champion?.picked) as {
      name: string;
      logo: string;
    }
  );
  return (
    <div className='mt-20 mb-16 lg:mb-0 flex flex-col overflow-y-auto overflow-x-hidden w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)]'>
      <h1 className='text-accent-gold text-2xl md:text-5xl font-kanit font-bold justify-self-start text-center my-10'>
        This Week&apos;s Wildcard Picks
      </h1>
      <div className='flex flex-col justify-between'>
        <WildCard
          title='Kill Leader'
          description='The player with the most kills in the week.'
        >
          {Object.values(allPlayers).map((team) => {
            return team.map((player, index) => {
              return (
                <PlayerCard
                  player={player}
                  key={index + player.summonerName}
                  selectedPlayer={selectedPlayer}
                  setSelectedPlayer={setSelectedPlayer}
                />
              );
            });
          })}
        </WildCard>
        <WildCard
          title='Arabian League Champion'
          description='Who is gonna win it all?'
        >
          {allTeams.map((team, index) => {
            return (
              <TeamCard
                team={team}
                key={index + team.name}
                selectedTeam={selectedTeam}
                setSelectedTeam={setSelectedTeam}
              />
            );
          })}
        </WildCard>
      </div>
    </div>
  );
};

export default WildCards;
