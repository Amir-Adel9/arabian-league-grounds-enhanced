'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FantasyPlayer } from '@/entities/fantasy/fantasy.types';
import WinningPlayerCard from './WiningPlayerCard';
import { currentUser } from '@clerk/nextjs';
import { db } from '@/db';
import { user } from '@/db/schema/schema';
import { eq, sql } from 'drizzle-orm';
import { useEffect } from 'react';
import { fulfillWildCard } from '../actions/wildcardActions';

const WildCardResults = ({
  allStats,
  selectedPlayer,
}: {
  allStats: {
    summonerName: string;
    teamLogo: string;
    role: string;
    kills: number;
  }[];
  selectedPlayer: FantasyPlayer | null | undefined;
}) => {
  useEffect(() => {
    fulfillWildCard({
      wildCardCorrect: 'mercyy, Jalleba',
      wildcardName: 'killLeader',
    });
  }, []);

  return (
    <div className='px-20 py-6 mx-auto w-[40%]'>
      <Accordion
        type='single'
        collapsible
        className='w-full'
        defaultValue='week-1'
      >
        <AccordionItem className='border-border' value='week-1'>
          <AccordionTrigger className='hover:no-underline '>
            <span className='text-center w-full text-muted-foreground font-rubik text-lg'>
              Week 1 Results
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className='w-full p-4 border border-border rounded-lg flex flex-col gap-3'>
              <h2 className='text-accent-gold font-kanit text-center text-xl'>
                Kill Leader
              </h2>
              <p>
                <p className='text-muted-foreground text-center'>
                  The player with the most kills in the week.
                </p>
              </p>
              <div className='flex gap-2 items-center justify-center'>
                {allStats
                  .filter(
                    (player) =>
                      player.summonerName === 'mercyy' ||
                      player.summonerName === 'Jalleba'
                  )
                  .map((player, index) => {
                    return (
                      <WinningPlayerCard
                        key={index + player.summonerName}
                        player={player as unknown as FantasyPlayer}
                        selectedPlayer={selectedPlayer}
                      />
                    );
                  })}
              </div>
              {selectedPlayer && (
                <div className='flex justify-center gap-1'>
                  {selectedPlayer.summonerName === 'mercyy' ||
                  selectedPlayer.summonerName === 'Jalleba' ? (
                    <>
                      <span>You Picked: </span>
                      <span className='text-green-700 font-semibold'>
                        {selectedPlayer.summonerName}{' '}
                        <span className='text-muted-foreground'>
                          (+200 Credits)
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span>You Picked: </span>
                      <span className='text-muted-foreground font-semibold'>
                        {selectedPlayer.summonerName} (
                        {
                          allStats.find(
                            (player) =>
                              player.summonerName ===
                              selectedPlayer.summonerName
                          )?.kills
                        }{' '}
                        kills)
                      </span>
                    </>
                  )}
                </div>
              )}
              <span className='text-center'>
                Most Picked:{' '}
                <span className='text-muted-foreground font-semibold'>
                  Leo (3 Kills)
                </span>
              </span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default WildCardResults;
