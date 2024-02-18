export type HoldingItem = {
  avgPrice: number;
  close: number;
  ltp: number;
  quantity: number;
  symbol: string;
};

export type BottomSheetProps = {
  expanded: boolean;
  data: Array<HoldingItem>;
  setBottomSheetState: Function;
};
