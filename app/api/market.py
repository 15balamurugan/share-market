from typing import Dict, Optional, List, Any
from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from fastapi.responses import JSONResponse
from services.market import stock_api,logger
import yfinance as yf
import asyncio
import pandas as pd
import logging
import numpy as np
from pydantic import BaseModel
# Add these imports at the top of your file
# import pandas as pd
# import numpy as np
# import talib
# from typing import Dict, List, Any

# # Add this function to calculate indicators
# # Update your calculate_technical_indicators function
# def calculate_technical_indicators(data: List[Dict]) -> List[Dict]:
#     """Calculate various technical indicators for the stock data"""
#     if not data:
#         return data
    
#     # Extract the history data which contains the OHLCV values
#     history_data = []
#     for item in data:
#         if 'history' in item and isinstance(item['history'], dict):
#             history_data.append(item['history'])
#         else:
#             # If history is not in the expected format, skip this item
#             continue
    
#     if not history_data:
#         return data
    
#     # Convert to DataFrame
#     df = pd.DataFrame(history_data)
    
#     # Ensure we have datetime index
#     if 'date' in df.columns:
#         df['date'] = pd.to_datetime(df['date'])
#         df.set_index('date', inplace=True)
    
#     # Make sure we have the required columns
#     required_cols = ['open', 'high', 'low', 'close', 'volume']
#     for col in required_cols:
#         if col not in df.columns:
#             # If we don't have the required data, return original data
#             return data
    
#     # Calculate indicators
#     closes = df['close'].values
#     highs = df['high'].values
#     lows = df['low'].values
#     volumes = df['volume'].values
    
#     # Simple Moving Averages
#     df['sma_20'] = talib.SMA(closes, timeperiod=20)
#     df['sma_50'] = talib.SMA(closes, timeperiod=50)
    
#     # Exponential Moving Averages
#     df['ema_12'] = talib.EMA(closes, timeperiod=12)
#     df['ema_26'] = talib.EMA(closes, timeperiod=26)
    
#     # MACD
#     macd, macd_signal, macd_hist = talib.MACD(closes, fastperiod=12, slowperiod=26, signalperiod=9)
#     df['macd'] = macd
#     df['macd_signal'] = macd_signal
#     df['macd_hist'] = macd_hist
    
#     # RSI
#     df['rsi'] = talib.RSI(closes, timeperiod=14)
    
#     # Bollinger Bands
#     upper_bb, middle_bb, lower_bb = talib.BBANDS(closes, timeperiod=20, nbdevup=2, nbdevdn=2, matype=0)
#     df['bb_upper'] = upper_bb
#     df['bb_middle'] = middle_bb
#     df['bb_lower'] = lower_bb
    
#     # Stochastic Oscillator
#     slowk, slowd = talib.STOCH(highs, lows, closes, fastk_period=14, slowk_period=3, slowk_matype=0, slowd_period=3, slowd_matype=0)
#     df['stoch_k'] = slowk
#     df['stoch_d'] = slowd
    
#     # Volume indicators
#     df['volume_sma'] = talib.SMA(volumes, timeperiod=20)
    
#     # Generate signals
#     df['signal'] = 0  # 0 = hold, 1 = buy, -1 = sell
    
#     # Buy signal: Price crosses above SMA20 and RSI > 50
#     df.loc[(df['close'] > df['sma_20']) & (df['close'].shift(1) <= df['sma_20'].shift(1)) & (df['rsi'] > 50), 'signal'] = 1
    
#     # Sell signal: Price crosses below SMA20 and RSI < 50
#     df.loc[(df['close'] < df['sma_20']) & (df['close'].shift(1) >= df['sma_20'].shift(1)) & (df['rsi'] < 50), 'signal'] = -1
    
#     # Strong buy: MACD crosses above signal line
#     df.loc[(df['macd'] > df['macd_signal']) & (df['macd'].shift(1) <= df['macd_signal'].shift(1)), 'signal'] = 2
    
#     # Strong sell: MACD crosses below signal line
#     df.loc[(df['macd'] < df['macd_signal']) & (df['macd'].shift(1) >= df['macd_signal'].shift(1)), 'signal'] = -2
    
#     # Reset index for JSON serialization
#     df.reset_index(inplace=True)
    
