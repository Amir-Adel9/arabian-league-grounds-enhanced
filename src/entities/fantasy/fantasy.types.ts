export type FantasyPlayer = {
  id: number;
  name: string;
  nationality: string;
  flagUrl?: string;
  summonerName: string;
  role: 'top' | 'jungle' | 'mid' | 'bot' | 'support';
  cost: number;
  teamName: string;
  teamSlug: string;
  teamCode: string;
};

export type FantasyRoster = {
  top: FantasyPlayer;
  jungle: FantasyPlayer;
  mid: FantasyPlayer;
  bot: FantasyPlayer;
  support: FantasyPlayer;
};
