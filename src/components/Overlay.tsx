import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@rneui/themed';

const Overlay = () => {
  const {theme} = useTheme();
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: theme.colors.lightShadeBlue
        backgroundColor: 'transparent',
      }}></View>
  );
};

export default Overlay;
