import {TouchableOpacity, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {Colors} from '../constants/Colors';
import {BottomSheetProps} from '../constants/types';
import usePortfolioData from '../hooks/usePortfolioData';
import {Strings} from '../constants/Strings';

// Bottom Sheet Component to show the brief portfolio data
const BottomSheet = (props: BottomSheetProps) => {
  const {currentValueTotal, totalInvestment, totalPNL, todaysPNL} =
    usePortfolioData(props.data);

  // Bottom Sheet expanded State UI
  const expandedView = () => {
    return (
      <>
        <View style={styles.itemContainer}>
          <View>
            <CustomText customStyle={styles.titleText}>
              {Strings.currentValue}
            </CustomText>
            <CustomText customStyle={styles.titleText}>
              {Strings.totalInvestment}
            </CustomText>
            <CustomText customStyle={styles.titleText}>
              {Strings.todaysPNL}
            </CustomText>
          </View>
          <View>
            <CustomText>{Strings.rupees(`${currentValueTotal}`)}</CustomText>
            <CustomText>{Strings.rupees(`${totalInvestment}`)}</CustomText>
            <CustomText>{Strings.rupees(`${todaysPNL}`)}</CustomText>
          </View>
        </View>
        {collapsedView()}
      </>
    );
  };

  // Bottom Sheet collapsed State UI
  const collapsedView = () => {
    return (
      <View style={styles.itemContainer}>
        <CustomText customStyle={styles.titleText}>
          {Strings.profitAndLoss}
        </CustomText>
        <CustomText customStyle={styles.textStyle}>
          {Strings.rupees(`${totalPNL}`)}
        </CustomText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.setBottomSheetState}>
        <CustomText customStyle={styles.iconStyle}>
          {props.expanded ? '▼' : '▲'}
        </CustomText>
      </TouchableOpacity>

      {props?.expanded ? expandedView() : collapsedView()}
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 10,
    borderTopColor: Colors.BLACK,
    borderWidth: 0.5,
  },
  textStyle: {
    color: Colors.BLACK,
  },
  itemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
  },
  titleText: {
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  iconStyle: {
    alignSelf: 'center',
    color: Colors.PURPLE,
    fontSize: 24,
  },
});
