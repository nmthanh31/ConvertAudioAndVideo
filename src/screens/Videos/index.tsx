import { Text } from '@rneui/base';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { makeStyles } from '@rneui/themed';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import SoundLine from '../../components/SoundLine';
import CustomHeader from '../../components/CustomHeader';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import dayjs from "dayjs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import Modal from "react-native-modal";
import { themeOptions } from "../../configs/styles";
import { SyncedRealmContext } from "../../models/Realm/RealmConfig";
import LineItem from "../../models/Realm/LineItem";
import Toast from "react-native-toast-message";
import VideoLine from "../../components/VideoLine";
import EntypoIcon from "react-native-vector-icons/Entypo"
import { getType } from "../../utils/getType";
import { createSongs } from '../PlayScreen/createSongs';

const Sounds = ({ navigation }: any) => {
  const styles = useStyles();
  const { useRealm, useQuery } = SyncedRealmContext;
  const realm = useRealm();
  const lineItemRef = useQuery<LineItem>('LineItem');
  const [list, setList] = useState<RNFS.ReadDirItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [path, setPath] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState<string>('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const loadConvertedAudio = async () => {
    const data = await RNFS.readDir(
      `${RNFS.DocumentDirectoryPath}/converted/video`,
    ).then(res => {
      return res;
    });
    setList(data);
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      loadConvertedAudio();
    }
  }, [isFocused, list]);

  // Bottom sheet modal delete LineItem
  const bottomSheetModalDeleteLineItemRef = useRef<BottomSheetModal>(null);
  const snapPointsDeleteLineItem = useMemo(() => [160], []);
  const handlePresentModalDeleteLineItemPress = useCallback(() => {
    bottomSheetModalDeleteLineItemRef.current?.present();
  }, []);
  const handleSheetDeleteLineItemChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const renderBackdrop = useCallback(
    (    backdropProps: any) =>(
      <BottomSheetBackdrop
      {...backdropProps}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      />
    ),[],
  )
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} textHeader={'List Video'} />
      <View
        style={{
          marginTop: 30,
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: '#F5F5F5',
            width: '90%',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Enter name of sound"
            placeholderTextColor={'rgba(63, 193, 201, 0.3)'}
            style={{
              fontSize: 18,
              padding: 10,
              width: '90%',
              color: '#3FC1C9',
            }}
            value={search}
            onChangeText={setSearch}></TextInput>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
            }}>
            <Icon name="search1" size={25} color={"black"}></Icon>
          </TouchableOpacity>
        </View>

        {
          list.length > 0 ?
            <ScrollView>
              <View style={{ alignItems: "center" }}>
                {
                  search === "" ?
                    list.map((item) => {
                      return (
                        <VideoLine
                          key={item.path}
                          uri={item.path}
                          name={item.name}
                          size={item.size}
                          cDate={dayjs(item.mtime).format("DD/MM/YYYY")}
                          handlePress={() => {
                            console.log(item);
                            const tracks = createSongs([
                              {
                                id: item.path,
                                name: item.name,
                                path: item.path,
                                type: 'video',
                              },
                            ]);
                            navigation.navigate('PlayScreen', {
                              list: tracks,
                            });
                          }}
                          handleLongPress={() => {
                            setPath(item.path)
                            handlePresentModalDeleteLineItemPress();
                            setNewName(item.name.split(".")[0])
                          }}
                        ></VideoLine>
                      )
                    }) :
                    list.map(item => {
                      if (item.name.indexOf(search) != -1) {
                        return (
                          <VideoLine
                            key={item.path}
                            uri={item.path}
                            name={item.name}
                            size={item.size}
                            cDate={dayjs(item.mtime).format("DD/MM/YYYY")}
                            handlePress={() => {
                              console.log(item);
                              const tracks = createSongs([
                                {
                                  id: item.path,
                                  name: item.name,
                                  path: item.path,
                                  type: 'video',
                                },
                              ]);
                              navigation.navigate('PlayScreen', {
                                list: tracks,
                              });
                            }}
                            handleLongPress={() => {
                              setPath(item.path)
                              handlePresentModalDeleteLineItemPress();
                              setNewName(item.name.split(".")[0])
                            }}
                          ></VideoLine>
                        )
                      }
                    })
                }


              </View>

            </ScrollView> :
            <View style={{
              flex: 1,
              alignItems: "center",
              marginTop: 80,
              opacity: 0.3
            }}>
              <EntypoIcon color={"black"} size={70} name="folder-video"></EntypoIcon>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>No audio has been converted yet</Text>
            </View>
        }
      </View>
      <BottomSheetModal
        ref={bottomSheetModalDeleteLineItemRef}
        snapPoints={snapPointsDeleteLineItem}
        onChange={handleSheetDeleteLineItemChanges}
        style={styles.bottomStyle}
        backdropComponent={renderBackdrop}>
        <View style={styles.container}>
  <TouchableOpacity
    style={styles.lineSetting}
    onPress={toggleModal}
  >
    <IconAntDesign name="edit" size={30} color={"black"}></IconAntDesign>
    <Text style={{ fontSize: 18, fontWeight: "400", marginLeft: 10 }}>Edit lineItem</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.lineSetting}
      onPress={() => {
        try {
          const newData = lineItemRef.filtered('$0 == path', path);
          RNFS.unlink(path)
            .then(() => {
              console.log('FILE DELETED');
            })
            .catch(err => {
              Toast.show({
                type: 'error',
                text1: err,
              });
            });
          realm.write(() => {
            newData.map(item => {
              realm.delete(item);
            });
            Toast.show({
              type: 'success',
              text1: 'Delete lineitem successfully !!',
            });
            bottomSheetModalDeleteLineItemRef.current?.close();
          });
        } catch (error) {
          console.log(error);
        }
      }
      }
    >
      <IconAntDesign name="delete" size={30} color={"black"}></IconAntDesign>
      <Text style={{ fontSize: 18, fontWeight: "400", marginLeft: 10 }}>Delete lineItem</Text>
    </TouchableOpacity>
  </View>
      </BottomSheetModal >
  <Modal isVisible={isModalVisible}>
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        alignItems: 'center',
        padding: 20,
      }}>
      <Text style={{ fontSize: 24 }}>New name</Text>
      <TextInput
        placeholder="Enter new name"
        value={newName}
        onChangeText={setNewName}
        placeholderTextColor={themeOptions.lightColors.gray}
        style={{
          width: '90%',
          borderBottomWidth: 1,
          padding: 20,
          fontSize: 18,
          borderBottomColor: themeOptions.lightColors.lightGray,
          color: "black"
        }}
      >

      </TextInput>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={{
            width: '40%',
            height: 40,
            backgroundColor: '#3FC1C9',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={() => {
            toggleModal();
            bottomSheetModalDeleteLineItemRef.current?.close();
          }}>
          <Text style={{ fontSize: 24, color: '#FFFFFF' }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '40%',
            height: 40,
            backgroundColor: '#FC5185',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={async () => {
            const newData = lineItemRef.filtered('$0 == path', path);
            const name = newName.split(' ');
            let newPathName = '';
            if (name.length > 1) {
              name.map((item, index) => {
                if (index != name.length - 1) {
                  newPathName = newPathName + item + "_";
                } else {
                  newPathName = newPathName + item
                }
              })
            } else {
              newPathName = newName;
            }

            await RNFS.moveFile(path, `${RNFS.DocumentDirectoryPath}/converted/${getType(path) == "audio" ? "music" : "video"}/${newPathName}.${path.split(".")[path.split(".").length - 1]}`)
            realm.write(() => {
              newData.map((item) => {
                item.path = `${RNFS.DocumentDirectoryPath}/converted/${item.type}/${newPathName}.${item.path.split(".")[path.split(".").length - 1]}`;
                item.name = newPathName + "." + item.path.split(".")[path.split(".").length - 1];
              })
            })
            setNewName("");
            toggleModal();
            bottomSheetModalDeleteLineItemRef.current?.close();
          }}>
          <Text style={{ fontSize: 24, color: '#FFFFFF' }}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
    </SafeAreaView >
  );
};
const useStyles = makeStyles(theme => ({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    marginTop: 10,
  },
  bottomStyle: {
    flex: 1,
    padding: 20,
  },
  lineSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
  },
  container: {
    width: '100%',
  },
}));

export default Sounds;
