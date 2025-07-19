import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { TimelineAnalysis as TimelineAnalysisType } from "@/lib/types";

interface TimelineAnalysisProps {
  timeline: TimelineAnalysisType;
}

export default function TimelineAnalysis({ timeline }: TimelineAnalysisProps) {
  const getOutlookColor = (outlook: string) => {
    switch (outlook.toUpperCase()) {
      case 'BULLISH':
        return 'bg-green-600 text-white';
      case 'POSITIVE':
        return 'bg-green-500 text-white';
      case 'OPTIMISTIC':
        return 'bg-green-400 text-white';
      case 'NEUTRAL':
        return 'bg-gray-500 text-white';
      case 'STABLE':
        return 'bg-blue-500 text-white';
      case 'CAUTIOUS':
        return 'bg-yellow-600 text-white';
      case 'BEARISH':
        return 'bg-red-600 text-white';
      case 'NEGATIVE':
        return 'bg-red-500 text-white';
      case 'UNCERTAIN':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getBorderColor = (outlook: string) => {
    switch (outlook.toUpperCase()) {
      case 'BULLISH':
      case 'POSITIVE':
      case 'OPTIMISTIC':
        return 'border-green-200 bg-green-50';
      case 'NEUTRAL':
      case 'STABLE':
        return 'border-blue-200 bg-blue-50';
      case 'CAUTIOUS':
        return 'border-yellow-200 bg-yellow-50';
      case 'BEARISH':
      case 'NEGATIVE':
      case 'UNCERTAIN':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getTextColor = (outlook: string) => {
    switch (outlook.toUpperCase()) {
      case 'BULLISH':
      case 'POSITIVE':
      case 'OPTIMISTIC':
        return 'text-green-800';
      case 'NEUTRAL':
      case 'STABLE':
        return 'text-blue-800';
      case 'CAUTIOUS':
        return 'text-yellow-800';
      case 'BEARISH':
      case 'NEGATIVE':
      case 'UNCERTAIN':
        return 'text-red-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-primary">Investment Timeline</CardTitle>
            <p className="text-muted-foreground">Recommended holding periods</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-6">
          <div className={`border rounded-lg p-4 ${getBorderColor(timeline.shortTerm.outlook)}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className={`font-semibold ${getTextColor(timeline.shortTerm.outlook)}`}>
                Short-term (1-6 months)
              </h4>
              <Badge className={getOutlookColor(timeline.shortTerm.outlook)}>
                {timeline.shortTerm.outlook}
              </Badge>
            </div>
            <p className={`text-sm ${getTextColor(timeline.shortTerm.outlook)}`}>
              {timeline.shortTerm.sentiment} {timeline.shortTerm.description}
            </p>
          </div>

          <div className={`border rounded-lg p-4 ${getBorderColor(timeline.mediumTerm.outlook)}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className={`font-semibold ${getTextColor(timeline.mediumTerm.outlook)}`}>
                Medium-term (6-18 months)
              </h4>
              <Badge className={getOutlookColor(timeline.mediumTerm.outlook)}>
                {timeline.mediumTerm.outlook}
              </Badge>
            </div>
            <p className={`text-sm ${getTextColor(timeline.mediumTerm.outlook)}`}>
              {timeline.mediumTerm.sentiment} {timeline.mediumTerm.description}
            </p>
          </div>

          <div className={`border rounded-lg p-4 ${getBorderColor(timeline.longTerm.outlook)}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className={`font-semibold ${getTextColor(timeline.longTerm.outlook)}`}>
                Long-term (2+ years)
              </h4>
              <Badge className={getOutlookColor(timeline.longTerm.outlook)}>
                {timeline.longTerm.outlook}
              </Badge>
            </div>
            <p className={`text-sm ${getTextColor(timeline.longTerm.outlook)}`}>
              {timeline.longTerm.sentiment} {timeline.longTerm.description}
            </p>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <h5 className="font-medium text-foreground mb-2">Key Catalysts to Watch</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            {timeline.catalysts.map((catalyst, index) => (
              <li key={index}>• {catalyst}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
