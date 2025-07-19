import { useState, useRef, useEffect } from "react";
import { Search, TrendingUp, Building2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { searchIndianStocks, type IndianStock } from "@shared/indian-stocks";

interface IndianStockSearchProps {
  onStockSelect: (symbol: string) => void;
  isLoading?: boolean;
}

export default function IndianStockSearch({ onStockSelect, isLoading = false }: IndianStockSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<IndianStock[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const results = searchIndianStocks(query);
      setSuggestions(results);
      setShowDropdown(true);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleStockSelect = (stock: IndianStock) => {
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    onStockSelect(stock.symbol);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleStockSelect(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleClickOutside = (e: Event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSectorBadgeColor = (sector: string): string => {
    const colorMap: { [key: string]: string } = {
      'Banking': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Information Technology': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'FMCG': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Oil & Gas': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Pharmaceuticals': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Automobiles': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Cement': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      'Steel': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
      'Power': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    };
    return colorMap[sector] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800 font-semibold">{part}</span> : 
        part
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Indian stocks by name or symbol (e.g., Reliance, TCS, HDFC)"
          className="pl-10 pr-4 py-6 text-lg bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl shadow-sm"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-xl overflow-hidden">
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm text-muted-foreground font-medium">
                {suggestions.length} stock{suggestions.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            {suggestions.map((stock, index) => (
              <div
                key={`${stock.symbol}-${stock.exchange}`}
                onClick={() => handleStockSelect(stock)}
                className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                  index === highlightedIndex ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-900'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Stock Symbol & Company Name */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          {highlightMatch(stock.symbol, query)}
                        </span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getSectorBadgeColor(stock.sector)}`}
                      >
                        {stock.sector}
                      </Badge>
                    </div>
                    
                    {/* Company Name */}
                    <div className="flex items-start gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {highlightMatch(stock.companyName, query)}
                      </p>
                    </div>
                    
                    {/* Exchange */}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {stock.exchange}
                      </span>
                    </div>
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="flex items-center ml-4">
                    <div className="text-gray-400 text-sm">→</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}