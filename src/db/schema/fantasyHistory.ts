import { relations } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const fantasyHistory = mysqlTable('fantasyHistory', {
  id: serial('id').primaryKey(),
  fantasyTeamId: int('fantasyTeamId').notNull(),
  playerId: int('playerId').notNull(),
  role: varchar('role', {
    length: 10,
  }).notNull(),
  points: int('points').default(0).notNull(),
  pickedAt: timestamp('pickedAt').defaultNow().notNull(),
  droppedAt: timestamp('droppedAt').notNull(),
});
