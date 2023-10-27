import { Image } from '@rneui/base';
import { Text } from '@rneui/themed';
import React, { useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { themeOptions } from '../../configs/styles';
import { TextInput } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/AntDesign";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SyncedRealmContext } from '../../models/Realm/RealmConfig';
import Playlist from '../../models/Realm/Playlist';
import { BSON } from 'realm';
import Toast from 'react-native-toast-message';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import ThumbnailImage from '../../components/ThumbnailImage';

const AddPlayList = ({
  isVisibleAddPlayList,
  setVisibleAddPlayList,
}: {
  isVisibleAddPlayList: boolean;
  setVisibleAddPlayList: Function;
}) => {
  const [playListName, setPlayListName] = useState("")
  const [playListDes, setPlayListDes] = useState("")
  const [image, setImage] = useState<string | undefined>("")
  const { useRealm, useQuery } = SyncedRealmContext;
  const realm = useRealm();

  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    presentationStyle: 'fullScreen',
    selectionLimit: 0, // many files
  };

  const pickImage = async () => {
    try {
      await launchImageLibrary(options, response => {
        if (response.assets && response.assets.length > 0) {
          const uris = response.assets[0].uri;
          setImage(uris);
        }
      });
    } catch (err) {
      console.log('ImagePicker Error:', err);
    }
  };

  const handleGalleryScreen = () => {
    pickImage();
  };

  const handleAddSpace = () => {
    if (playListName !== "") {
      try {
        realm.write(() => {
          console.log('Create playlist successfully !!');
          const newPlayList = new Playlist(realm, playListName, playListDes, image);
          return newPlayList;
        });
        setPlayListDes("")
        setPlayListName("")
        setVisibleAddPlayList(false);
        setImage("");
        Toast.show({
          type: 'success',
          text1: 'Add new playlist successfully !!',
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>

        <Modal
          isVisible={isVisibleAddPlayList}
          style={{
            backgroundColor: '#FFFFFF',
            margin: 0,
            justifyContent: "flex-start"
          }}>
          <ScrollView>
            <View
              style={{
                width: "100%",
                alignItems: "center"
              }}
            >
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
                marginTop: 80
              }}>
                <View>
                  <TouchableOpacity onPress={() => setVisibleAddPlayList(!isVisibleAddPlayList)}>
                    <Text style={{
                      color: themeOptions.lightColors.pink,
                      fontSize: 18,
                      fontWeight: "700"
                    }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "700"
                  }}
                >PlayList</Text>
                <View >
                  <TouchableOpacity onPress={handleAddSpace} >
                    <Text
                      style={{
                        color: themeOptions.lightColors.pink,
                        fontSize: 18,
                        fontWeight: "700"
                      }}
                    >Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <TouchableOpacity style={{
                  width: 250,
                  backgroundColor: "grey",
                  height: 250,
                  borderRadius: 20,
                  margin: 20
                }}
                  onPress={handleGalleryScreen}
                >
                  <View>
                    {
                      image == "" ?
                        <MaterialCommunityIcon name="playlist-music" size={250} color={"#FFFFFF"} /> : 
                        <ThumbnailImage
                          uri={image}
                          width={250}
                          height={250}
                        />
                    }
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 24
                  }}
                >Playlist Name</Text>
                <TextInput
                  placeholder='PLease enter playlist name'
                  placeholderTextColor={themeOptions.lightColors.gray}
                  style={{
                    width: "90%",
                    borderBottomWidth: 1,
                    padding: 10,
                    fontSize: 18,
                    borderBottomColor: themeOptions.lightColors.lightGray,
                    textAlign: "center",
                    color:"black"
                  }}
                  value={playListName}
                  onChangeText={
                    setPlayListName
                  }
                ></TextInput>
              </View>
              <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                <TextInput
                  placeholder='PLease enter playlist description'
                  placeholderTextColor={themeOptions.lightColors.gray}
                  style={{
                    width: "90%",
                    borderBottomWidth: 1,
                    padding: 10,
                    fontSize: 14,
                    borderBottomColor: themeOptions.lightColors.lightGray,
                    textAlign: "center",
                    color:"black"
                  }}
                  value={playListDes}
                  multiline={true}
                  onChangeText={setPlayListDes}
                ></TextInput>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </SafeAreaView >
    </KeyboardAwareScrollView>

  );
};


export default AddPlayList;
