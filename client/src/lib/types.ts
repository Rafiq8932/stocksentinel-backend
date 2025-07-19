// Re-export types from shared schema to avoid duplication
export type { 
  StockData, 
  AIAnalysis, 
  TechnicalIndicators,
  FundamentalFactors,
  ReasoningPoint,
  RiskFactors,
  TimelineAnalysis,
  MarketContext
} from "@shared/schema";

export interface StockAnalysisResponse {
  stockData: StockData;
  aiAnalysis: AIAnalysis;
  riskScore: number;
  verdict: string;
  confidence: number;
}
