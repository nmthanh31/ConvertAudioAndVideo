import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Text, Image, makeStyles, useTheme} from '@rneui/themed';
import {windowHeight, windowWidth} from '../../utils/dimension';
import LinearGradient from 'react-native-linear-gradient';
import ArrowRightIcon from 'react-native-vector-icons/AntDesign';

const imgURL = require('../../assets/img/logo_video.jpg');

const Welcome = ({navigation}: any) => {
  const {theme} = useTheme();

  const styles = useStyles();

  return (
    <LinearGradient
      colors={[theme.colors.pink, theme.colors.darkBlue]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Image source={imgURL} style={styles.img} />
        <View style={styles.textWrapper}>
          <Text h3 style={styles.text}>
            Welcome to Video Converter!
          </Text>
          <Text style={styles.text}>
            Whether you want to convert your videos to MP4, AVI, MKV, or any
            other popular format, our app has got you covered.
          </Text>
          <Text style={styles.text}>
            Start converting now and discover a world of possibilities!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('TabNav')}>
          <Text style={styles.btnText}>
            Continue
            <ArrowRightIcon name="arrowright" size={20} />
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
  },

  textWrapper: {
    gap: 20,
    padding: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
  },
  img: {width: 250, height: 250, borderRadius: 25},
  btn: {
    backgroundColor: theme.colors.pink,
    borderRadius: 15,
    width: windowWidth - 40,
    paddingVertical: 15,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 1,
    textAlign: 'center',
  },
}));

export default Welcome;
