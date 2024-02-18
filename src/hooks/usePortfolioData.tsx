import {useEffect, useState} from 'react';
import {HoldingItem} from '../constants/types';
import Utils from '../utils';

// Calculating the portfolio data here. it will refresh whenever data is changed.

const usePortfolioData = (data: Array<HoldingItem>) => {
  const [currentValueTotal, setCurrentValueTotal] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalPNL, setTotalPNL] = useState(0);
  const [todaysPNL, setTodaysPNL] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) {
      setCurrentValueTotal(0);
      setTotalInvestment(0);
      setTotalPNL(0);
      setTodaysPNL(0);
      return;
    }

    let currentTotal = 0;
    let investmentTotal = 0;
    let todayPNLTotal = 0;

    data.forEach(item => {
      const {ltp, avgPrice, close, quantity} = item;
      const currentValue = ltp * quantity;
      const investmentValue = avgPrice * quantity;
      const todayPNL = (close - ltp) * quantity;

      currentTotal += currentValue;
      investmentTotal += investmentValue;
      todayPNLTotal += todayPNL;
    });
    setCurrentValueTotal(Utils.upToTwoDecimal(currentTotal));
    setTotalInvestment(Utils.upToTwoDecimal(investmentTotal));
    setTotalPNL(Utils.upToTwoDecimal(currentTotal - investmentTotal));
    setTodaysPNL(Utils.upToTwoDecimal(todayPNLTotal));
  }, [data]);

  return {currentValueTotal, totalInvestment, totalPNL, todaysPNL};
};

export default usePortfolioData;
