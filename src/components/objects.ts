export interface TrendingStock {
  id: string;
  companyName: string;
  stockName: string;
  currentPrice: number;
  dailypercentGain: number;
  currentEvalGain: number;
  overallEvalGain: number;
  tradeActivity: string;
}

export interface TradeItem {
  id: string;
  symbol: string;
  strength: number;
  method: string;
}

export interface StockHistory {
  id: string;
  start: string;
  end: string;
  method: string;
  strategy: string;
  gain: string;
  overall: string;
  symbol: string;
}

export interface DailyBarInfo {
  c: number; // Closing Price
  h: number; 
  l: number;
  n: number;
  o: number;
  t: string; // Date
  v: number;
  vw: number;
}

export interface LatestQuoteInfo {
  ap: number; 
  as: number; 
  ax: string;
  bp: number;
  bs: number;
  bx: string;
  c: string[];
  t: string;
  z: string;
}

export interface LatestTradeInfo {
  c: string[]; 
  i: number; 
  p: number;
  s: number;
  t: string;
  z: string;
}

export interface MinuteBarInfo {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: string;
  v: number;
  vw: number;
}

export interface SnapshotInfo {
  id: string;
  dailyBar: DailyBarInfo;
  latestQuote: LatestQuoteInfo;
  latestTrade: LatestTradeInfo;
  minuteBar: MinuteBarInfo;
  prevDailyBar: DailyBarInfo; 
}

export interface StockSnapshot {
  id: string;
  snapshot: Record<string, SnapshotInfo>;
  symbol: string;
}

export interface PromotedUserDetails {
  email: string;
  idNumber: string;
  phone: string;
  name: string;
  address: string;
  approvedStatus: number;
  userType: string;
}


export type UserType = "registered" | "promoted" | "subscribed" | "premium" | "public"

export const userPermissions: Record<string, string[]> = {
  "registered": ["registered", "public"],
  "promoted": ["registered", "public", "promoted"],
  "subscribed": ["registered", "public", "promoted", "subscribed"],
  "premium": ["registered", "promoted", "subscribed", "premium", "public"],
  "public": ["public"]
}
