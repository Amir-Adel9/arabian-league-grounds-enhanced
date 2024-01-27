import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema/schema';

const connection = await mysql.createConnection({
  uri: process.env.PLANETSCALE_DATABASE_URL,
});

export const db = drizzle(connection, { schema, mode: 'planetscale' });
