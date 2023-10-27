import React, { useState, useMemo, useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View, } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import { Text } from "@rneui/themed";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import PlayListLine from "../../components/PlayListLine";
import AddPlayList from "../AddPlayList";
import { SyncedRealmContext } from "../../models/Realm/RealmConfig";

const Playlists = ({ navigation }: any) => {
  const [isSorted, setIsSorted] = useState<Boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isVisibleAddPlayList, setVisibleAddPlayList] = useState<boolean>(false)
  const { useRealm, useQuery } = SyncedRealmContext
  const playListsASCRef = useQuery("Playlist").filtered("name!= null SORT(name ASC)")
  const playListsDESCRef = useQuery("Playlist").filtered("name!= null SORT(name DESC)")
  const playListASC = useMemo(() => Array.from(playListsASCRef), [playListsASCRef])
  const playListDESC = useMemo(() => Array.from(playListsDESCRef), [playListsDESCRef])


  const handleSortByName = () => {
    setIsSorted(!isSorted)
  }


  return (
    <SafeAreaView style={{
      backgroundColor: "#FFFFFF",
      flex: 1
    }}>
      <CustomHeader navigation={navigation} textHeader={"Playlists"} />

      <View style={{
        alignItems: "center",
      }}>
        <View style={{
          padding: 10,
          width: "90%",
          justifyContent: "space-between",
          flexDirection: "row"
        }}>
          <TouchableOpacity
            onPress={() => { handleSortByName() }}
            style={{
              width: 35,
              height: 35
            }}
          >
            {
              isSorted ?
                <FontAwesome5Icon name="sort-alpha-down-alt" size={25} color={"#57B894"} /> :
                <FontAwesome5Icon name="sort-alpha-down" size={25} color={"#57B894"} />
            }
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { setVisibleAddPlayList(true) }}
            style={{
              width: 35,
              height: 35
            }}
          >
            {
              <Icon name="pluscircle" size={25} color={"#57B894"} />
            }
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          marginTop: 10,
          borderRadius: 20,
          width: "90%"
        }}>
          <TextInput
            placeholder="Find in Playlists"
            placeholderTextColor={"rgba(87, 184, 148, 0.3)"}
            style={{
              fontSize: 18,
              padding: 10,
              width: "90%",
              color: "#57B894"
            }}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
            }}
          >
            <Icon name="search1" size={25} color={"#57B894"}></Icon>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ width: "100%", alignItems: "center" }}>
          {
            search === "" ?
              isSorted == true ?
                playListASC.map((item: any) => {
                  return (
                    <PlayListLine playList={item} navigation={navigation} key={item.id}  ></PlayListLine>
                  )
                }) :
                playListDESC.map((item: any) => {
                  return (
                    <PlayListLine playList={item} navigation={navigation} key={item.id}></PlayListLine>
                  )
                }) :
              isSorted == true ?
                playListASC.map((item: any) => {
                  if (item.name.indexOf(search) != -1) {
                    return (
                      <PlayListLine playList={item} navigation={navigation} key={item.id}></PlayListLine>
                    )
                  }
                }) :
                playListDESC.map((item: any) => {
                  if (item.name.indexOf(search) != -1) {
                    return (
                      <PlayListLine playList={item} navigation={navigation} key={item.id}></PlayListLine>
                    )
                  }
                })
          }

        </View>
      </ScrollView>
      <AddPlayList isVisibleAddPlayList={isVisibleAddPlayList} setVisibleAddPlayList={setVisibleAddPlayList}></AddPlayList>
    </SafeAreaView>
  )
}

export default Playlists