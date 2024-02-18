import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import useRequestHook from '../hooks/useRequestHook';
import {URLS} from '../services/Urls';
import CustomActivityIndicator from '../components/Loader';
import {Colors} from '../constants/Colors';
import Header from '../components/Header';
import {Strings} from '../constants/Strings';
import CustomText from '../components/CustomText';
import Utils from '../utils';
import BottomSheet from '../components/BottomSheet';
import {HoldingItem} from '../constants/types';

const HomeScreen = () => {
  const [data, isLoading = false, error] = useRequestHook(URLS.GET_STOCKS_LIST);
  const {userHolding = []}: {userHolding: Array<HoldingItem>} = data ?? {};
  const [isExpanded, setExpanded] = useState(false);

  // Holding list Item UI
  const renderItem = ({item}: {item: HoldingItem}) => {
    return (
      <View style={styles.parentRowStyle}>
        <View>
          <CustomText customStyle={styles.symbolText}>{item.symbol}</CustomText>
          <CustomText customStyle={styles.itemSubText}>
            {item.quantity}
          </CustomText>
        </View>
        <View>
          <CustomText>LTP: {Strings.rupees(`${item.ltp}`)}</CustomText>
          <CustomText customStyle={styles.itemSubText}>
            {Utils.getStockProfit(item.ltp, item.avgPrice, item.quantity)}
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
    setExpanded(!isExpanded);
  };

  if (isLoading) {
    return <CustomActivityIndicator color={Colors.BLACK} size="large" />;
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
