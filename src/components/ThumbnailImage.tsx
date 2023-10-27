import { View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { generateThumbnail } from '../utils/convert';
import useSWR from 'swr';

const ThumbnailImage = (
  { uri,
    height,
    width,
  } : {
    uri: any,
    height: number,
    width: number
  }) => {
  const { data, isLoading } = useSWR(uri, generateThumbnail);

  return (
    <View>
      {isLoading ? (
        <View
          style={{
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#FC5185" />
        </View>
      ) : (
        data && (
          <Image
            source={{ uri: data }}
            style={{ width: width, height: height, borderRadius: 10 }}
          />
        )
      )}
    </View>
  );
};

export default ThumbnailImage;
