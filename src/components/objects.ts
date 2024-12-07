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