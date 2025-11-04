import { useEffect, useState, useRef } from "react";
import "./StockTicker.css";

class MemoryCache {
  constructor(ttl = 5000) {
    this.cache = new Map();
    this.ttl = ttl;
    this.stats = { hits: 0, misses: 0 };
  }

  set(key, value) {
    this.cache.set(key, { value, timeStamp: Date.now() });
    console.log("cache set", key);
  }

  get(key) {
    const item = this.cache.get(key)

    if(!item) {
      console.log(`cache miss ${key}`)
      return null;
    }

    if( Date.now() - item.timeStamp > item.ttl) {
      this.cache.delete(key);
      this.stats.misses++;

      console.log(`cache expired: ${key}`)

      return null;
    }

    this.stats.hits++;
    console.log(`Cache expired: ${key}`)
    return item.value;
  }

  getStats() {}
}

class StockService {
  constructor() {
    this.cache = new MemoryCache(3000);
  }

  async fetchStocks(symbol) {
    const cacheKey = `stock_${symbol}`;

    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    console.log(`API call for ${symbol}`);

    const stockData = {
      symbol,
      price: +(Math.random() * 200 + 50).toFixed(2),
      change: +((Math.random() - 0.5) * 10).toFixed(2),
      timeStamp: Date.now(),
    };

    this.cache.set(cacheKey, stockData);

    return {...stockData};
  }

  getCacheStats() {
    return this.cache.getStats();
  }
}

const StockTicker = () => {
  const STOCK_SYMBOLS = ["AAPL", "GOOGL", "MSFT", "AMZN"];

  const [stocks, setStocks] = useState([]);

  const stockService = useRef(new StockService());

  const fetchStocks = async () => {
    const stockPromises = STOCK_SYMBOLS.map((symbol) => {
      return stockService.current.fetchStocks(symbol);
    });

    const stockData = await Promise.all(stockPromises);

    //simulate network delay
    // await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 2000);
    // });

    setStocks(stockData);
  };

  useEffect(() => {
    const updateInterval = setInterval(() => {
      fetchStocks();
    }, 2000);

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <div className="stock-ticker">
      Basic Stock Ticker
      {stocks.map((stock, key) => (
        <div key={key} className="container">
          <p className="stock-name">{stock.symbol}</p>

          <div className="right-section">
            <p className="price">{stock.price}</p>

            <p className="change">{stock.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockTicker;
