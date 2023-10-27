import {SafeAreaView} from 'react-native';
import React from 'react';
import {View} from 'react-native';
import {makeStyles} from '@rneui/themed';
import Gallery from '../../components/Gallery';
import Files from '../../components/Files';
import CustomHeader from '../../components/CustomHeader';

const HomeScreen = ({navigation}: any) => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} textHeader={'Imported Video'} />

      <View style={styles.wrapper}>
        {/* Choose from Gallery  */}
        <Gallery navigation={navigation} />

        {/* Choose from Files */}
        <Files navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  safeArea: {
    flex: 1,
  },
  linearStyle: {borderBottomRightRadius: 60},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  textHeader: {
    color: '#fff',
    letterSpacing: 0.5,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'space-between',
    gap: 40,
  },
}));

export default HomeScreen;
