import { Image, Text, makeStyles } from "@rneui/themed";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/AntDesign";
import ThumbnailImage from "./ThumbnailImage";
import Playlist from "../models/Realm/Playlist";
const PlayListLine = ({
  navigation,
  playList,
}:{
  navigation: any;
  playList : Playlist;
}) => {
  const styles = useStyle();
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 123,
        backgroundColor: "#FFFFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderColor: "#F5F5F5",
        marginBottom: 10
      }}
      onPress={() => {
        navigation.navigate("DetailPlayList", {
          idPlayList: playList.id
        })
      }}
    >
      <View style={{
        width: "90%", flexDirection: "row",
        alignItems: "center", justifyContent: "space-evenly"
      }}>
        <View style={{
          height: 75,
          backgroundColor: "rgba(63, 193, 201, 0.3)",
          width: 75,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center"
        }}>
          {playList.imgPath != "" ?
            <ThumbnailImage
              height={75}
              width={75}
              uri={playList.imgPath}
            />
            :
            <MaterialCommunityIcon name="playlist-music" size={65} color={"#FFFFFF"} />
          }
        </View>
        <View style={{ marginLeft: 15, width: "60%", justifyContent: "space-evenly" }}>
          <Text style={styles.Name}>
            {playList.name}
          </Text>
          <Text style={styles.Info}>
            {playList.lineitems.length} Videos/ Musics
          </Text>

        </View>
      </View>

    </TouchableOpacity>
  )
}
const useStyle = makeStyles(theme => ({
  Name: {
    fontWeight: "700",
    fontSize: 22,
  },
  Info: {

    fontWeight: "400",
    fontSize: 14,

  }
}))
export default PlayListLine