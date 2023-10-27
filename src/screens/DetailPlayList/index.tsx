import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import {Text, makeStyles, useTheme} from '@rneui/themed';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {SyncedRealmContext} from '../../models/Realm/RealmConfig';
import Playlist from '../../models/Realm/Playlist';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import RNFS from 'react-native-fs';
import dayjs from 'dayjs';
import {useIsFocused} from '@react-navigation/native';
import LineItem from '../../models/Realm/LineItem';
import Toast from 'react-native-toast-message';
import EditPlayList from '../EditPlayList';
import Modal from 'react-native-modal';
import {themeOptions} from '../../configs/styles';
import {BSON} from 'realm';
import ThumbnailImage from '../../components/ThumbnailImage';
import {getType} from '../../utils/getType';
import LineItemLine from '../../components/AddLineItem';
import {createSongs} from '../PlayScreen/createSongs';

const DetailPlayList = ({navigation, route}: any) => {
  const {theme} = useTheme();
  const {useRealm, useObject, useQuery} = SyncedRealmContext;
  const {idPlayList} = route.params;
  const realm = useRealm();
  const [list, setList] = useState<RNFS.ReadDirItem[]>([]);
  const [isVisibleEditPlayList, setVisibleEditPlayList] =
    useState<boolean>(false);
  const [idLineItem, setIdLineItem] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const loadConverted = async () => {
    const existMusic = await RNFS.exists(
      `${RNFS.DocumentDirectoryPath}/converted/music`,
    );
    if (!existMusic)
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/converted/music`);
    const existVideo = await RNFS.exists(
      `${RNFS.DocumentDirectoryPath}/converted/video`,
    );
    if (!existVideo)
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/converted/music`);
    if (existMusic && existVideo) {
      const dataVideo = await RNFS.readDir(
        `${RNFS.DocumentDirectoryPath}/converted/video`,
      ).then(res => {
        return res;
      });
      const dataAudio = await RNFS.readDir(
        `${RNFS.DocumentDirectoryPath}/converted/music`,
      ).then(res => {
        return res;
      });
      const data = [...dataAudio, ...dataVideo];

      setList(data);
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      loadConverted();
    }
  }, [isFocused, list]);

  const playListDetail = useObject<Playlist>('Playlist', idPlayList);
  const lineItemRef = useQuery('LineItem');
  const styles = useStyles();
  //Bottom Sheet Modal Setting
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [220], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // Bottom sheet modal delete LineItem
  const bottomSheetModalDeleteLineItemRef = useRef<BottomSheetModal>(null);
  const snapPointsDeleteLineItem = useMemo(() => [160], []);
  const handlePresentModalDeleteLineItemPress = useCallback(() => {
    bottomSheetModalDeleteLineItemRef.current?.present();
  }, []);
  const handleSheetDeleteLineItemChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // BottomSheet MOdal Add LineItem
  const bottomSheetModalAddRef = useRef<BottomSheetModal>(null);
  const snapPointsAdd = useMemo(() => ['100%'], []);
  const handlePresentModalAddPress = useCallback(() => {
    bottomSheetModalAddRef.current?.present();
  }, []);
  const handleSheetChangesAdd = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (backdropProps: any) => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}>
          <IconIonicons name="chevron-back-sharp" size={35} color={'black'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePresentModalPress} style={styles.back}>
          <IconIonicons name="settings-outline" size={30} color={'black'} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: 220,
              backgroundColor: 'grey',
              height: 220,
              borderRadius: 20,
              margin: 20,
            }}>
            <View>
              {playListDetail?.imgPath != '' ? (
                <ThumbnailImage
                  uri={playListDetail?.imgPath}
                  width={220}
                  height={220}
                />
              ) : (
                <MaterialCommunityIcon
                  name="playlist-music"
                  size={220}
                  color={'#FFFFFF'}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.title}>{playListDetail?.name}</Text>
          <Text
            ellipsizeMode="tail"
            style={styles.description}
            numberOfLines={3}>
            {playListDetail?.description}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            style={{
              width: '60%',
              backgroundColor:
                playListDetail?.lineitems.length === 0
                  ? theme.colors.gray
                  : theme.colors.pink,
              height: 50,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
            disabled={playListDetail?.lineitems.length === 0}
            onPress={() => {
              const tracks = createSongs(playListDetail?.lineitems);
              navigation.navigate('PlayScreen', {list: tracks});
            }}>
            <Text style={{color: '#FFFF', fontSize: 24, fontWeight: 'bold'}}>
              Play all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          {playListDetail?.lineitems.length > 0 ? (
            playListDetail?.lineitems.map((item, index) => {
              return (
                <LineItemLine
                  key={index}
                  type={getType(item.path)}
                  name={item.name}
                  size={item.size}
                  uri={item.path}
                  cDate={dayjs(item.mtime).format('DD/MM/YYYY')}
                  check={true}
                  handlePress={() => {
                    console.log(item);
                    const tracks = createSongs(playListDetail?.lineitems);
                    navigation.navigate('PlayScreen', {
                      list: tracks,
                      initPos: index,
                    });
                  }}
                  handleLongPress={() => {
                    handlePresentModalDeleteLineItemPress();
                    setIdLineItem(item.id);
                    setNewName(item.name.split('.')[0]);
                  }}
                />
              );
            })
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 80,
                opacity: 0.2,
              }}>
              <MaterialCommunityIcon
                color={'black'}
                size={70}
                name="playlist-remove"></MaterialCommunityIcon>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                This playlist is empty
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.bottomStyle}
        backdropComponent={renderBackdrop}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.lineSetting}
            onPress={handlePresentModalAddPress}>
            <IconIonicons
              name="add-circle-outline"
              size={30}
              color={'black'}></IconIonicons>
            <Text style={{fontSize: 18, fontWeight: '400', marginLeft: 10}}>
              Add to playlist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lineSetting}
            onPress={() => {
              setVisibleEditPlayList(true),
                bottomSheetModalRef.current?.close();
            }}>
            <IconAntDesign
              name="edit"
              size={30}
              color={'black'}></IconAntDesign>
            <Text style={{fontSize: 18, fontWeight: '400', marginLeft: 10}}>
              Edit Playlist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lineSetting}
            onPress={() => {
              try {
                realm.write(() => {
                  realm.delete(playListDetail);
                  navigation.goBack();
                  Toast.show({
                    type: 'success',
                    text1: 'Delete playlist successfully !!',
                  });
                });
              } catch (error) {
                console.log(error);
              }
            }}>
            <IconAntDesign
              name="delete"
              size={30}
              color={'black'}></IconAntDesign>
            <Text style={{fontSize: 18, fontWeight: '400', marginLeft: 10}}>
              Delete playlist
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetModalAddRef}
        snapPoints={snapPointsAdd}
        onChange={handleSheetChangesAdd}
        style={styles.bottomStyle}
        backdropComponent={renderBackdrop}>
        <View
          style={{
            width: '100%',
            height: 30,
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            Add to playlist
          </Text>
        </View>
        <BottomSheetScrollView>
          <View style={[styles.container, {alignItems: 'center'}]}>
            {list.map((item: any, index) => {
              return (
                <LineItemLine
                  key={index}
                  type={getType(item.path)}
                  name={item.name}
                  size={item.size}
                  uri={item.path}
                  cDate={dayjs(item.mtime).format('DD/MM/YYYY')}
                  check={
                    playListDetail?.lineitems.filtered(
                      '$0 == path',
                      item.path,
                    ) === undefined ||
                    playListDetail?.lineitems
                      .filtered('$0 == path', item.path)
                      .isEmpty()
                  }
                  handlePress={() => {
                    console.log(
                      playListDetail?.lineitems.filtered(
                        '$0 == path',
                        item.path,
                      ),
                    );
                    try {
                      if (
                        playListDetail?.lineitems.filtered(
                          '$0 == path',
                          item.path,
                        ) === undefined
                      ) {
                        realm.write(() => {
                          if (
                            lineItemRef
                              .filtered('$0 == path', item.path)
                              .isEmpty()
                          ) {
                            const audio = LineItem.make(
                              realm,
                              new BSON.ObjectID().toHexString(),
                              item.name,
                              getType(item.path) == 'audio' ? 'music' : 'video',
                              item.path,
                              item.size.toString(),
                              item.mtime?.toString(),
                            );
                            playListDetail?.lineitems.push(audio as LineItem);
                          } else {
                            playListDetail?.lineitems.push(
                              lineItemRef.filtered(
                                '$0 == path',
                                item.path,
                              )[0] as LineItem,
                            );
                          }

                          Toast.show({
                            type: 'success',
                            text1: 'Add audio to playlist successfully !!',
                          });
                        });
                      } else if (
                        playListDetail?.lineitems
                          .filtered('$0 == path', item.path)
                          .isEmpty()
                      ) {
                        realm.write(() => {
                          if (
                            lineItemRef
                              .filtered('$0 == path', item.path)
                              .isEmpty()
                          ) {
                            const audio = LineItem.make(
                              realm,
                              new BSON.ObjectID().toHexString(),
                              item.name,
                              getType(item.path) == 'audio' ? 'music' : 'video',
                              item.path,
                              item.size.toString(),
                              item.mtime?.toString(),
                            );
                            playListDetail?.lineitems.push(audio as LineItem);
                          } else {
                            playListDetail?.lineitems.push(
                              lineItemRef.filtered(
                                '$0 == path',
                                item.path,
                              )[0] as LineItem,
                            );
                          }
                          Toast.show({
                            type: 'success',
                            text1:
                              'Add ' + getType(item.path) == 'audio'
                                ? 'music'
                                : 'video' + ' to playlist successfully !!',
                          });
                        });
                      } else {
                        Toast.show({
                          type: 'error',
                          text1:
                            getType(item.path) == 'audio'
                              ? 'music' + ' already exists in playlist !!'
                              : 'video' + ' already exists in playlist !!',
                        });
                      }
                    } catch (ex) {
                      console.log(ex);
                    }
                  }}></LineItemLine>
              );
            })}
          </View>
        </BottomSheetScrollView>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly',
            marginBottom: 50,
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{
              width: '40%',
              height: 40,
              backgroundColor: '#FC5185',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            onPress={() => {
              bottomSheetModalAddRef.current?.close();
              bottomSheetModalRef.current?.dismiss();
            }}>
            <Text style={{fontSize: 24, color: '#FFFFFF'}}>Done</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetModalDeleteLineItemRef}
        snapPoints={snapPointsDeleteLineItem}
        onChange={handleSheetDeleteLineItemChanges}
        style={styles.bottomStyle}
        backdropComponent={renderBackdrop}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.lineSetting} onPress={toggleModal}>
            <IconAntDesign
              name="edit"
              size={30}
              color={'black'}></IconAntDesign>
            <Text style={{fontSize: 18, fontWeight: '400', marginLeft: 10}}>
              Edit lineItem
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lineSetting}
            onPress={() => {
              try {
                const newData = playListDetail?.lineitems.filter(item => {
                  return item.id != idLineItem;
                });
                realm.write(() => {
                  playListDetail.lineitems = newData;
                  bottomSheetModalDeleteLineItemRef.current?.close();
                  Toast.show({
                    type: 'success',
                    text1: 'Delete lineitem successfully !!',
                  });
                });
              } catch (error) {
                console.log(error);
              }
            }}>
            <IconAntDesign
              name="delete"
              size={30}
              color={'black'}></IconAntDesign>
            <Text style={{fontSize: 18, fontWeight: '400', marginLeft: 10}}>
              Delete lineItem
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
      <EditPlayList
        isVisibleEditPlayList={isVisibleEditPlayList}
        setVisibleEditPlayList={setVisibleEditPlayList}
        playList={playListDetail}></EditPlayList>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            alignItems: 'center',
            padding: 20,
          }}>
          <Text style={{fontSize: 24}}>New name</Text>
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
              color: 'black',
            }}></TextInput>
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
              <Text style={{fontSize: 24, color: '#FFFFFF'}}>Cancel</Text>
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
                const newData = playListDetail?.lineitems.filtered(
                  '$0 == id',
                  idLineItem,
                );
                const newDataEdit = lineItemRef.filtered(
                  '$0 == path',
                  newData[0].path,
                );
                const name = newName.split(' ');
                let newPathName = '';
                if (name.length > 1) {
                  name.map((item, index) => {
                    if (index != name.length - 1) {
                      newPathName = newPathName + item + '_';
                    } else {
                      newPathName = newPathName + item;
                    }
                  });
                } else {
                  newPathName = newName;
                }
                await RNFS.moveFile(
                  newData[0].path,
                  `${RNFS.DocumentDirectoryPath}/converted/${
                    newData[0].type
                  }/${newPathName}.${
                    newData[0].path.split('.')[
                      newData[0].path.split('.').length - 1
                    ]
                  }`,
                );
                realm.write(() => {
                  newData[0].path = `${RNFS.DocumentDirectoryPath}/converted/${
                    newData[0].type
                  }/${newPathName}.${
                    newData[0].path.split('.')[
                      newData[0].path.split('.').length - 1
                    ]
                  }`;
                  newData[0].name =
                    newPathName +
                    '.' +
                    newData[0].path.split('.')[
                      newData[0].path.split('.').length - 1
                    ];
                });
                setNewName('');
                toggleModal();
              }}>
              <Text style={{fontSize: 24, color: '#FFFFFF'}}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 15,
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 10,
    width: '90%',
    textAlign: 'center',
  },
  list: {
    width: '100%',
    alignItems: 'center',
  },
  bottomStyle: {
    flex: 1,
    padding: 20,
  },
  container: {
    width: '100%',
    marginTop: 10,
  },
  lineSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
  },
}));

export default DetailPlayList;
