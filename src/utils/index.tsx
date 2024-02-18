import {Strings} from '../constants/Strings';

export default class Utils {
  static readonly getStockProfit = (
    ltp: number,
    avgPrice: number,
    quantity: number,
  ) => {
    return (
      'P/L: ' +
      Strings.rupees(`${Utils.upToTwoDecimal((ltp - avgPrice) * quantity)}`)
    );
  };
  static readonly upToTwoDecimal = (data?: number) => {
    if (!data) {
      return 0;
    }
    return Math.round(data * 100) / 100;
  };
}
