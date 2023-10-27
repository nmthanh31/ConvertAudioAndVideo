import {View, ImageBackground, Image} from 'react-native';
import React from 'react';
import useSWR from 'swr';
import {makeStyles} from '@rneui/themed';
import {generateThumbnail} from '../../utils/convert';

const Thumbnail = ({uri}: any) => {
  const styles = useStyles();

  const {data, isLoading} = useSWR(uri, generateThumbnail);

  return (
    <>
      <ImageBackground
        source={{uri: data}}
        style={{flex: 1, opacity: 0.15}}></ImageBackground>
      <View style={styles.artworkWrapper}>
        <Image source={{uri: data}} style={styles.artworkImg} />
      </View>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  artworkWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    paddingTop: 150,
    alignItems: 'center',
  },
  artworkImg: {
    width: 300,
    height: 300,
    borderRadius: 25,
  },
}));
export default Thumbnail;
