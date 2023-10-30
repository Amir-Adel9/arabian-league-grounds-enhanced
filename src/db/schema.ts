import { InferSelectModel } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  clerkId: text('clerkId'),
  username: varchar('username', {
    length: 100,
  }),
  predictionPoints: int('predictionPoints').default(0),
});

export const prediction = mysqlTable('prediction', {
  id: serial('id').primaryKey(),
  userClerkId: text('userClerkId').notNull(),
  username: varchar('username', {
    length: 100,
  }).notNull(),
  matchId: text('matchId').notNull(),
  winningTeamId: text('winningTeamId').notNull(),
  losingTeamId: text('losingTeamId').notNull(),
  bestOf: int('bestOf').notNull(),
  winningTeamScore: int('winningTeamScore'),
  losingTeamScore: int('losingTeamScore'),
  state: text('state').default('unfulfilled'),
  createdAt: timestamp('createdAt').defaultNow(),
});

export type Prediction = InferSelectModel<typeof prediction>;
