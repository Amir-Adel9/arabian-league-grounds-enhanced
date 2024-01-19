import { relations } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { user } from './user';

export const prediction = mysqlTable('prediction', {
  id: serial('id').primaryKey(),
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
  matchId: text('matchId').notNull(),
  winningTeamId: text('winningTeamId').notNull(),
  losingTeamId: text('losingTeamId').notNull(),
  bestOf: int('bestOf').notNull(),
  winningTeamScore: int('winningTeamScore'),
  losingTeamScore: int('losingTeamScore'),
  state: text('state').default('unfulfilled'),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const predictionRelations = relations(prediction, ({ one }) => ({
  user: one(user, {
    fields: [prediction.userClerkId],
    references: [user.clerkId],
  }),
}));
