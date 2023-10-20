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
  userId: text('userId'),
  userClerkId: text('userClerkId'),
  username: varchar('username', {
    length: 100,
  }),
  matchId: text('matchId'),
  winningTeamId: text('winningTeamId'),
  losingTeamId: text('losingTeamId'),
  createdAt: timestamp('createdAt').defaultNow(),
  state: text('state').default('unfulfilled'),
});
