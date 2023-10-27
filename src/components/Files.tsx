import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, makeStyles} from '@rneui/themed';
import FolderVideoIcon from 'react-native-vector-icons/Entypo';
import RightCircleO from 'react-native-vector-icons/AntDesign';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

const Files = ({navigation}: any) => {
  const styles = useStyles();

  const pickDocuments = async () => {
    try {
      const results: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
        allowMultiSelection: true,
        copyTo: 'cachesDirectory',
      });

      const fileCopyUris = results.map(result => result.fileCopyUri);

      navigation.navigate('Converter', {list: fileCopyUris});
    } catch (err) {
      console.log('DocumentPicker Error:', err);
    }
  };

  const handleFilesScreen = () => {
    pickDocuments();
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.itemWrap} onPress={handleFilesScreen}>
        <View style={styles.itemIconWrap}>
          <View style={styles.itemIcon}>
            <FolderVideoIcon name="folder-video" size={30} color="#fff" />
          </View>
          <View style={styles.textWrap}>
            <Text h4 style={styles.text}>
              Files
            </Text>
            <Text style={styles.text}>Click here to Convert Video</Text>
          </View>
        </View>

        <RightCircleO name="rightcircleo" size={25} color="#57B894" />
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  item: {
    backgroundColor: theme.colors.lightGreen,
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
  itemIcon: {
    backgroundColor: theme.colors.green,
    padding: 15,
    borderRadius: 25,
  },
  iconColor: {color: theme.colors.lightGreen},
  textWrap: {gap: 5},
  text: {
    fontWeight: '400',
    letterSpacing: 0.5,
  },
}));

export default Files;
