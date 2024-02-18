import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React from 'react';

type CustomActivityIndicatorProp = {
  customStyle?: StyleProp<ViewStyle>;
  size: 'small' | 'large';
  color: string;
};

const CustomActivityIndicator = (props: CustomActivityIndicatorProp) => {
  const {customStyle = {}, size = 'large', color} = props;

  return (
    <ActivityIndicator
      color={color}
      style={[styles.loader, customStyle]}
      size={size}
    />
  );
};

export default CustomActivityIndicator;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
