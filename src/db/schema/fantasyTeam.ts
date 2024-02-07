import { relations } from 'drizzle-orm';
import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
import { user } from './user';
import { playerToFantasyTeam } from './playerToFantasyTeam';

export const fantasyTeam = mysqlTable('fantasyTeam', {
  id: serial('id').primaryKey().notNull(),
  userClerkId: varchar('userClerkId', {
    length: 100,
  })
    .notNull()
    .references(() => user.clerkId),
  username: varchar('username', {
    length: 100,
  })
    .notNull()
    .references(() => user.username),
});

export const fantasyTeamRelations = relations(fantasyTeam, ({ one, many }) => ({
  user: one(user, {
    fields: [fantasyTeam.userClerkId, fantasyTeam.username],
    references: [user.clerkId, user.username],
  }),
  fantasyPlayersToTeams: many(playerToFantasyTeam),
}));
