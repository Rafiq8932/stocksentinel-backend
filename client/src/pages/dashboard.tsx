import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/search-bar";
import IndianStockSearch from "@/components/indian-stock-search";
import LoadingIndicator from "@/components/loading-indicator";
import StockOverview from "@/components/stock-overview";
import AIAnalysisCard from "@/components/ai-analysis";
import AIReasoningDetail from "@/components/ai-reasoning-detail";
import RiskAssessment from "@/components/risk-assessment";
import TimelineAnalysis from "@/components/timeline-analysis";
import MarketContext from "@/components/market-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Activity, Users, BarChart3, Clock } from "lucide-react";
import { StockAnalysisResponse } from "@/lib/types";

export default function Dashboard() {
  const [searchSymbol, setSearchSymbol] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const { data: stockAnalysis, isLoading, error, refetch } = useQuery<StockAnalysisResponse>({
    queryKey: ["/api/stock", searchSymbol],
    enabled: !!searchSymbol,
  });

  // Update timestamp
  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/New_York',
        timeZoneName: 'short'
      });
      setLastUpdated(`Last updated: ${timeString}`);
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (symbol: string) => {
    setSearchSymbol(symbol);
  };

  const handleRefresh = () => {
    if (searchSymbol) {
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      {/* Header Section - Screener.in inspired */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Logo and Title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">StockScope</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Indian Stock Market Analytics</p>
              </div>
            </div>
            
            {/* Market Status Indicators */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">NSE Open</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">BSE Open</span>
              </div>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Live Data
              </Badge>
            </div>
          </div>
          
          {/* Enhanced Search */}
          <IndianStockSearch onStockSelect={handleSearch} isLoading={isLoading} />
          
          {/* Popular Stocks */}
          {!searchSymbol && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Popular Stocks</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'SBIN', 'BHARTIARTL', 'TITAN'].map(stock => (
                  <Badge 
                    key={stock}
                    variant="secondary" 
                    className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900 dark:hover:text-blue-300 transition-colors"
                    onClick={() => handleSearch(stock)}
                  >
                    {stock}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <Card className="mb-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardContent className="flex items-center gap-3 pt-6">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <p className="text-red-800 dark:text-red-200">
                Error: {error.message}
              </p>
            </CardContent>
          </Card>
        )}

        {isLoading && <LoadingIndicator />}

        {stockAnalysis && (
          <div className="space-y-6">
            {/* Stock Overview Card */}
            <StockOverview stockData={stockAnalysis.stockData} />
            
            {/* Analysis Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <AIAnalysisCard aiAnalysis={stockAnalysis.aiAnalysis} />
                <TimelineAnalysis timeline={stockAnalysis.aiAnalysis.timeline} />
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                <RiskAssessment riskFactors={stockAnalysis.aiAnalysis.riskFactors} />
                <MarketContext marketContext={stockAnalysis.aiAnalysis.marketContext} />
              </div>
            </div>
            
            {/* Detailed Reasoning - Full Width */}
            <AIReasoningDetail aiAnalysis={stockAnalysis.aiAnalysis} />
          </div>
        )}

        {/* Welcome Screen - Screener.in inspired */}
        {!searchSymbol && !isLoading && (
          <div className="py-12">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Intelligent Stock Analysis for Indian Markets
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Get AI-powered insights, detailed analysis, and investment recommendations for NSE & BSE stocks
              </p>
            </div>
            
            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Real-time Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    Live stock prices, volume, and market data from NSE and BSE exchanges
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    Gemini-powered technical and fundamental analysis with clear BUY/HOLD/AVOID signals
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Market Context</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    Sector performance, FII/DII flows, and Indian market-specific insights
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">65+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Stocks Covered</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">2</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Exchanges</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">AI</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Powered</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">Live</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Updates</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Last Updated */}
        {lastUpdated && (
          <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-8 py-4">
            {lastUpdated}
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Made with ❤️ by <span className="font-medium text-slate-900 dark:text-white">Rafiq Ansari</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
