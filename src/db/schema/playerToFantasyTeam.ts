import { relations } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { fantasyTeam } from './fantasyTeam';
import { player } from './player';

export const playerToFantasyTeam = mysqlTable(
  'playerToFantasyTeam',
  {
    fantasyTeamId: int('fantasyTeamId')
      .notNull()
      .references(() => fantasyTeam.id),
    playerId: serial('playerId').references(() => player.id),
    playerSummonerName: varchar('playerSummonerName', {
      length: 100,
    }).notNull(),
    role: varchar('role', {
      length: 10,
    }).notNull(),
    points: int('points').default(0).notNull(),
    pickedAt: timestamp('pickedAt').defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey(t.fantasyTeamId, t.role),
  })
);

export const playerToFantasyTeamRelations = relations(
  playerToFantasyTeam,
  ({ one }) => ({
    fantasyTeam: one(fantasyTeam, {
      fields: [playerToFantasyTeam.fantasyTeamId],
      references: [fantasyTeam.id],
    }),
    player: one(player, {
      fields: [
        playerToFantasyTeam.playerId,
        playerToFantasyTeam.playerSummonerName,
      ],
      references: [player.id, player.summonerName],
    }),
  })
);
