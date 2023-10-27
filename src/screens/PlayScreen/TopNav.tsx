import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Icon, makeStyles, useTheme} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

const TopNav = () => {
  const styles = useStyles();

  const navigation = useNavigation();

  const stopAndClearPlaylist = async () => {
    try {
      await TrackPlayer.pause();
      await TrackPlayer.removeUpcomingTracks();
      await TrackPlayer.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = async () => {
    stopAndClearPlaylist();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={{padding: 10}}>
        <Icon name="angle-left" type="font-awesome" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

var useStyles = makeStyles(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
}));
export default TopNav;
