import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, makeStyles, Icon, useTheme} from '@rneui/themed';
import RightCircleO from 'react-native-vector-icons/AntDesign';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

const Gallery = ({navigation}: any) => {
  const {theme} = useTheme();

  const styles = useStyles();

  const options: ImageLibraryOptions = {
    mediaType: 'video',
    presentationStyle: 'fullScreen',
    selectionLimit: 0, // many files
  };

  const pickImage = async () => {
    try {
      await launchImageLibrary(options, response => {
        if (response.assets && response.assets.length > 0) {
          const uris = response.assets.map(result => result.uri);

          navigation.navigate('Converter', {list: uris});
        }
      });
    } catch (err) {
      console.log('ImagePicker Error:', err);
    }
  };

  const handleGalleryScreen = () => {
    pickImage();
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.itemWrap} onPress={handleGalleryScreen}>
        <View style={styles.itemIconWrap}>
          <View style={styles.itemIcon}>
            <Icon name="video-library" size={30} color="#fff" />
          </View>
          <View style={styles.textWrap}>
            <Text h4 style={styles.text}>
              Gallery
            </Text>
            <Text style={styles.text}>Click here to Convert Video</Text>
          </View>
        </View>

        <RightCircleO name="rightcircleo" size={25} color={theme.colors.blue} />
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  item: {
    backgroundColor: theme.colors.lightBlue,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 25,
  },
  itemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  itemIcon: {backgroundColor: theme.colors.blue, padding: 15, borderRadius: 25},
  textWrap: {gap: 5},
  text: {
    fontWeight: '400',
    letterSpacing: 0.5,
  },
}));

export default Gallery;
