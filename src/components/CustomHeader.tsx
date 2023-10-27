import {View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, makeStyles, useTheme} from '@rneui/themed';
import ArrowLeftIcon from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';

const CustomHeader = ({navigation, textHeader}: any) => {
  const {theme} = useTheme();
  const styles = useStyles();

  const route = useRoute();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={[theme.colors.pink, theme.colors.darkBlue]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.linearStyle}>
      <View style={styles.header}>
        {route.name !== 'Home' &&
          route.name !== 'Library' &&
          route.name !== 'Setting' && (
            <ArrowLeftIcon
              name="arrowleft"
              size={30}
              color="#fff"
              onPress={handleGoBack}
            />
          )}

        <Text h3 style={styles.textHeader}>
          {textHeader}
        </Text>
      </View>
    </LinearGradient>
  );
};

const useStyles = makeStyles(theme => ({
  linearStyle: {borderBottomRightRadius: 60},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  textHeader: {
    flex: 1,
    color: '#fff',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
}));
export default CustomHeader;
