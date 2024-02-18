import {Strings} from '../constants/Strings';

export default class Utils {
  static getStockProfit = (ltp: number, avgPrice: number, quantity: number) => {
    return (
      'P/L: ' +
      Strings.rupees(`${Utils.upToTwoDecimal((ltp - avgPrice) * quantity)}`)
    );
  };
  static upToTwoDecimal = (data: number) => {
    return Math.round(data * 100) / 100;
  };
}
