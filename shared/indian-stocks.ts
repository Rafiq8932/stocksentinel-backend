export interface IndianStock {
  symbol: string;
  companyName: string;
  sector: string;
  exchange: string;
  marketCap?: string;
}

export const indianStocks: IndianStock[] = [
  // Nifty 50 stocks and popular ones
  { symbol: 'RELIANCE', companyName: 'Reliance Industries Limited', sector: 'Oil & Gas', exchange: 'NSE' },
  { symbol: 'TCS', companyName: 'Tata Consultancy Services Limited', sector: 'Information Technology', exchange: 'NSE' },
  { symbol: 'HDFCBANK', companyName: 'HDFC Bank Limited', sector: 'Banking', exchange: 'NSE' },
  { symbol: 'INFY', companyName: 'Infosys Limited', sector: 'Information Technology', exchange: 'NSE' },
  { symbol: 'HINDUNILVR', companyName: 'Hindustan Unilever Limited', sector: 'FMCG', exchange: 'NSE' },
  { symbol: 'ICICIBANK', companyName: 'ICICI Bank Limited', sector: 'Banking', exchange: 'NSE' },
  { symbol: 'ITC', companyName: 'ITC Limited', sector: 'FMCG', exchange: 'NSE' },
  { symbol: 'SBIN', companyName: 'State Bank of India', sector: 'Banking', exchange: 'NSE' },
  { symbol: 'BHARTIARTL', companyName: 'Bharti Airtel Limited', sector: 'Telecommunications', exchange: 'NSE' },
  { symbol: 'KOTAKBANK', companyName: 'Kotak Mahindra Bank Limited', sector: 'Banking', exchange: 'NSE' },
  { symbol: 'LT', companyName: 'Larsen & Toubro Limited', sector: 'Construction', exchange: 'NSE' },
  { symbol: 'ASIANPAINT', companyName: 'Asian Paints Limited', sector: 'Paints', exchange: 'NSE' },
  { symbol: 'AXISBANK', companyName: 'Axis Bank Limited', sector: 'Banking', exchange: 'NSE' },
  { symbol: 'MARUTI', companyName: 'Maruti Suzuki India Limited', sector: 'Automobiles', exchange: 'NSE' },
  { symbol: 'SUNPHARMA', companyName: 'Sun Pharmaceutical Industries Limited', sector: 'Pharmaceuticals', exchange: 'NSE' },
  { symbol: 'ULTRACEMCO', companyName: 'UltraTech Cement Limited', sector: 'Cement', exchange: 'NSE' },
  { symbol: 'TITAN', companyName: 'Titan Company Limited', sector: 'Jewellery', exchange: 'NSE' },
  { symbol: 'WIPRO', companyName: 'Wipro Limited', sector: 'Information Technology', exchange: 'NSE' },
  { symbol: 'NESTLEIND', companyName: 'Nestle India Limited', sector: 'FMCG', exchange: 'NSE' },
  { symbol: 'POWERGRID', companyName: 'Power Grid Corporation of India Limited', sector: 'Power', exchange: 'NSE' },
  { symbol: 'NTPC', companyName: 'NTPC Limited', sector: 'Power', exchange: 'NSE' },
  { symbol: 'TECHM', companyName: 'Tech Mahindra Limited', sector: 'Information Technology', exchange: 'NSE' },
  { symbol: 'HCLTECH', companyName: 'HCL Technologies Limited', sector: 'Information Technology', exchange: 'NSE' },
  { symbol: 'BAJFINANCE', companyName: 'Bajaj Finance Limited', sector: 'Financial Services', exchange: 'NSE' },
  { symbol: 'COALINDIA', companyName: 'Coal India Limited', sector: 'Mining', exchange: 'NSE' },
  { symbol: 'TATAMOTORS', companyName: 'Tata Motors Limited', sector: 'Automobiles', exchange: 'NSE' },
  { symbol: 'TATASTEEL', companyName: 'Tata Steel Limited', sector: 'Steel', exchange: 'NSE' },
  { symbol: 'ADANIPORTS', companyName: 'Adani Ports and Special Economic Zone Limited', sector: 'Infrastructure', exchange: 'NSE' },
  { symbol: 'ONGC', companyName: 'Oil and Natural Gas Corporation Limited', sector: 'Oil & Gas', exchange: 'NSE' },
  { symbol: 'GRASIM', companyName: 'Grasim Industries Limited', sector: 'Cement', exchange: 'NSE' },
  { symbol: 'JSWSTEEL', companyName: 'JSW Steel Limited', sector: 'Steel', exchange: 'NSE' },
  { symbol: 'HEROMOTOCO', companyName: 'Hero MotoCorp Limited', sector: 'Automobiles', exchange: 'NSE' },
  { symbol: 'BAJAJFINSV', companyName: 'Bajaj Finserv Limited', sector: 'Financial Services', exchange: 'NSE' },
  { symbol: 'BPCL', companyName: 'Bharat Petroleum Corporation Limited', sector: 'Oil & Gas', exchange: 'NSE' },
  { symbol: 'EICHERMOT', companyName: 'Eicher Motors Limited', sector: 'Automobiles', exchange: 'NSE' },
  { symbol: 'BRITANNIA', companyName: 'Britannia Industries Limited', sector: 'FMCG', exchange: 'NSE' },
  { symbol: 'DRREDDY', companyName: 'Dr. Reddys Laboratories Limited', sector: 'Pharmaceuticals', exchange: 'NSE' },
  { symbol: 'CIPLA', companyName: 'Cipla Limited', sector: 'Pharmaceuticals', exchange: 'NSE' },
  { symbol: 'APOLLOHOSP', companyName: 'Apollo Hospitals Enterprise Limited', sector: 'Healthcare', exchange: 'NSE' },
  { symbol: 'DIVISLAB', companyName: 'Divis Laboratories Limited', sector: 'Pharmaceuticals', exchange: 'NSE' },
  { symbol: 'SHREECEM', companyName: 'Shree Cement Limited', sector: 'Cement', exchange: 'NSE' },
  { symbol: 'HINDALCO', companyName: 'Hindalco Industries Limited', sector: 'Metals', exchange: 'NSE' },
  { symbol: 'ADANIENT', companyName: 'Adani Enterprises Limited', sector: 'Conglomerate', exchange: 'NSE' },
  { symbol: 'TATACONSUM', companyName: 'Tata Consumer Products Limited', sector: 'FMCG', exchange: 'NSE' },
  { symbol: 'BAJAJ-AUTO', companyName: 'Bajaj Auto Limited', sector: 'Automobiles', exchange: 'NSE' },
  { symbol: 'M&M', companyName: 'Mahindra & Mahindra Limited', sector: 'Automobiles', exchange: 'NSE' },
  { symbol: 'INDUSINDBK', companyName: 'IndusInd Bank Limited', sector: 'Banking', exchange: 'NSE' },
  { symbol: 'VEDL', companyName: 'Vedanta Limited', sector: 'Metals', exchange: 'NSE' },
  { symbol: 'GODREJCP', companyName: 'Godrej Consumer Products Limited', sector: 'FMCG', exchange: 'NSE' },
  { symbol: 'DABUR', companyName: 'Dabur India Limited', sector: 'FMCG', exchange: 'NSE' },
  { symbol: 'MARICO', companyName: 'Marico Limited', sector: 'FMCG', exchange: 'NSE' },
  { symbol: 'PIDILITIND', companyName: 'Pidilite Industries Limited', sector: 'Chemicals', exchange: 'NSE' },
  { symbol: 'LUPIN', companyName: 'Lupin Limited', sector: 'Pharmaceuticals', exchange: 'NSE' },
  { symbol: 'BIOCON', companyName: 'Biocon Limited', sector: 'Pharmaceuticals', exchange: 'NSE' },
  { symbol: 'ZOMATO', companyName: 'Zomato Limited', sector: 'Food Delivery', exchange: 'NSE' },
  { symbol: 'NYKAA', companyName: 'Nykaa Fashion Limited', sector: 'E-commerce', exchange: 'NSE' },
  { symbol: 'PAYTM', companyName: 'One 97 Communications Limited', sector: 'Fintech', exchange: 'NSE' },
  // BSE stocks
  { symbol: 'SENSEX', companyName: 'BSE SENSEX', sector: 'Index', exchange: 'BSE' },
  { symbol: 'BANKEX', companyName: 'BSE Bank Index', sector: 'Banking Index', exchange: 'BSE' },
  // More popular stocks
  { symbol: 'AMBUJACEM', companyName: 'Ambuja Cements Limited', sector: 'Cement', exchange: 'NSE' },
  { symbol: 'ACC', companyName: 'ACC Limited', sector: 'Cement', exchange: 'NSE' },
  { symbol: 'MOTHERSON', companyName: 'Motherson Sumi Wiring India Limited', sector: 'Auto Components', exchange: 'NSE' },
  { symbol: 'CONCOR', companyName: 'Container Corporation of India Limited', sector: 'Logistics', exchange: 'NSE' },
  { symbol: 'SAIL', companyName: 'Steel Authority of India Limited', sector: 'Steel', exchange: 'NSE' },
  { symbol: 'NMDC', companyName: 'NMDC Limited', sector: 'Mining', exchange: 'NSE' },
  { symbol: 'RECLTD', companyName: 'REC Limited', sector: 'Financial Services', exchange: 'NSE' },
  { symbol: 'PFC', companyName: 'Power Finance Corporation Limited', sector: 'Financial Services', exchange: 'NSE' },
];

export function searchIndianStocks(query: string): IndianStock[] {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase();
  
  return indianStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm) ||
    stock.companyName.toLowerCase().includes(searchTerm) ||
    stock.sector.toLowerCase().includes(searchTerm)
  ).slice(0, 10); // Limit to 10 results
}