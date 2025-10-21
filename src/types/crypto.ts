export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface CryptoCardProps {
  crypto: CryptoData;
  index: number;
}

export type SupportedCrypto = 'bitcoin' | 'ethereum' | 'solana' | 'hyperliquid';
