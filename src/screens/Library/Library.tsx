import { Text } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { Image, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import ListUlIcon from 'react-native-vector-icons/FontAwesome5';
import FiberNewIcon from 'react-native-vector-icons/MaterialIcons';
import { windowWidth } from '../../utils/dimension';
import CustomHeader from '../../components/CustomHeader';
import RNFS from 'react-native-fs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import Thumbnail from '../../components/Thumbnail';
import ThumbnailImage from '../../components/ThumbnailImage';
import { getType } from '../../utils/getType';
import { createSongs } from '../PlayScreen/createSongs';

const Library = ({ navigation }: any) => {
  const styles = useStyles();
  const [list, setList] = useState<RNFS.ReadDirItem[]>([]);

  const loadConvertedVideo = async () => {
    const existMusic = await RNFS.exists(
      `${RNFS.DocumentDirectoryPath}/converted/music`,
    );
    if (!existMusic)
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/converted/music`);
    const existVideo = await RNFS.exists(
      `${RNFS.DocumentDirectoryPath}/converted/video`,
    );
    if (!existVideo)
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/converted/video`);
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
    setList(data.sort((a: any, b: any) => Date.parse(b.mtime) - Date.parse(a.mtime)))

  }
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      loadConvertedVideo();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} textHeader={'Library'} />
      <ScrollView>
        <View style={{
          marginTop: 30,
          alignItems: "center"
        }}>
          <TouchableOpacity
            style={{ width: windowWidth - 10, alignItems: "center" }}
            onPress={() => navigation.navigate('Playlists')}
          >
            <View style={styles.list}>
              <ListUlIcon name="list-ul" size={20} color={"#3FC1C9"} />
              <Text style={styles.text}>Playlist</Text>
              <Icon name="right" size={20} color={"#3FC1C9"} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: windowWidth - 10, alignItems: "center" }} onPress={() => navigation.navigate('Sounds')}
          >
            <View style={styles.list}>
              <Icon name="sound" size={20} color={"#3FC1C9"} />
              <Text style={styles.text}>Sounds</Text>
              <Icon name="right" size={20} color={"#3FC1C9"} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: windowWidth - 10, alignItems: "center" }}
            onPress={() => {
              navigation.navigate("Videos")
            }}
          >
            <View style={styles.list}>
              <Icon name="videocamera" size={20} color={"#3FC1C9"} />
              <Text style={styles.text}>Videos</Text>
              <Icon name="right" size={20} color={"#3FC1C9"} />
            </View>
          </TouchableOpacity>

          <View style={{ width: windowWidth - 10, alignItems: "center" }}>
            <View style={[styles.list, { backgroundColor: "#FFF", marginLeft: -20 }]}>
              <FiberNewIcon name="fiber-new" size={20} color={"#3FC1C9"} />
              <Text style={styles.text}>Recently converted</Text>

            </View>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 20, justifyContent: "center" }}>
          <ScrollView nestedScrollEnabled={true}>
            <View style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}>
              {
                list.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.name}
                      style={{
                        width: windowWidth / 2 - 30,
                        height: windowWidth / 2,
                        marginLeft: 20
                      }}
                      onPress={() => {
                        console.log(getType(item.path));
                        const itemType = getType(item.path);
                        const tracks = createSongs([
                          {
                            id: item.path,
                            name: item.name,
                            path: item.path,
                            type: itemType === 'audio' ? 'music' : 'video',
                          },
                        ]);
                        navigation.navigate('PlayScreen', {
                          list: tracks,
                        });
                      }}
                    >
                      {
                        getType(item.path) == "audio" ? <MaterialCommunityIcon style={{
                          width: windowWidth / 2 - 30,
                          height: windowWidth / 2 - 30,
                          borderRadius: 20
                        }} name="playlist-music" size={windowWidth / 2 - 30} color={"#3FC1C9"} /> :
                          <View>
                            <ThumbnailImage uri={'file://' + item.path} height={windowWidth / 2 - 30} width={windowWidth / 2 - 30}></ThumbnailImage>
                          </View>
                      }

                      <Text
                        numberOfLines={1}
                        style={{ textAlign: "center", fontSize: 18 }}
                        ellipsizeMode="tail"
                      >{item.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }

            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}
const useStyles = makeStyles(theme => ({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f2ff',
    marginTop: 10,
    borderRadius: 20,
  },
  text: {
    width: '80%',
    fontSize: 20,
    marginLeft: 10,
  },
}));

export default Library;
