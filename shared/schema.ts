import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stockAnalysis = pgTable("stock_analysis", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  companyName: text("company_name").notNull(),
  currentPrice: decimal("current_price", { precision: 10, scale: 2 }).notNull(),
  changeAmount: decimal("change_amount", { precision: 10, scale: 2 }).notNull(),
  changePercent: decimal("change_percent", { precision: 5, scale: 2 }).notNull(),
  volume: text("volume").notNull(),
  marketCap: text("market_cap").notNull(),
  weekHigh52: decimal("week_high_52", { precision: 10, scale: 2 }).notNull(),
  weekLow52: decimal("week_low_52", { precision: 10, scale: 2 }).notNull(),
  exchange: text("exchange").notNull(),
  aiAnalysis: jsonb("ai_analysis").notNull(),
  riskScore: decimal("risk_score", { precision: 3, scale: 1 }).notNull(),
  verdict: text("verdict").notNull(), // BUY, HOLD, AVOID
  confidence: integer("confidence").notNull(), // 0-100
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertStockAnalysisSchema = createInsertSchema(stockAnalysis).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertStockAnalysis = z.infer<typeof insertStockAnalysisSchema>;
export type StockAnalysis = typeof stockAnalysis.$inferSelect;

// Additional schemas for API responses
export const stockDataSchema = z.object({
  symbol: z.string(),
  companyName: z.string(),
  currentPrice: z.number(),
  changeAmount: z.number(),
  changePercent: z.number(),
  volume: z.string(),
  marketCap: z.string(),
  weekHigh52: z.number(),
  weekLow52: z.number(),
  exchange: z.string(),
});

export const aiAnalysisSchema = z.object({
  verdict: z.enum(["BUY", "HOLD", "AVOID"]),
  confidence: z.number().min(0).max(100),
  summary: z.string(),
  technicalIndicators: z.object({
    rsi: z.string(),
    macd: z.string(),
    movingAverage: z.string(),
    volumeTrend: z.string(),
  }),
  fundamentalFactors: z.object({
    peRatio: z.string(),
    revenueGrowth: z.string(),
    profitMargin: z.string(),
    debtToEquity: z.string(),
  }),
  reasoningPoints: z.array(z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(["positive", "negative", "neutral"]),
  })),
  riskFactors: z.object({
    marketVolatility: z.number().min(0).max(10),
    sectorRisk: z.number().min(0).max(10),
    liquidityRisk: z.number().min(0).max(10),
    financialHealth: z.number().min(0).max(10),
    overallScore: z.number().min(0).max(10),
  }),
  timeline: z.object({
    shortTerm: z.object({
      outlook: z.string(),
      sentiment: z.string(),
      description: z.string(),
    }),
    mediumTerm: z.object({
      outlook: z.string(),
      sentiment: z.string(),
      description: z.string(),
    }),
    longTerm: z.object({
      outlook: z.string(),
      sentiment: z.string(),
      description: z.string(),
    }),
    catalysts: z.array(z.string()),
  }),
  marketContext: z.object({
    sectorPerformance: z.string(),
    spyPerformance: z.string(),
    vixLevel: z.string(),
    sentimentSummary: z.string(),
  }),
});

export type StockData = z.infer<typeof stockDataSchema>;
export type AIAnalysis = z.infer<typeof aiAnalysisSchema>;

// Export individual interface types for component usage
export type TechnicalIndicators = AIAnalysis['technicalIndicators'];
export type FundamentalFactors = AIAnalysis['fundamentalFactors'];
export type ReasoningPoint = AIAnalysis['reasoningPoints'][0];
export type RiskFactors = AIAnalysis['riskFactors'];
export type TimelineAnalysis = AIAnalysis['timeline'];
export type MarketContext = AIAnalysis['marketContext'];
