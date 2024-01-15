import React from "react";
import MyText from "../MyText";
import { MyAvatar } from "../MyAvatar";
import { TouchableOpacity, View } from "react-native";

export default function ChatCard({ name, subTitle, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        width: "100%",
        height: 80,
        borderBottomWidth: 1,
        borderColor: "#ddd", // Add border color
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onPress={onPress}
    >
      <MyAvatar name={name} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <MyText>{name}</MyText>
        <MyText>{subTitle}</MyText>
      </View>
    </TouchableOpacity>
  );
}
