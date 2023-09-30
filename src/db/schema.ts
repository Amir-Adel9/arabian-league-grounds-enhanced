import { mysqlTable, serial, text, varchar } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  clerkId: text('clerkId'),
  username: varchar('username', {
    length: 100,
  }),
});
