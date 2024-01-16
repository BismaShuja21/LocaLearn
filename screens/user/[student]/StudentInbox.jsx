import { FlatList, View } from "react-native";
import { MyText, ChatCard } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import axios from "axios";



export default function StudentInbox({ route }) {
  const userID = route.params.userID;
  console.log("UserID:", userID);

  const navigation = useNavigation();
  const [inboxData, setInboxData] = useState([]);

  // const inboxData = [
  //   {
  //     name: "bisma shuja",
  //     subTitle: "Hey there! I am a science Teacher.",
  //     onPress: () => {
  //       navigation.navigate("StudentChat");
  //     },
  //   },
  //   {
  //     name: "Umme Hani",
  //     subTitle: "Hey there! I am a science Teacher.",
  //     onPress: () => {},
  //   },
  //   {
  //     name: "Sana Maryam",
  //     subTitle: "Hey there! I am a science Teacher.",
  //     onPress: () => {},
  //   },
  //   {
  //     name: "Erica Robin",
  //     subTitle: "Hey there! I am a science Teacher.",
  //     onPress: () => {},
  //   },
  //   {
  //     name: "Natasha Romanoff",
  //     subTitle: "Hey there! I am a science Teacher.",
  //     onPress: () => {},
  //   },
  //   {
  //     name: "Rachel Green",
  //     subTitle: "Hey there! I am a science Teacher.",
  //     onPress: () => {},
  //   },
  //   {
  //     name: "Taylor Swift",
  //     subTitle: "Hey there! I am a science Teacher.",
  //     onPress: () => {},
  //   },
  //   {
  //     name: "Monica geller",
  //     subTitle: "Hey there! I am a science Teacher.",
  //     onPress: () => {},
  //   },
  //   {
  //     name: "Chandler Bing",
  //     subTitle: "Hey there! I am a science Teacher.",
  //     onPress: () => {},
  //   },
  //   {
  //     name: "Ross geller",
  //     subTitle: "Hey there! I am a science Teacher.",
  //     onPress: () => {},
  //   },
  //   {
  //     name: "Joey Tribbiani",
  //     subTitle: "Hey there! I am a science Teacher.",
  //     onPress: () => {},
  //   },
  // ];





  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log("Fetching chats for userID:", userID);

        const response = await axios.get(`http://192.168.43.143:3000/student/getChats?studentID=${userID}`);
        console.log("Response from server:", response.data);

        setInboxData(response.data);
        // console.log(response.data[0]._id);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [userID]);

  const renderChatCard = ({ item }) => (
    <ChatCard
      name={"Ayesha Khan"}
      subTitle={item.messages[0]?.text || "No messages"}
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
