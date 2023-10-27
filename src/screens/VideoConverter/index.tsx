import React, {useState} from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import BottomModal from '../../components/BottomModal';
import {Text, makeStyles, useTheme} from '@rneui/themed';
import CustomHeader from '../../components/CustomHeader';
import Thumbnail from '../../components/Thumbnail';
import Overlay from '../../components/Overlay';

const VideoConverter = ({navigation, route}: any) => {
  const {theme} = useTheme();

  const styles = useStyles();

  const list = route?.params?.list;

  const [overlay, setOverlay] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader navigation={navigation} textHeader={'Video Converter'} />

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Convert your videos here!</Text>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {list &&
          list.map((uri: any, idx: number) => (
            <Thumbnail key={idx} uri={uri} />
          ))}
      </ScrollView>

      {/* BottomSheetModal */}
      <BottomModal list={list} setOverlay={setOverlay} />
      {overlay && <Overlay />}
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
  },
  titleWrapper: {
    padding: 30,
    backgroundColor: theme.colors.lightGray,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    gap: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default VideoConverter;
