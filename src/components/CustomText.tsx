import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {Colors} from '../constants/Colors';

type CustomTextProp = {
  children: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
};

const CustomText = (props: CustomTextProp) => {
  return (
    <Text style={[styles.textStyle, props.customStyle]}>{props.children}</Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    color: Colors.BLACK,
  },
});
