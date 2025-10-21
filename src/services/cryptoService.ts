import axios from 'axios';
import { CryptoData } from '../types/crypto';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// CoinGecko IDs for our cryptos
const CRYPTO_IDS = {
  bitcoin: 'bitcoin',
  ethereum: 'ethereum',
  solana: 'solana',
  hyperliquid: 'hyperliquid', // Note: Hyperliquid might not be on CoinGecko
};

export const cryptoService = {
  /**
   * Fetch real-time crypto prices from CoinGecko API
   */
  async fetchCryptoPrices(): Promise<CryptoData[]> {
    try {
      const ids = Object.values(CRYPTO_IDS).join(',');
      const response = await axios.get(
        `${COINGECKO_API}/coins/markets`,
        {
          params: {
            vs_currency: 'usd',
            ids: ids,
            order: 'market_cap_desc',
            sparkline: true,
            price_change_percentage: '24h',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching crypto prices:', error);

      // Return mock data if API fails (for development/demo purposes)
      return this.getMockData();
    }
  },

  /**
   * Mock data for development and fallback
   */
  getMockData(): CryptoData[] {
    return [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        current_price: 67234.56,
        price_change_percentage_24h: 2.34,
        market_cap: 1316789234567,
        total_volume: 28934567890,
        high_24h: 68123.45,
        low_24h: 66543.21,
        sparkline_in_7d: {
          price: Array.from({ length: 24 }, (_, i) =>
            65000 + Math.random() * 5000 + Math.sin(i / 3) * 2000
          ),
        },
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        current_price: 3456.78,
        price_change_percentage_24h: -1.23,
        market_cap: 415678901234,
        total_volume: 15678901234,
        high_24h: 3512.34,
        low_24h: 3423.45,
        sparkline_in_7d: {
          price: Array.from({ length: 24 }, (_, i) =>
            3400 + Math.random() * 200 + Math.sin(i / 3) * 100
          ),
        },
      },
      {
        id: 'solana',
        symbol: 'sol',
        name: 'Solana',
        current_price: 142.89,
        price_change_percentage_24h: 5.67,
        market_cap: 63456789012,
        total_volume: 2345678901,
        high_24h: 145.23,
        low_24h: 138.45,
        sparkline_in_7d: {
          price: Array.from({ length: 24 }, (_, i) =>
            135 + Math.random() * 15 + Math.sin(i / 3) * 8
          ),
        },
      },
      {
        id: 'hyperliquid',
        symbol: 'hype',
        name: 'Hyperliquid',
        current_price: 12.45,
        price_change_percentage_24h: 8.91,
        market_cap: 1234567890,
        total_volume: 123456789,
        high_24h: 12.89,
        low_24h: 11.23,
        sparkline_in_7d: {
          price: Array.from({ length: 24 }, (_, i) =>
            11 + Math.random() * 2 + Math.sin(i / 3) * 1
          ),
        },
      },
    ];
  },

  /**
   * Format large numbers with K, M, B suffixes
   */
  formatNumber(num: number): string {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  },

  /**
   * Format price with appropriate decimal places
   */
  formatPrice(price: number): string {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  },
};
