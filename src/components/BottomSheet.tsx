import React, {useCallback, useMemo} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import CustomText from './CustomText';
import {Colors, BottomSheetProps, Strings} from '../constants';
import {usePortfolioData} from '../hooks';

// Bottom Sheet Component to show the brief portfolio data
const BottomSheet = (props: BottomSheetProps) => {
  const {currentValueTotal, totalInvestment, totalPNL, todaysPNL} =
    usePortfolioData(props.data);
  const styles = useCreateStyle();

  // Bottom Sheet collapsed State UI
  const collapsedView = useCallback(() => {
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
  }, [styles.itemContainer, styles.textStyle, styles.titleText, totalPNL]);

  // Bottom Sheet expanded State UI
  const expandedView = useCallback(() => {
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
  }, [
    collapsedView,
    currentValueTotal,
    styles.itemContainer,
    styles.titleText,
    todaysPNL,
    totalInvestment,
  ]);

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

const useCreateStyle = () => {
  return useMemo(() => {
    return StyleSheet.create({
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
  }, []);
};
