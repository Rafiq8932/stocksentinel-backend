import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, ThumbsUp, ThumbsDown, Minus, TrendingUp, Calculator, Lightbulb, Check, AlertTriangle } from "lucide-react";
import { AIAnalysis } from "@/lib/types";

interface AIAnalysisProps {
  aiAnalysis: AIAnalysis;
}

export default function AIAnalysisCard({ aiAnalysis }: AIAnalysisProps) {
  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'BUY':
        return <ThumbsUp className="w-6 h-6 text-white" />;
      case 'HOLD':
        return <Minus className="w-6 h-6 text-white" />;
      case 'AVOID':
        return <ThumbsDown className="w-6 h-6 text-white" />;
      default:
        return <Minus className="w-6 h-6 text-white" />;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'BUY':
        return 'bg-green-500';
      case 'HOLD':
        return 'bg-yellow-500';
      case 'AVOID':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getVerdictBorderColor = (verdict: string) => {
    switch (verdict) {
      case 'BUY':
        return 'border-green-500 bg-green-50';
      case 'HOLD':
        return 'border-yellow-500 bg-yellow-50';
      case 'AVOID':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getVerdictTextColor = (verdict: string) => {
    switch (verdict) {
      case 'BUY':
        return 'text-green-700';
      case 'HOLD':
        return 'text-yellow-700';
      case 'AVOID':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-primary">AI Investment Analysis</CardTitle>
            <p className="text-muted-foreground">Advanced algorithmic assessment powered by machine learning</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Investment Verdict */}
        <div className={`border-l-4 rounded-lg p-6 ${getVerdictBorderColor(aiAnalysis.verdict)}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getVerdictColor(aiAnalysis.verdict)}`}>
                {getVerdictIcon(aiAnalysis.verdict)}
              </div>
              <div>
                <h4 className={`text-2xl font-bold ${getVerdictTextColor(aiAnalysis.verdict)}`}>
                  {aiAnalysis.verdict}
                </h4>
                <p className={`font-medium ${getVerdictTextColor(aiAnalysis.verdict)}`}>
                  {aiAnalysis.verdict === 'BUY' ? 'Strong upward momentum detected' :
                   aiAnalysis.verdict === 'HOLD' ? 'Balanced risk-reward profile' :
                   'Caution advised for new positions'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Confidence Level</div>
              <div className={`text-2xl font-bold ${getVerdictTextColor(aiAnalysis.verdict)}`}>
                {aiAnalysis.confidence}%
              </div>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p className={`leading-relaxed ${getVerdictTextColor(aiAnalysis.verdict)}`}>
              {aiAnalysis.summary}
            </p>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Technical Analysis */}
          <div className="bg-muted/50 rounded-lg p-5">
            <h5 className="font-semibold text-primary mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-secondary" />
              Technical Indicators
            </h5>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">RSI (14-day)</span>
                <span className="font-semibold text-foreground">{aiAnalysis.technicalIndicators.rsi}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">MACD Signal</span>
                <span className="font-semibold text-foreground">{aiAnalysis.technicalIndicators.macd}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Moving Average</span>
                <span className="font-semibold text-foreground">{aiAnalysis.technicalIndicators.movingAverage}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Volume Trend</span>
                <span className="font-semibold text-foreground">{aiAnalysis.technicalIndicators.volumeTrend}</span>
              </li>
            </ul>
          </div>

          {/* Fundamental Analysis */}
          <div className="bg-muted/50 rounded-lg p-5">
            <h5 className="font-semibold text-primary mb-4 flex items-center">
              <Calculator className="w-4 h-4 mr-2 text-secondary" />
              Fundamental Factors
            </h5>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">P/E Ratio</span>
                <span className="font-semibold text-foreground">{aiAnalysis.fundamentalFactors.peRatio}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Revenue Growth</span>
                <span className="font-semibold text-foreground">{aiAnalysis.fundamentalFactors.revenueGrowth}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Profit Margin</span>
                <span className="font-semibold text-foreground">{aiAnalysis.fundamentalFactors.profitMargin}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Debt-to-Equity</span>
                <span className="font-semibold text-foreground">{aiAnalysis.fundamentalFactors.debtToEquity}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Key Reasoning Points */}
        <div>
          <h5 className="font-semibold text-primary mb-4 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-secondary" />
            Key Investment Reasoning
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiAnalysis.reasoningPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  point.type === 'positive' ? 'bg-green-100' :
                  point.type === 'negative' ? 'bg-red-100' : 
                  'bg-yellow-100'
                }`}>
                  {point.type === 'positive' ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : point.type === 'negative' ? (
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-yellow-600" />
                  )}
                </div>
                <div>
                  <h6 className="font-medium text-foreground">{point.title}</h6>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
