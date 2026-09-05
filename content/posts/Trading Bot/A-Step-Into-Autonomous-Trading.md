---
title: A Step Into Autonomous Trading
date: 2026-09-04T07:55:05.131Z
excerpt: Just added an extension to my stocks tracker project...
featuredImage: ''
---

I have updated my stocks tracker project at [https://github.com/muzamono/stocks-tracker](https://github.com/muzamono/stocks-tracker) to include live-time quote request using Moomoo API. 

The end goal? Autonomous trading or in the simplest term: trading bot.

Why? Since my portfolio is mainly consisted of US companies' security, the time difference is detrimental in keeping tabs of the moving markets. (And because I want to feel how to make money while sleeping ;) )

I have added etl-live/, signals/ and backtest/ into the repo for this update.

* etl-live: Contains the etl pipeline for the live tick through moomoo API. This is separate from the batch pipeline that pulls historical data from AlphaVantage API (Though moomoo API also provides historical data, maybe I will change this in the future)
* signals: Technical indicator library, shared by live pipeline and backtesting. The codes in this directory do the calculation for each of the indicator. Currently the signals consisted of 5 indicators: Simple Moving Average (SMA), Relative Strength Index (RSI), Bollinger Bands, Moving Average Convergence Divergence (MACD) and Volume (Relative Volume + Volume Trend)
* backtest: For testing the trading bot based on historical data. Contains scoring.py which normalizes the signals and combines into a weighted score as well as engine.py which simulates buy/hold/sell strategy based on the score and compares with buy-and-hold as a benchmark

The aim is to have the etl-live running live during trading days and update the price on an interval, which then get calculated by the “signals” codes and given a weighted score, which then fires “buy/hold/sell”, without any input from me.

I will need to decide the right interval of the price update since too many will make it a day trading (which is not my cup of tea) and too little make it not really worth to have a live quote request.

In the next post, I will talk about the testing of the algorithm and its finding.
