import React from "react";
import { View, FlatList } from "react-native";
import { MyNotification } from "../../../components";
import { useSelector } from "react-redux";
import { LightTheme, DarkTheme } from "../../../theme/theme";

export default function StudentNotifications() {
  const theme = useSelector((state) => state.theme.theme);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const notificationList = [
    {
      name: "Bisma Shuja",
      message: "Wants to connect with you",
    },
    {
      name: "Maha Tariq ",
      message: "Wants to connect with you",
    },
  ];

  const renderNotification = ({ item }) => (
    <MyNotification
      name={item.name}
      message={item.message}
      onAccept={() => {}}
    />
  );

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: currentTheme.colors.background,
      }}
    >
      <FlatList
        data={notificationList}
        renderItem={renderNotification}
        keyExtractor={(item) => item.name} // Use a unique key for each
        style={{
          margin: 10,
          borderRadius: 40,
          // backgroundColor: "yellow",
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
