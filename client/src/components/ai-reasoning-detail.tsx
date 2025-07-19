import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, XCircle, AlertCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AIAnalysis } from "@/lib/types";

interface AIReasoningDetailProps {
  aiAnalysis: AIAnalysis;
}

export default function AIReasoningDetail({ aiAnalysis }: AIReasoningDetailProps) {
  const getVerdictDetails = (verdict: string) => {
    switch (verdict) {
      case 'BUY':
        return {
          title: "Why BUY This Stock",
          subtitle: "Our AI recommends buying based on strong positive indicators",
          icon: <TrendingUp className="w-6 h-6 text-white" />,
          bgColor: "bg-green-600",
          borderColor: "border-green-500",
          textColor: "text-green-700",
          bgLight: "bg-green-50"
        };
      case 'HOLD':
        return {
          title: "Why HOLD This Stock", 
          subtitle: "Our AI recommends holding due to balanced risk-reward profile",
          icon: <Minus className="w-6 h-6 text-white" />,
          bgColor: "bg-yellow-500",
          borderColor: "border-yellow-500", 
          textColor: "text-yellow-700",
          bgLight: "bg-yellow-50"
        };
      case 'AVOID':
        return {
          title: "Why AVOID This Stock",
          subtitle: "Our AI recommends avoiding due to significant risk factors",
          icon: <TrendingDown className="w-6 h-6 text-white" />,
          bgColor: "bg-red-600",
          borderColor: "border-red-500",
          textColor: "text-red-700", 
          bgLight: "bg-red-50"
        };
      default:
        return {
          title: "Analysis Details",
          subtitle: "Investment recommendation analysis",
          icon: <Minus className="w-6 h-6 text-white" />,
          bgColor: "bg-gray-500",
          borderColor: "border-gray-500",
          textColor: "text-gray-700",
          bgLight: "bg-gray-50"
        };
    }
  };

  const verdictDetails = getVerdictDetails(aiAnalysis.verdict);

  const getReasoningIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'negative':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getReasoningBg = (type: string) => {
    switch (type) {
      case 'positive':
        return "bg-green-50 border-green-200";
      case 'negative':
        return "bg-red-50 border-red-200";
      default:
        return "bg-yellow-50 border-yellow-200";
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${verdictDetails.bgColor}`}>
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-primary">{verdictDetails.title}</CardTitle>
            <p className="text-muted-foreground">{verdictDetails.subtitle}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Verdict Summary */}
        <div className={`border-l-4 rounded-lg p-6 ${verdictDetails.borderColor} ${verdictDetails.bgLight}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${verdictDetails.bgColor}`}>
                {verdictDetails.icon}
              </div>
              <div>
                <h4 className={`text-xl font-bold ${verdictDetails.textColor}`}>
                  {aiAnalysis.verdict} Recommendation
                </h4>
                <p className={`text-sm font-medium ${verdictDetails.textColor}`}>
                  Confidence Level: {aiAnalysis.confidence}%
                </p>
              </div>
            </div>
          </div>
          
          <div className={`prose max-w-none ${verdictDetails.textColor}`}>
            <p className="text-base leading-relaxed font-medium">
              {aiAnalysis.summary}
            </p>
          </div>
        </div>

        {/* Detailed Reasoning Points */}
        <div>
          <h5 className="font-semibold text-primary mb-4 text-lg">
            Detailed AI Analysis & Reasoning
          </h5>
          <div className="space-y-4">
            {aiAnalysis.reasoningPoints.map((point, index) => (
              <div key={index} className={`border rounded-lg p-5 ${getReasoningBg(point.type)}`}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getReasoningIcon(point.type)}
                  </div>
                  <div className="flex-1">
                    <h6 className="font-semibold text-foreground text-base mb-2">{point.title}</h6>
                    <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${
                      point.type === 'positive' ? 'bg-green-100 text-green-800' :
                      point.type === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {point.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Verdict Decision Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted/50 rounded-lg p-5">
            <h6 className="font-semibold text-primary mb-3">Key Supporting Factors</h6>
            <ul className="space-y-2">
              {aiAnalysis.reasoningPoints
                .filter(point => point.type === 'positive')
                .map((point, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">{point.title}</span>
                  </li>
                ))}
            </ul>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-5">
            <h6 className="font-semibold text-primary mb-3">Risk Considerations</h6>
            <ul className="space-y-2">
              {aiAnalysis.reasoningPoints
                .filter(point => point.type === 'negative' || point.type === 'neutral')
                .map((point, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    {point.type === 'negative' ? (
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    )}
                    <span className="text-muted-foreground">{point.title}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Final Investment Guidance */}
        <div className={`p-5 rounded-lg border-2 ${verdictDetails.borderColor} ${verdictDetails.bgLight}`}>
          <h6 className={`font-bold text-base mb-2 ${verdictDetails.textColor}`}>
            Final Investment Guidance
          </h6>
          <p className={`text-sm leading-relaxed ${verdictDetails.textColor}`}>
            {aiAnalysis.verdict === 'BUY' && 
              `Based on our comprehensive analysis, this stock shows strong potential for growth. Consider adding this to your portfolio, but ensure it fits your risk tolerance and investment timeline.`
            }
            {aiAnalysis.verdict === 'HOLD' && 
              `Our analysis suggests this stock is fairly valued with balanced opportunities and risks. If you currently own this stock, maintain your position and monitor key catalysts.`
            }
            {aiAnalysis.verdict === 'AVOID' && 
              `Our analysis indicates significant risks that outweigh potential rewards. Consider avoiding new positions or reducing existing exposure until conditions improve.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}