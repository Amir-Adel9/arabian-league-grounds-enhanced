export type Event = {
  startTime: string;
  state: string;
  type: string;
  blockName: string;
  league: {
    name: string;
    slug: string;
  };
  match: Match;
};

export type Match = {
  id: string;
  flags: string[];
  teams: Team[];
  strategy: {
    type: string;
    count: number;
  };
  stats?: Stats;
};

export type Game = {
  number: number;
  id: string;
  state: string;
  teams: {
    id: string;
    side: 'blue' | 'red';
  }[];
};

export type Stats = {
  state: 'Error' | 'Success';
  esportsGameId: string;
  esportsMatchId: string;
  rosters: {
    blueTeam: {
      esportsTeamId: string;
      participants: ParticipantMetadata[];
    };
    redTeam: {
      esportsTeamId: string;
      participants: ParticipantMetadata[];
    };
  };
  gameMetadata: GameMetadata;
  lastFrame: GameFrame;
  event: Event;
};

export type GameFrame = {
  rfc460Timestamp: Date;
  gameState: GameState;
  blueTeam: TeamStats;
  redTeam: TeamStats;
};

export type TeamStats = {
  totalGold: number;
  inhibitors: number;
  towers: number;
  barons: number;
  totalKills: number;
  dragons: Dragon[];
  participants: Participant[];
};

export type Dragon =
  | 'chemtech'
  | 'ocean'
  | 'mountain'
  | 'infernal'
  | 'elder'
  | 'cloud'
  | 'hextech';

export type Participant = {
  participantId: number;
  totalGold: number;
  level: number;
  kills: number;
  deaths: number;
  assists: number;
  creepScore: number;
  currentHealth: number;
  maxHealth: number;
};

export type GameState = 'in_game' | 'finished';

export type GameMetadata = {
  patchVersion: string;
  blueTeamMetadata: TeamMetadata;
  redTeamMetadata: TeamMetadata;
};

export type TeamMetadata = {
  esportsTeamId: string;
  participantMetadata: ParticipantMetadata[];
};

export type ParticipantMetadata = {
  participantId: number;
  esportsPlayerId: string;
  summonerName: string;
  championId: string;
  role: string;
  d: string;
};

export type Team = {
  name: string;
  code: string;
  image: string;
  result: {
    outcome: 'win' | 'loss' | null;
    gameWins: number;
  };
  record: {
    wins: number;
    losses: number;
  };
};

export type GameDay = {
  date: string;
  events: Event[];
};
