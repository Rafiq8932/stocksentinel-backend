import { useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (symbol: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  lastUpdated: string;
}

export default function SearchBar({ onSearch, onRefresh, isLoading, lastUpdated }: SearchBarProps) {
  const [symbol, setSymbol] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSearch(symbol.trim().toUpperCase());
    }
  };

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-white font-bold text-xl">StockScope</h1>
            <span className="text-secondary text-sm font-medium">AI-Powered</span>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter stock symbol (e.g., RELIANCE, TCS, INFY)"
                className="pl-10 bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:border-secondary focus:ring-secondary"
                disabled={isLoading}
              />
            </div>
          </form>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={isLoading}
              className="text-white hover:text-secondary hover:bg-primary/80"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <div className="text-sm text-gray-300">
              <span>{lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
