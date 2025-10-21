import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { CryptoCardProps } from '../types/crypto';
import { cryptoService } from '../services/cryptoService';
import PriceChart from './PriceChart';

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, index }) => {
  const isPositive = crypto.price_change_percentage_24h >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const bgGradient = isPositive
    ? 'from-green-500/10 to-transparent'
    : 'from-red-500/10 to-transparent';

  const getCryptoIcon = (symbol: string) => {
    const icons: { [key: string]: string } = {
      btc: '₿',
      eth: 'Ξ',
      sol: '◎',
      hype: '⚡',
    };
    return icons[symbol.toLowerCase()] || '●';
  };

  return (
    <div
      className="relative bg-gradient-to-br from-crypto-card to-crypto-darker rounded-2xl p-6
                 border border-white/10 hover:border-white/20 transition-all duration-300
                 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-crypto-accent/20
                 card-shimmer animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${bgGradient}
                         flex items-center justify-center text-2xl font-bold border border-white/10`}>
            {getCryptoIcon(crypto.symbol)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{crypto.name}</h3>
            <p className="text-sm text-gray-400 uppercase">{crypto.symbol}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${changeColor}`}>
          {isPositive ? (
            <TrendingUp className="w-5 h-5" />
          ) : (
            <TrendingDown className="w-5 h-5" />
          )}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-white mb-2">
          {cryptoService.formatPrice(crypto.current_price)}
        </div>
        <div className={`flex items-center space-x-2 ${changeColor} text-sm font-semibold`}>
          <span>{isPositive ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%</span>
          <span className="text-gray-500">24h</span>
        </div>
      </div>

      {/* Mini Chart */}
      {crypto.sparkline_in_7d?.price && (
        <div className="mb-4 -mx-2">
          <PriceChart
            data={crypto.sparkline_in_7d.price.slice(-24)}
            isPositive={isPositive}
          />
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div>
          <p className="text-xs text-gray-400 mb-1">Market Cap</p>
          <p className="text-sm font-semibold text-white">
            {cryptoService.formatNumber(crypto.market_cap)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Volume 24h</p>
          <p className="text-sm font-semibold text-white">
            {cryptoService.formatNumber(crypto.total_volume)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">High 24h</p>
          <p className="text-sm font-semibold text-green-400">
            {cryptoService.formatPrice(crypto.high_24h)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Low 24h</p>
          <p className="text-sm font-semibold text-red-400">
            {cryptoService.formatPrice(crypto.low_24h)}
          </p>
        </div>
      </div>

      {/* Pulse indicator for live data */}
      <div className="absolute top-4 right-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
          <div className="relative w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
