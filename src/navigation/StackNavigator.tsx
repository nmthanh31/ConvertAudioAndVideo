import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import VideoConverter from '../screens/VideoConverter';
import Library from '../screens/Library/Library';
import Sounds from '../screens/Sounds';
import Playlists from '../screens/Playlists';
import TabNavigator from './TabNavigator';
import DetailPlayList from '../screens/DetailPlayList';
import PlayScreen from '../screens/PlayScreen';
import Videos from '../screens/Videos';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="TabNav" component={TabNavigator} />
      <Stack.Screen name="Converter" component={VideoConverter} />
      <Stack.Screen name="Playlists" component={Playlists} />
      <Stack.Screen name="Sounds" component={Sounds} />
      <Stack.Screen name="DetailPlayList" component={DetailPlayList} />
      <Stack.Screen name="Videos" component={Videos} />
      <Stack.Screen name="PlayScreen" component={PlayScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
