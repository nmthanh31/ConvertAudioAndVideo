import {View} from 'react-native';
import React from 'react';
import {Icon, makeStyles, Text, useTheme} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RightCircleO from 'react-native-vector-icons/AntDesign';

const SettingItem = ({navigation, item, handlePress}: any) => {
  const {theme} = useTheme();
  const styles = useStyles();
  return (
    <TouchableOpacity style={styles.itemWrap} onPress={handlePress}>
      <View style={styles.itemIconWrap}>
        <View style={styles.itemIcon}>
          <Icon name={item.icon} size={30} color="#fff" />
        </View>
        <Text style={styles.text}>{item.text}</Text>
      </View>

      <RightCircleO name="rightcircleo" size={25} color={theme.colors.blue} />
    </TouchableOpacity>
  );
};

const useStyles = makeStyles(theme => ({
  itemWrap: {
    backgroundColor: theme.colors.lightBlue,
    padding: 15,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  itemIcon: {
    backgroundColor: theme.colors.blue,
    padding: 10,
    borderRadius: 25,
  },
  iconColor: {color: theme.colors.lightBlue},
  text: {
    fontSize: 18.5,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
}));
export default SettingItem;
