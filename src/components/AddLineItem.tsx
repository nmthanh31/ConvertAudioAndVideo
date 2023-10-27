import { Image, Text } from "@rneui/themed";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"
import ThumbnailImage from "./ThumbnailImage";
import { toMB } from "../utils/getType";

const LineItemLine = ({
  handlePress,
  handleLongPress,
  name,
  size,
  cDate,
  check,
  type,
  uri,
}: {
  handlePress: any;
  handleLongPress: any;
  name: String;
  size: number,
  cDate: String,
  check: Boolean,
  type: String,
  uri: String,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        padding: 20,
        backgroundColor: "rgba(63, 193, 201, 0.3)",
        marginBottom: 10,
        borderRadius: 20,
        height: 80,
      }}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      {
        type == "audio" ?
          <Icon style={{ marginLeft: 10 }} name="play" color={"#3FC1C9"} size={30}></Icon> :
          <ThumbnailImage uri={uri} height={40} width={40}></ThumbnailImage>
      }
      <View style={{
        justifyContent: "center",
        width: "70%",
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
          }}>{toMB(size, "")}   {cDate}</Text>
      </View>
      <Icon
        name="checkcircleo"
        size={30}
        color={"#3FC1C9"}
        style={{
          display: check == true ? "none" : "flex"
        }}
      ></Icon>
    </TouchableOpacity>
  )
}
export default LineItemLine