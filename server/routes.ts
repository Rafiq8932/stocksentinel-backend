import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { stockService } from "./services/stockService";
import { aiAnalysisService } from "./services/aiAnalysisService";
import { geminiAnalysisService } from "./services/geminiAnalysisService";
import { stockDataSchema, aiAnalysisSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get stock analysis with AI insights
  app.get("/api/stock/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      
      if (!symbol || symbol.length < 1 || symbol.length > 10) {
        return res.status(400).json({ message: "Invalid stock symbol" });
      }

      const upperSymbol = symbol.toUpperCase();
      
      // Check if we have recent analysis (within last 5 minutes)
      const existing = await storage.getStockAnalysis(upperSymbol);
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      
      if (existing && existing.updatedAt > fiveMinutesAgo) {
        return res.json({
          stockData: {
            symbol: existing.symbol,
            companyName: existing.companyName,
            currentPrice: parseFloat(existing.currentPrice),
            changeAmount: parseFloat(existing.changeAmount),
            changePercent: parseFloat(existing.changePercent),
            volume: existing.volume,
            marketCap: existing.marketCap,
            weekHigh52: parseFloat(existing.weekHigh52),
            weekLow52: parseFloat(existing.weekLow52),
            exchange: existing.exchange,
          },
          aiAnalysis: existing.aiAnalysis,
          riskScore: parseFloat(existing.riskScore),
          verdict: existing.verdict,
          confidence: existing.confidence,
        });
      }

      // Fetch fresh stock data
      let stockData;
      try {
        stockData = await stockService.getStockData(upperSymbol);
      } catch (error) {
        return res.status(404).json({ 
          message: `Stock symbol "${upperSymbol}" not found or data unavailable` 
        });
      }

      // Validate stock data
      const validatedStockData = stockDataSchema.parse(stockData);
      
      // Generate enhanced AI analysis with Gemini
      let aiAnalysis;
      try {
        // Try Gemini first for enhanced analysis
        aiAnalysis = await geminiAnalysisService.generateEnhancedAnalysis(validatedStockData);
        console.log(`Generated enhanced Gemini analysis for ${upperSymbol}`);
      } catch (error) {
        console.warn(`Gemini analysis failed for ${upperSymbol}, falling back to basic analysis:`, error);
        // Fallback to basic analysis if Gemini fails
        aiAnalysis = await aiAnalysisService.generateAnalysis(validatedStockData);
      }
      
      // Validate AI analysis
      const validatedAiAnalysis = aiAnalysisSchema.parse(aiAnalysis);

      // Store or update analysis
      const analysisData = {
        symbol: validatedStockData.symbol,
        companyName: validatedStockData.companyName,
        currentPrice: validatedStockData.currentPrice.toString(),
        changeAmount: validatedStockData.changeAmount.toString(),
        changePercent: validatedStockData.changePercent.toString(),
        volume: validatedStockData.volume,
        marketCap: validatedStockData.marketCap,
        weekHigh52: validatedStockData.weekHigh52.toString(),
        weekLow52: validatedStockData.weekLow52.toString(),
        exchange: validatedStockData.exchange,
        aiAnalysis: validatedAiAnalysis,
        riskScore: validatedAiAnalysis.riskFactors.overallScore.toString(),
        verdict: validatedAiAnalysis.verdict,
        confidence: validatedAiAnalysis.confidence,
      };

      if (existing) {
        await storage.updateStockAnalysis(upperSymbol, analysisData);
      } else {
        await storage.createStockAnalysis(analysisData);
      }

      res.json({
        stockData: validatedStockData,
        aiAnalysis: validatedAiAnalysis,
        riskScore: validatedAiAnalysis.riskFactors.overallScore,
        verdict: validatedAiAnalysis.verdict,
        confidence: validatedAiAnalysis.confidence,
      });

    } catch (error) {
      console.error("Error in stock analysis:", error);
      res.status(500).json({ 
        message: "Internal server error while analyzing stock" 
      });
    }
  });

  // Validate stock symbol
  app.get("/api/validate/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      
      if (!symbol || symbol.length < 1 || symbol.length > 10) {
        return res.status(400).json({ message: "Invalid stock symbol" });
      }

      const isValid = await stockService.validateSymbol(symbol.toUpperCase());
      res.json({ valid: isValid });
      
    } catch (error) {
      console.error("Error validating symbol:", error);
      res.status(500).json({ message: "Error validating stock symbol" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
