import { relations } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  serial,
  text,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core';
import { playerToFantasyTeam } from './playerToFantasyTeam';
export const player = mysqlTable(
  'player',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', {
      length: 100,
    }),
    summonerName: varchar('summonerName', {
      length: 100,
    }).notNull(),
    nationality: text('nationality').notNull(),
    role: text('role').notNull(),
    cost: int('cost').notNull(),
    teamName: text('teamName'),
    teamCode: text('teamCode'),
    teamSlug: text('teamSlug'),
    kills: int('kills').default(0),
    deaths: int('deaths').default(0),
    assists: int('assists').default(0),
    pointsFromKills: int('pointsFromKills').default(0),
    pointsFromDeaths: int('pointsFromDeaths').default(0),
    pointsFromAssists: int('pointsFromAssists').default(0),
    pointsFromGameWins: int('pointsFromGameWins').default(0),
    totalFantasyPoints: int('totalFantasyPoints').default(0),
  },
  (t) => ({
    unq: unique('summonerName').on(t.summonerName),
  })
);

export const playerRelations = relations(player, ({ many }) => ({
  fantasyPlayersToTeams: many(playerToFantasyTeam),
}));
