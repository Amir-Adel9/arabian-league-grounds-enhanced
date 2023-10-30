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
};

export type Team = {
  name: string;
  code: string;
  image: string;
  result: {
    outcome: string | null;
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
