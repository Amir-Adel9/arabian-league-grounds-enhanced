import { relations } from 'drizzle-orm';
import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
import { fantasyTeam } from './fantasyTeam';
import { prediction } from './prediction';
import { wildcard } from './wildcard';

export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerkId', {
    length: 100,
  })
    .unique()
    .notNull(),
  username: varchar('username', {
    length: 100,
  }).unique(),
  predictionPoints: int('predictionPoints').default(0).notNull(),
  fantasyPoints: int('fantasyPoints').default(0).notNull(),
  credits: int('credits').default(700).notNull(),
});

export const userRelations = relations(user, ({ many, one }) => ({
  fantasyTeams: one(fantasyTeam),
  predictions: many(prediction),
  wildcard: many(wildcard),
}));
