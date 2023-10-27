import { Image, Text } from "@rneui/themed";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"
import { toMB } from "../utils/getType";

const SoundLine = ({
  handlePress,
  handleLongPress,
  name,
  size,
  cDate,
}:{
  handlePress: any;
  handleLongPress: any;
  name: String;
  size: number,
  cDate: String
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        padding: 20,
        backgroundColor: "rgba(63, 193, 201, 0.3)",
        marginTop: 10,
        borderRadius: 20,
        height: 80
      }}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <Icon style={{ marginLeft: 10 }} name="play" color={"#3FC1C9"} size={30}></Icon>

      <View style={{
        justifyContent: "center",
        width: "95%",
        marginLeft: 20
      }}>
        <Text
          style={{
            color: "#3FC1C9",
            fontSize: 20,
            fontWeight: "700",
            width: "90%"
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >{name}</Text>
        <Text
          style={{
            color: "#3FC1C9",
            fontSize: 16,
            fontWeight: "400"
          }}>{toMB(size,"")}   {cDate}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default SoundLine