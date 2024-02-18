import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useRequestHook} from '../hooks';
import {URLS} from '../services/Urls';
import {Loader, Header, CustomText, BottomSheet} from '../components';
import {Colors, Strings, HoldingItem} from '../constants';
import Utils from '../utils';

type UserHoldingData = {
  userHolding: HoldingItem[];
};

const HomeScreen = () => {
  const [data, isLoading = false, error] = useRequestHook<UserHoldingData>(
    'GET',
    URLS.GET_STOCKS_LIST,
  );
  const {userHolding = []}: {userHolding: Array<HoldingItem>} =
    (data as UserHoldingData) ?? {};
  const [isExpanded, setIsExpanded] = useState(false);

  // Holding list Item UI
  const renderItem = ({item}: {item: HoldingItem}) => {
    const {symbol, ltp, avgPrice, quantity} = item;
    return (
      <View style={styles.parentRowStyle}>
        <View>
          <CustomText customStyle={styles.symbolText}>{symbol}</CustomText>
          <CustomText customStyle={styles.itemSubText}>{quantity}</CustomText>
        </View>
        <View>
          <CustomText>LTP: {Strings.rupees(`${ltp}`)}</CustomText>
          <CustomText customStyle={styles.itemSubText}>
            {Utils.getStockProfit(ltp, avgPrice, quantity)}
          </CustomText>
        </View>
      </View>
    );
  };

  const separator = () => {
    return <View style={styles.separatorStyle} />;
  };

  const emptyComponent = () => {
    return <CustomText>{Strings.noDataFound}</CustomText>;
  };

  const toggleBottomSheetState = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return <Loader color={Colors.BLACK} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Header title={Strings.headerTitle} />
      {error ? (
        <CustomText>{Strings.somethingWentWrong}</CustomText>
      ) : (
        <>
          <FlatList
            ListEmptyComponent={emptyComponent}
            data={userHolding}
            ItemSeparatorComponent={separator}
            renderItem={renderItem}
          />
          {
            <BottomSheet
              setBottomSheetState={toggleBottomSheetState}
              data={userHolding}
              expanded={isExpanded}
            />
          }
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  parentRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  symbolText: {
    fontWeight: 'bold',
  },
  separatorStyle: {
    height: 0.4,
    width: '90%',
    backgroundColor: Colors.BLACK,
    alignSelf: 'center',
  },
  itemSubText: {
    paddingTop: 4,
  },
});
