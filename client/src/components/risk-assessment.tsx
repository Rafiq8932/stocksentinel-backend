import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield } from "lucide-react";
import { RiskFactors } from "@/lib/types";

interface RiskAssessmentProps {
  riskFactors: RiskFactors;
}

export default function RiskAssessment({ riskFactors }: RiskAssessmentProps) {
  const getRiskColor = (score: number) => {
    if (score <= 3) return "text-green-600";
    if (score <= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return "Low";
    if (score <= 6) return "Moderate";
    return "High";
  };

  const getProgressColor = (score: number) => {
    if (score <= 3) return "bg-green-500";
    if (score <= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-primary">Risk Assessment</CardTitle>
            <p className="text-muted-foreground">Comprehensive risk analysis</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-foreground font-medium">Overall Risk Score</span>
            <span className={`text-2xl font-bold ${getRiskColor(riskFactors.overallScore)}`}>
              {riskFactors.overallScore}/10
            </span>
          </div>
          <Progress 
            value={riskFactors.overallScore * 10} 
            className="h-3"
          />
          <p className="text-sm text-muted-foreground mt-2">
            {getRiskLevel(riskFactors.overallScore)} risk level - {
              riskFactors.overallScore <= 3 ? "suitable for conservative portfolios" :
              riskFactors.overallScore <= 6 ? "suitable for growth-oriented portfolios" :
              "suitable for aggressive portfolios only"
            }
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Market Volatility</span>
            <div className="flex items-center space-x-2">
              <Progress 
                value={riskFactors.marketVolatility * 10} 
                className="w-16 h-2"
              />
              <span className={`text-sm font-semibold ${getRiskColor(riskFactors.marketVolatility)}`}>
                {riskFactors.marketVolatility}/10
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Sector Risk</span>
            <div className="flex items-center space-x-2">
              <Progress 
                value={riskFactors.sectorRisk * 10} 
                className="w-16 h-2"
              />
              <span className={`text-sm font-semibold ${getRiskColor(riskFactors.sectorRisk)}`}>
                {riskFactors.sectorRisk}/10
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Liquidity Risk</span>
            <div className="flex items-center space-x-2">
              <Progress 
                value={riskFactors.liquidityRisk * 10} 
                className="w-16 h-2"
              />
              <span className={`text-sm font-semibold ${getRiskColor(riskFactors.liquidityRisk)}`}>
                {riskFactors.liquidityRisk}/10
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Financial Health</span>
            <div className="flex items-center space-x-2">
              <Progress 
                value={riskFactors.financialHealth * 10} 
                className="w-16 h-2"
              />
              <span className={`text-sm font-semibold ${getRiskColor(riskFactors.financialHealth)}`}>
                {riskFactors.financialHealth}/10
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
