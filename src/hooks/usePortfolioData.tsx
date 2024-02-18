import {useCallback, useEffect, useMemo, useState} from 'react';
import {HoldingItem} from '../constants';
import Utils from '../utils';

// Calculating the portfolio data here. it will refresh whenever data is changed.

const usePortfolioData = (data?: HoldingItem[]) => {
  const [currentValueTotal, setCurrentValueTotal] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalPNL, setTotalPNL] = useState(0);
  const [todaysPNL, setTodaysPNL] = useState(0);

  const updatePortfolioData = useCallback(
    (currentTotal: number, investmentTotal: number, todayPNLTotal: number) => {
      setCurrentValueTotal(Utils.upToTwoDecimal(currentTotal));
      setTotalInvestment(Utils.upToTwoDecimal(investmentTotal));
      setTotalPNL(Utils.upToTwoDecimal(currentTotal - investmentTotal));
      setTodaysPNL(Utils.upToTwoDecimal(todayPNLTotal));
    },
    [],
  );

  const parsePortfolioData = useCallback((holdings: HoldingItem[]) => {
    let currentTotal = 0;
    let investmentTotal = 0;
    let todayPNLTotal = 0;

    holdings.forEach(item => {
      const {ltp, avgPrice, close, quantity} = item;
      const currentValue = ltp * quantity;
      const investmentValue = avgPrice * quantity;
      const todayPNL = (close - ltp) * quantity;

      currentTotal += currentValue;
      investmentTotal += investmentValue;
      todayPNLTotal += todayPNL;
    });

    return {
      currentTotal,
      investmentTotal,
      todayPNLTotal,
    };
  }, []);

  useEffect(() => {
    const {currentTotal, investmentTotal, todayPNLTotal} = parsePortfolioData(
      data ?? [],
    );
    updatePortfolioData(currentTotal, investmentTotal, todayPNLTotal);
  }, [data, parsePortfolioData, updatePortfolioData]);

  return useMemo(() => {
    return {currentValueTotal, totalInvestment, totalPNL, todaysPNL};
  }, [currentValueTotal, todaysPNL, totalInvestment, totalPNL]);
};

export default usePortfolioData;
