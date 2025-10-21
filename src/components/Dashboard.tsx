import React from 'react';
import { RefreshCw, Activity, TrendingUp } from 'lucide-react';
import { useCryptoData } from '../hooks/useCryptoData';
import CryptoCard from './CryptoCard';

const Dashboard: React.FC = () => {
  const { cryptoData, loading, error, lastUpdated, refresh } = useCryptoData(30000);

  const formatLastUpdated = (date: Date | null) => {
    if (!date) return 'Never';
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-crypto-darker via-crypto-dark to-crypto-darker">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-crypto-darker/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600
                            flex items-center justify-center">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  Crypto Tracker
                </h1>
                <p className="text-sm text-gray-400">Real-time cryptocurrency prices</p>
              </div>
            </div>

            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-crypto-accent hover:bg-blue-600
                       text-white rounded-lg transition-colors duration-200 disabled:opacity-50
                       disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Live Data</span>
              </div>
              <div className="text-gray-400">
                Last updated: {formatLastUpdated(lastUpdated)}
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span>{cryptoData.length} cryptocurrencies tracked</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {loading && cryptoData.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-80 bg-crypto-card rounded-2xl animate-pulse border border-white/10"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Crypto Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {cryptoData.map((crypto, index) => (
                <CryptoCard key={crypto.id} crypto={crypto} index={index} />
              ))}
            </div>

            {/* Footer Info */}
            <div className="mt-12 p-6 bg-crypto-card/50 rounded-xl border border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600
                                flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Real-time Market Data</p>
                    <p className="text-sm text-gray-400">Updates every 30 seconds</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-gray-400 text-sm">
                    Powered by CoinGecko API
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Data may be delayed by a few seconds
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
