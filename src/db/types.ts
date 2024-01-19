import { InferSelectModel } from 'drizzle-orm';
import { fantasyTeam } from './schema/fantasyTeam';
import { player } from './schema/player';
import { playerToFantasyTeam } from './schema/playerToFantasyTeam';
import { prediction } from './schema/prediction';
import { user } from './schema/user';

export type User = InferSelectModel<typeof user> & {
  predictions: Prediction[];
};
export type Prediction = InferSelectModel<typeof prediction>;
export type FantasyTeam = InferSelectModel<typeof fantasyTeam> & {
  user: User;
  PlayerToFantasyTeam: PlayerToFantasyTeam[];
};
export type Player = InferSelectModel<typeof player> & {
  PlayerToFantasyTeam: PlayerToFantasyTeam[];
};
export type PlayerToFantasyTeam = InferSelectModel<
  typeof playerToFantasyTeam
> & {
  fantasyTeam: FantasyTeam;
  player: Player;
};
