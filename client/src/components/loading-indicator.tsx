import { Card, CardContent } from "@/components/ui/card";

export default function LoadingIndicator() {
  return (
    <Card className="mb-8">
      <CardContent className="pt-8 pb-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary rounded-full animate-spin" style={{ animationDelay: '0.1s' }}></div>
          </div>
          <div className="space-y-2">
            <p className="text-foreground font-medium text-lg">Analyzing stock data with AI...</p>
            <p className="text-muted-foreground text-sm">Fetching real-time market data and generating insights</p>
          </div>
          <div className="flex space-x-1 mt-4">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
