import React from "react";
import { FlatList, View } from "react-native";
import { MyText, ChatCard } from "../../../components";
import { useNavigation } from "@react-navigation/native";

export default function StudentInbox() {
  const navigation = useNavigation();
  const inboxData = [
    {
      name: "bisma shuja",
      subTitle: "Hey there! I am a science Teacher.",
      onPress: () => {
        navigation.navigate("StudentChat");
      },
    },
    {
      name: "Umme Hani",
      subTitle: "Hey there! I am a science Teacher.",
      onPress: () => {},
    },
    {
      name: "Sana Maryam",
      subTitle: "Hey there! I am a science Teacher.",
      onPress: () => {},
    },
    {
      name: "Erica Robin",
      subTitle: "Hey there! I am a science Teacher.",
      onPress: () => {},
    },
    {
      name: "Natasha Romanoff",
      subTitle: "Hey there! I am a science Teacher.",
      onPress: () => {},
    },
    {
      name: "Rachel Green",
      subTitle: "Hey there! I am a science Teacher.",
      onPress: () => {},
    },
    {
      name: "Taylor Swift",
      subTitle: "Hey there! I am a science Teacher.",
      onPress: () => {},
    },
    {
      name: "Monica geller",
      subTitle: "Hey there! I am a science Teacher.",
      onPress: () => {},
    },
    {
      name: "Chandler Bing",
      subTitle: "Hey there! I am a science Teacher.",
      onPress: () => {},
    },
    {
      name: "Ross geller",
      subTitle: "Hey there! I am a science Teacher.",
      onPress: () => {},
    },
    {
      name: "Joey Tribbiani",
      subTitle: "Hey there! I am a science Teacher.",
      onPress: () => {},
    },
  ];

  const renderChatCard = ({ item }) => (
    <ChatCard
      name={item.name}
      subTitle={item.subTitle}
      onPress={item.onPress}
    />
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#060635",
        width: "100%",
        height: "100%",
        alignItems: "center",
        padding: 5,
      }}
    >
      <MyText weight={"600"} size={20} textColor={"white"}>
        INBOX
      </MyText>
      <FlatList
        data={inboxData}
        renderItem={renderChatCard}
        keyExtractor={(item) => item.name} // Use a unique key for each
        style={{ margin: 10, borderRadius: 40, marginBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
