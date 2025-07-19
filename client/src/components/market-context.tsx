import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Info } from "lucide-react";
import { MarketContext as MarketContextType } from "@/lib/types";

interface MarketContextProps {
  marketContext: MarketContextType;
}

export default function MarketContext({ marketContext }: MarketContextProps) {
  const getPerformanceColor = (performance: string) => {
    const numericValue = parseFloat(performance.replace(/[+%]/g, ''));
    if (numericValue > 5) return "text-green-600";
    if (numericValue > 0) return "text-green-500";
    if (numericValue > -5) return "text-red-500";
    return "text-red-600";
  };

  const getPerformanceBadge = (performance: string) => {
    const numericValue = parseFloat(performance.replace(/[+%]/g, ''));
    if (numericValue > 5) return "bg-green-100 text-green-800";
    if (numericValue > 0) return "bg-green-50 text-green-700";
    if (numericValue > -5) return "bg-red-50 text-red-700";
    return "bg-red-100 text-red-800";
  };

  const getPerformanceLabel = (performance: string) => {
    const numericValue = parseFloat(performance.replace(/[+%]/g, ''));
    if (numericValue > 5) return "Strong";
    if (numericValue > 0) return "Positive";
    if (numericValue > -5) return "Weak";
    return "Poor";
  };

  const getVixLevel = (vix: string) => {
    const vixValue = parseFloat(vix);
    if (vixValue < 15) return { label: "Low", color: "bg-green-100 text-green-800" };
    if (vixValue < 25) return { label: "Moderate", color: "bg-yellow-100 text-yellow-800" };
    return { label: "High", color: "bg-red-100 text-red-800" };
  };

  const vixInfo = getVixLevel(marketContext.vixLevel);

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-primary">Market Context</CardTitle>
            <p className="text-muted-foreground">Sector and broader market analysis</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(marketContext.sectorPerformance)}`}>
              {marketContext.sectorPerformance}
            </div>
            <p className="text-muted-foreground text-sm mb-2">Sector Performance (30-day)</p>
            <Badge className={getPerformanceBadge(marketContext.sectorPerformance)}>
              {getPerformanceLabel(marketContext.sectorPerformance)}
            </Badge>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(marketContext.spyPerformance)}`}>
              {marketContext.spyPerformance}
            </div>
            <p className="text-muted-foreground text-sm mb-2">S&P 500 (30-day)</p>
            <Badge className={getPerformanceBadge(marketContext.spyPerformance)}>
              {getPerformanceLabel(marketContext.spyPerformance)}
            </Badge>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {marketContext.vixLevel}
            </div>
            <p className="text-muted-foreground text-sm mb-2">VIX (Fear Index)</p>
            <Badge className={vixInfo.color}>
              {vixInfo.label}
            </Badge>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="font-medium text-blue-900 mb-2 flex items-center">
            <Info className="w-4 h-4 mr-2" />
            Market Sentiment Summary
          </h5>
          <p className="text-blue-800 text-sm">
            {marketContext.sentimentSummary}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
