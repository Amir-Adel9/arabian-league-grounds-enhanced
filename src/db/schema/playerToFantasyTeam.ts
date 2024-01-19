import { relations } from 'drizzle-orm';
import {
  foreignKey,
  int,
  mysqlTable,
  primaryKey,
  serial,
  text,
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
    playerId: int('playerId').references(() => player.id),
    role: varchar('role', {
      length: 10,
    }).notNull(),
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
      fields: [playerToFantasyTeam.playerId],
      references: [player.id],
    }),
  })
);
