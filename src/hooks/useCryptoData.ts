import { useState, useEffect, useCallback } from 'react';
import { CryptoData } from '../types/crypto';
import { cryptoService } from '../services/cryptoService';

export const useCryptoData = (refreshInterval: number = 30000) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const data = await cryptoService.fetchCryptoPrices();
      setCryptoData(data);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch crypto prices');
      setLoading(false);
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return {
    cryptoData,
    loading,
    error,
    lastUpdated,
    refresh,
  };
};
