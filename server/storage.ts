import { stockAnalysis, type StockAnalysis, type InsertStockAnalysis } from "@shared/schema";

export interface IStorage {
  getStockAnalysis(symbol: string): Promise<StockAnalysis | undefined>;
  createStockAnalysis(analysis: InsertStockAnalysis): Promise<StockAnalysis>;
  updateStockAnalysis(symbol: string, analysis: Partial<InsertStockAnalysis>): Promise<StockAnalysis | undefined>;
}

export class MemStorage implements IStorage {
  private stockAnalyses: Map<string, StockAnalysis>;
  private currentId: number;

  constructor() {
    this.stockAnalyses = new Map();
    this.currentId = 1;
  }

  async getStockAnalysis(symbol: string): Promise<StockAnalysis | undefined> {
    return Array.from(this.stockAnalyses.values()).find(
      (analysis) => analysis.symbol.toLowerCase() === symbol.toLowerCase()
    );
  }

  async createStockAnalysis(insertAnalysis: InsertStockAnalysis): Promise<StockAnalysis> {
    const id = this.currentId++;
    const now = new Date();
    const analysis: StockAnalysis = {
      ...insertAnalysis,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.stockAnalyses.set(analysis.symbol.toLowerCase(), analysis);
    return analysis;
  }

  async updateStockAnalysis(symbol: string, updateData: Partial<InsertStockAnalysis>): Promise<StockAnalysis | undefined> {
    const existing = await this.getStockAnalysis(symbol);
    if (!existing) return undefined;

    const updated: StockAnalysis = {
      ...existing,
      ...updateData,
      updatedAt: new Date(),
    };
    this.stockAnalyses.set(symbol.toLowerCase(), updated);
    return updated;
  }
}

export const storage = new MemStorage();
