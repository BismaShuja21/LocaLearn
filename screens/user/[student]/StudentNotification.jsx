import React from "react";
import { View, FlatList } from "react-native";
import { MyNotification } from "../../../components";

export default function StudentNotifications() {
  const notificationList = [
    {
      name: "Bisma Shuja",
      message: "Wants to connect with you",
    },
    {
      name: "Maha Tariq ",
      message: "Wants to connect with you",
    },
    {
      name: "Bilal Nasir",
      message: "Wants to connect with you",
    },
    {
      name: "Ashar Shahid",
      message: "Wants to connect with you",
    },
    {
      name: "Mahnoor Aslam",
      message: "Wants to connect with you",
    },
    {
      name: "Noor Ul ain",
      message: "Wants to connect with you",
    },
    {
      name: "Mahnoor Tariq",
      message: "Wants to connect with you",
    },
    {
      name: "Zayan Siddiqui",
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
