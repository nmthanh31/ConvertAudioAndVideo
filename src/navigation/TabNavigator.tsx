import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingScreen from '../screens/SettingScreen';
import Library from '../screens/Library/Library';
import {Icon, makeStyles, useTheme} from '@rneui/themed';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {theme} = useTheme();

  const styles = useStyles();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.pink,
        tabBarStyle: {
          height: 70,
          paddingTop: 10,
          paddingBottom: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          tabBarLabelStyle: {
            ...styles.text,
          },
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="library-music" color={color} size={size} />
          ),
          tabBarLabelStyle: {
            ...styles.text,
          },
        }}
      />

      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" color={color} size={size} />
          ),
          tabBarLabelStyle: {
            ...styles.text,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: 14,
  },
}));
export default TabNavigator;
