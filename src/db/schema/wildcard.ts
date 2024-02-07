import { relations } from 'drizzle-orm';
import {
  mysqlTable,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core';
import { user } from './user';

export const wildcard = mysqlTable(
  'wildcard',
  {
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
    name: varchar('name', {
      length: 100,
    }).notNull(),
    picked: text('picked').notNull(),
    correct: text('correct'),
    state: text('state').default('unfulfilled'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  },
  (t) => ({
    userIdPlayerNameUnique: unique().on(t.name, t.userClerkId),
  })
);

export const wildcardRelations = relations(wildcard, ({ one }) => ({
  user: one(user, {
    fields: [wildcard.userClerkId, wildcard.username],
    references: [user.clerkId, user.username],
  }),
}));
