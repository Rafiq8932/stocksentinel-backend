#!/usr/bin/env python3
import sys
import json
import yfinance as yf
import pandas as pd
import traceback

def format_number(value):
    """Format large numbers with K, M, B suffixes"""
    if pd.isna(value) or value == 0:
        return "N/A"
    
    if value >= 1e12:
        return f"{value/1e12:.1f}T"
    elif value >= 1e9:
        return f"{value/1e9:.1f}B"
    elif value >= 1e6:
        return f"{value/1e6:.1f}M"
    elif value >= 1e3:
        return f"{value/1e3:.1f}K"
    else:
        return str(int(value))

def get_stock_data(symbol):
    """Fetch comprehensive stock data using yfinance"""
    try:
        # Handle Indian stock symbols - add .NS for NSE or .BO for BSE if not already present
        formatted_symbol = format_indian_symbol(symbol)
        
        # Create ticker object
        ticker = yf.Ticker(formatted_symbol)
        
        # Get basic info
        info = ticker.info
        
        # Get current price data
        hist = ticker.history(period="2d")
        if hist.empty:
            raise ValueError(f"No price data available for {symbol}")
            
        current_price = hist['Close'].iloc[-1]
        prev_close = hist['Close'].iloc[-2] if len(hist) > 1 else current_price
        
        change_amount = current_price - prev_close
        change_percent = (change_amount / prev_close) * 100
        
        # Get company name
        company_name = info.get('longName', info.get('shortName', symbol))
        
        # Get volume (use average if current not available)
        volume = hist['Volume'].iloc[-1] if not pd.isna(hist['Volume'].iloc[-1]) else info.get('averageVolume', 0)
        
        # Get market cap
        market_cap = info.get('marketCap', 0)
        
        # Get 52-week high/low
        week_high_52 = info.get('fiftyTwoWeekHigh', current_price)
        week_low_52 = info.get('fiftyTwoWeekLow', current_price)
        
        # Get exchange
        exchange = info.get('exchange', 'UNKNOWN')
        
        # Prepare response - return original symbol format for display
        display_symbol = symbol.upper()
        if formatted_symbol.endswith('.NS'):
            display_symbol = symbol.upper()  # Keep original for Indian NSE stocks
        elif formatted_symbol.endswith('.BO'):
            display_symbol = symbol.upper()  # Keep original for Indian BSE stocks
            
        stock_data = {
            'symbol': display_symbol,
            'companyName': company_name,
            'currentPrice': round(float(current_price), 2),
            'changeAmount': round(float(change_amount), 2),
            'changePercent': round(float(change_percent), 2),
            'volume': format_number(volume),
            'marketCap': format_number(market_cap),
            'weekHigh52': round(float(week_high_52), 2),
            'weekLow52': round(float(week_low_52), 2),
            'exchange': exchange
        }
        
        return stock_data
        
    except Exception as e:
        raise Exception(f"Error fetching data for {symbol}: {str(e)}")

def format_indian_symbol(symbol):
    """Format Indian stock symbols for yfinance"""
    symbol = symbol.upper()
    
    # Indian market symbols mapping - common NSE stocks
    indian_stocks = {
        'RELIANCE': 'RELIANCE.NS',
        'TCS': 'TCS.NS', 
        'HDFCBANK': 'HDFCBANK.NS',
        'INFY': 'INFY.NS',
        'HINDUNILVR': 'HINDUNILVR.NS',
        'ICICIBANK': 'ICICIBANK.NS',
        'ITC': 'ITC.NS',
        'SBIN': 'SBIN.NS',
        'BHARTIARTL': 'BHARTIARTL.NS',
        'KOTAKBANK': 'KOTAKBANK.NS',
        'LT': 'LT.NS',
        'ASIANPAINT': 'ASIANPAINT.NS',
        'AXISBANK': 'AXISBANK.NS',
        'MARUTI': 'MARUTI.NS',
        'SUNPHARMA': 'SUNPHARMA.NS',
        'ULTRACEMCO': 'ULTRACEMCO.NS',
        'TITAN': 'TITAN.NS',
        'WIPRO': 'WIPRO.NS',
        'NESTLEIND': 'NESTLEIND.NS',
        'POWERGRID': 'POWERGRID.NS',
        'NTPC': 'NTPC.NS',
        'TECHM': 'TECHM.NS',
        'HCLTECH': 'HCLTECH.NS',
        'BAJFINANCE': 'BAJFINANCE.NS',
        'COALINDIA': 'COALINDIA.NS',
        'TATAMOTORS': 'TATAMOTORS.NS',
        'TATASTEEL': 'TATASTEEL.NS',
        'ADANIPORTS': 'ADANIPORTS.NS',
        'ONGC': 'ONGC.NS',
        'GRASIM': 'GRASIM.NS',
        'JSWSTEEL': 'JSWSTEEL.NS',
        'HEROMOTOCO': 'HEROMOTOCO.NS',
        'BAJAJFINSV': 'BAJAJFINSV.NS',
        'BPCL': 'BPCL.NS',
        'EICHERMOT': 'EICHERMOT.NS',
        'BRITANNIA': 'BRITANNIA.NS',
        'DRREDDY': 'DRREDDY.NS',
        'CIPLA': 'CIPLA.NS',
        'APOLLOHOSP': 'APOLLOHOSP.NS',
        'DIVISLAB': 'DIVISLAB.NS'
    }
    
    # Check if it's a known Indian stock
    if symbol in indian_stocks:
        return indian_stocks[symbol]
    
    # If symbol already has .NS or .BO suffix, return as is
    if symbol.endswith('.NS') or symbol.endswith('.BO'):
        return symbol
        
    # Check if it looks like an Indian symbol (common patterns)
    # Default to NSE (.NS) for Indian-looking symbols
    if (len(symbol) <= 12 and 
        not symbol.startswith(('NASDAQ:', 'NYSE:')) and
        not '.' in symbol and
        not symbol in ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA']):
        return f"{symbol}.NS"
    
    # For international stocks, return as is
    return symbol

def main():
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python stock_fetcher.py <SYMBOL>"}))
        sys.exit(1)
    
    symbol = sys.argv[1].upper()
    
    try:
        stock_data = get_stock_data(symbol)
        print(json.dumps(stock_data))
        
    except Exception as e:
        error_data = {
            "error": str(e),
            "traceback": traceback.format_exc()
        }
        print(json.dumps(error_data), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
