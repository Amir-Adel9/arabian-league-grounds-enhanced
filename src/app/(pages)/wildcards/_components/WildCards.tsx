'use client';

import WildCard from './WildCard';
import { TeamRostersByRole } from '@/utils/functions/getTeamRosters';
import PlayerCard from './PlayerCard';
import TeamCard from './TeamCard';
import { FantasyPlayer } from '@/entities/fantasy/fantasy.types';
import { useEffect, useState } from 'react';
import { Wildcard } from '@/db/types';
import { Event } from '@/utils/types/types';
import WildCardResults from './WildCardResults';

const WildCards = ({
  allPlayers,
  allTeams,
  allEvents,
  allStats,
  wildcards,
}: {
  allPlayers: TeamRostersByRole;
  allTeams: {
    name: string;
    logo: string;
  }[];
  allEvents: Event[];
  allStats: {
    summonerName: string;
    teamLogo: string;
    role: string;
    kills: number;
  }[];
  wildcards: {
    killLeader: Wildcard | undefined;
    champion: Wildcard | undefined;
    deathMaster: Wildcard | undefined;
    baronSpecialists: Wildcard | undefined;
  };
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<
    FantasyPlayer | null | undefined
  >(
    Object.values(allPlayers)
      .flat()
      .find(
        (player) => player.summonerName === wildcards.deathMaster?.picked
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
    allTeams.find(
      (team) => team.name === wildcards.baronSpecialists?.picked
    ) as {
      name: string;
      logo: string;
    }
  );

  return (
    <div className='mt-20 mb-16 lg:mb-0 flex flex-col overflow-y-auto overflow-x-hidden w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)]'>
      <h1 className='text-accent-gold text-2xl md:text-5xl font-kanit font-bold justify-self-start text-center my-10'>
        Arabian League Wildcards
      </h1>
      <div className='flex flex-col justify-between'>
        <WildCardResults
          allStats={allStats}
          selectedPlayer={
            Object.values(allPlayers)
              .flat()
              .find(
                (player) => player.summonerName === wildcards.killLeader?.picked
              ) as FantasyPlayer
          }
        />
        <WildCard
          title='Death Master'
          description='The player with the most deaths in the week.'
        >
          {Object.values(allPlayers).map((players) => {
            return players.map((player, index) => {
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
          title='Baron Specialists'
          description='The team with the most Barons taken in the week.'
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
