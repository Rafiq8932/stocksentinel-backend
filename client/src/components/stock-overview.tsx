import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, Building, ArrowUp, ArrowDown } from "lucide-react";
import { StockData } from "@/lib/types";

interface StockOverviewProps {
  stockData: StockData;
}

function getCurrencySymbol(exchange: string): string {
  if (exchange === 'NSI' || exchange === 'BOM' || exchange.includes('NSE') || exchange.includes('BSE')) {
    return '₹';
  }
  return '$';
}

export default function StockOverview({ stockData }: StockOverviewProps) {
  const isPositive = stockData.changePercent >= 0;
  
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-3xl font-bold text-primary">{stockData.symbol}</h2>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                {stockData.exchange}
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">{stockData.companyName}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary mb-1">
              {getCurrencySymbol(stockData.exchange)}{stockData.currentPrice.toFixed(2)}
            </div>
            <div className="flex items-center justify-end space-x-2">
              <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{getCurrencySymbol(stockData.exchange)}{stockData.changeAmount.toFixed(2)}
              </span>
              <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                ({isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
              </span>
              {isPositive ? (
                <ArrowUp className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-600" />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Volume</span>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-xl font-semibold">{stockData.volume}</div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Market Cap</span>
              <Building className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-xl font-semibold">{stockData.marketCap}</div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">52W High</span>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-xl font-semibold">{getCurrencySymbol(stockData.exchange)}{stockData.weekHigh52.toFixed(2)}</div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">52W Low</span>
              <TrendingDown className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-xl font-semibold">{getCurrencySymbol(stockData.exchange)}{stockData.weekLow52.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
