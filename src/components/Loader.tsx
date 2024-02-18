import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React from 'react';

type LoaderProp = {
  customStyle?: StyleProp<ViewStyle>;
  size: 'small' | 'large';
  color: string;
};

const Loader = (props: LoaderProp) => {
  const {customStyle = {}, size = 'large', color} = props;

  return (
    <ActivityIndicator
      color={color}
      style={[styles.loader, customStyle]}
      size={size}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
