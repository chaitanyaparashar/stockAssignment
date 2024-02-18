import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';
import CustomText from './CustomText';

type HeaderProps = {
  title: string;
  customStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<ViewStyle>;
};

const Header = (props: HeaderProps) => {
  const {title = '', customStyle = {}, customTextStyle = {}} = props;
  return (
    <View style={[styles.container, customStyle]}>
      <CustomText customStyle={[styles.textStyle, customTextStyle]}>
        {title}
      </CustomText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.PURPLE,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textStyle: {
    color: Colors.WHITE,
  },
});
