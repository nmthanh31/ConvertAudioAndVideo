import {View, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {generateThumbnail} from '../utils/convert';
import useSWR from 'swr';
import {useTheme} from '@rneui/themed';

const Thumbnail = ({uri}: any) => {
  const {theme} = useTheme();

  const {data, isLoading} = useSWR(uri, generateThumbnail);
  console.log(uri);
  
  return (
    <View>
      {isLoading ? (
        <View
          style={{
            width: 170,
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={theme.colors.pink} />
        </View>
      ) : (
        data && (
          <Image
            source={{uri: data}}
            style={{width: 170, height: 200, borderRadius: 25}}
          />
        )
      )}
    </View>
  );
};

export default Thumbnail;
