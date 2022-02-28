export interface CoCParamsAPIClans {
  name?: string;
  limit: number;
  warFrequency?: string;
  locationId?: number;
  minMembers?: number;
  maxMembers?: number;
  minClanPoints?: number;
  minClanLevel?: number;
  after?: string;
  before?: string;
}

export interface CoCAPIClansResponse {
  items: Clan[];
  paging: Paging;
}

export interface Clan {
  memberList: any;
  warLeague: any;
  tag: string;
  clanLevel: number;
  chatLanguage: any;
  isWarLogPublic: boolean;
  warWinStreak: number;
  warFrequency: string;
  warLosses: number;
  clanPoints: number;
  warWins: number;
  warTies: number;
  clanVersusPoints: number;
  requiredTrophies: number;
  requiredVersusTrophies: number;
  requiredTownhallLevel: number;
  labels: any;
  name: string;
  location: any;
  type: string;
  members: number;
  description: string;
  badgeUrls: any;
}
export interface Paging {
  cursors: {
    after: string;
    before?: string;
  };
}
export type PagingType = 'after' | 'before';
