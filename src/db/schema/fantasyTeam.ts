import { relations } from 'drizzle-orm';
import {
  foreignKey,
  int,
  mysqlTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/mysql-core';
import { user } from './user';
import { playerToFantasyTeam } from './playerToFantasyTeam';

export const fantasyTeam = mysqlTable('fantasyTeam', {
  id: serial('id').primaryKey().notNull(),
  userClerkId: varchar('userClerkId', {
    length: 100,
  })
    .notNull()
    .references(() => user.clerkId),
});

export const fantasyTeamRelations = relations(fantasyTeam, ({ one, many }) => ({
  user: one(user, {
    fields: [fantasyTeam.userClerkId],
    references: [user.clerkId],
  }),
  fantasyPlayersToTeams: many(playerToFantasyTeam),
}));
