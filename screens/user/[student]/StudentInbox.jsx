import { FlatList, View } from "react-native";
import { MyText, ChatCard } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentInbox({ route }) {
  const userID = route.params.userID;
  console.log("UserID:", userID);

  const navigation = useNavigation();
  const [inboxData, setInboxData] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log("Fetching chats for userID:", userID);

        const response = await axios.get(
          `http://10.200.253.210:3000/student/getChats?studentID=${userID}`
        );
        console.log("Response from server:", response.data);

        setInboxData(response.data);
        console.log(response.data[0]._id);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [userID]);

  const renderChatCard = ({ item }) => (
    <ChatCard
      name={"One Time"}
      subTitle={item.messages[0].text}
      onPress={() => navigation.navigate("StudentChat", { chatID: item._id })}
    />
  );

  console.log("Rendering StudentInbox component with inboxData:", inboxData);

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
        keyExtractor={(item) => item._id}
        style={{ margin: 10, borderRadius: 40, marginBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
