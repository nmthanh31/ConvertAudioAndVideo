import React from 'react';
import {View, Image, SafeAreaView, ImageBackground} from 'react-native';
import {makeStyles} from '@rneui/themed';

const AudioPlayback = ({val}: any) => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={val?.artwork}
        style={{flex: 1, opacity: 0.15}}></ImageBackground>
      <View style={styles.artworkWrapper}>
        <Image source={val?.artwork} style={styles.artworkImg} />
      </View>
    </SafeAreaView>
  );
};
var useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  artworkWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    paddingTop: 130,
    alignItems: 'center',
  },
  artworkImg: {
    width: 300,
    height: 300,
    borderRadius: 25,
  },
}));
export default AudioPlayback;