#     # Merge the indicator data back into the original data structure
#     result = data.copy()
#     for i, item in enumerate(result):
#         if i < len(df):
#             # Add all indicator columns to the history dict
#             if 'history' in item and isinstance(item['history'], dict):
#                 for col in ['sma_20', 'sma_50', 'ema_12', 'ema_26', 'macd', 'macd_signal', 
#                            'macd_hist', 'rsi', 'bb_upper', 'bb_middle', 'bb_lower', 
#                            'stoch_k', 'stoch_d', 'volume_sma', 'signal']:
#                     if col in df.columns:
#                         item['history'][col] = df.iloc[i][col]
    
#     return result

# Alternative approach if the above doesn't work - modify the stock_api.fetch_stock_data method
# Or create a new endpoint specifically for indicators

router = APIRouter(prefix="/api", tags=["market"])


@router.get("/stock")
async def root():
    return {"message": "Stock Data API is running", "status": "healthy"}

# Update your get_stock_data endpoint
# @router.get("/stock/{symbol}")
# async def get_stock_data(
#     symbol: str, 
#     period: str = "1d", 
#     interval: str = "1d",
#     indicators: str = Query("all", description="Comma-separated list of indicators to calculate")):
#     """Get data for a single stock with technical indicators"""
#     try:
#         symbol = symbol.upper()
#         data = await stock_api.fetch_stock_data(symbol, period, interval)
#         if not data:
#             raise HTTPException(status_code=404, detail=f"Stock {symbol} not found or data unavailable")
        
#         # Convert to DataFrame for indicator calculation
#         df = pd.DataFrame(data)
#         print(df.head())
#         # Calculate technical indicators
#         df_with_indicators = calculate_technical_indicators(df)
        
#         # Convert back to dictionary
#         result = df_with_indicators.to_dict('records')
        
#         # Add current price and other metadata
#         if len(result) > 0:
#             latest_data = result[-1]
#             return {
#                 "history": result,
#                 "current_price": latest_data.get('close', 0),
#                 "symbol": symbol,
#                 "indicators": ["sma_20", "sma_50", "ema_12", "ema_26", "macd", "rsi", "bb_upper", "bb_lower", "stoch_k", "stoch_d"],
#                 "signals": latest_data.get('signal', 0)
#             }
        
#         return JSONResponse(content={"history": result, "symbol": symbol})
        
#     except Exception as e:
#         logger.error(f"Error in get_stock_data: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/stock/{symbol}")
async def get_stock_data(
    symbol: str, 
    period: str = "1d", 
    interval: str = "1d"
):
    """Get data for a single stock"""
    try:
        symbol = symbol.upper()
        data = await stock_api.fetch_stock_data(symbol, period, interval)
        if not data:
            raise HTTPException(status_code=404, detail=f"Stock {symbol} not found or data unavailable")
        return JSONResponse(content=data)
    except Exception as e:
        logger.error(f"Error in get_stock_data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/search")
async def search_stocks(query: str):
    """Search stocks by symbol or name"""
    try:
        results = stock_api.search_stocks(query)
        return JSONResponse(content=results)
    except Exception as e:
        logger.error(f"Error in search_stocks: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/valid-intervals/{period}")
async def get_valid_intervals(period: str):
    """Get valid intervals for a given period"""
    try:
        valid_intervals = stock_api.get_valid_intervals(period)
        return JSONResponse(content={"period": period, "valid_intervals": valid_intervals})
    except Exception as e:
        logger.error(f"Error in get_valid_intervals: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/categories")
async def get_categories():
    """Get all available stock categories"""
    try:
        categories = stock_api.get_all_categories()
        return JSONResponse(content=list(categories.keys()))
    except Exception as e:
        logger.error(f"Error in get_categories: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/historical/{symbol}")
async def get_historical_data(symbol: str, period: str = "1mo", interval: str = "1d"):
    """
    Get historical market data for a symbol.
    """
    try:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period=period, interval=interval)

        if hist.empty:
            raise HTTPException(status_code=404, detail="No data found for this request")
        hist.reset_index(inplace=True)
        hist.rename(columns={
            "Date": "datetime",
            "Open": "open",
            "High": "high",
            "Low": "low",
            "Close": "close",
            "Volume": "volume"
        }, inplace=True)

        data = hist[["datetime", "open", "high", "low", "close", "volume"]]
        data["datetime"] = data["datetime"].dt.strftime('%Y-%m-%d %H:%M:%S')
        return data.to_dict(orient="records")
    except Exception as e:
        logger.error(f"Error in get_historical_data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    # Add to your FastAPI backend
