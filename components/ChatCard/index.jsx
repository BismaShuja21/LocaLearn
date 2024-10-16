import React from "react";
import MyText from "../MyText";
import { MyAvatar } from "../MyAvatar";
import { TouchableOpacity, View } from "react-native";
import { LightTheme, DarkTheme } from "../../theme/theme";
import { useSelector } from "react-redux";

export default function ChatCard({ name, subTitle, onPress }) {
  const theme = useSelector((state) => state.theme.theme);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: currentTheme.colors.background,
        width: "100%",
        height: 80,
        borderBottomWidth: 1,
        borderColor: currentTheme.colors.border, // Add border color
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
