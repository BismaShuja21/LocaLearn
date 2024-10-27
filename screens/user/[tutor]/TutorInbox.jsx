import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { MyText, ChatCard } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function TutorInbox({ route }) {
  const userID = route.params.userID;
  console.log("UserID:", userID);
  const [tutorData, setTutorData] = useState();

  const navigation = useNavigation();
  // const [inboxData, setInboxData] = useState([]);
  const inboxData = [
    {
      id: 1,
      name: "Umme Hani",
      subTitle: "8th Grade Student",
      onPress: () => {
        navigation.navigate("TutorChat");
      },
    },
  ];

  // useEffect(() => {
  //   const fetchTutor = async () => {
  //     try {
  //       console.log("Fetching tutor for userID:", userID);

  //       // Make an API request to get the tutor instance for the specified userID
  //       const response = await axios.get(
  //         `http://10.57.16.248:3000/tutor/getTutor?userID=${userID}`
  //       );
  //       console.log("Response from server:", response.data);

  //       // Assuming the server returns the tutor instance
  //       const tutor = response.data;

  //       // Do something with the tutor instance, for example, set it in the state
  //       setTutorData(tutor);
  //     } catch (error) {
  //       console.error("Error fetching tutor:", error);
  //     }
  //   };

  //   fetchTutor();
  // }, [userID]);

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       console.log("Fetching chats for userID:", tutorData._id);

  //       const response = await axios.get(
  //         `http://10.57.16.248:3000/tutor/getChats?userID=${tutorData._id}`
  //       );
  //       console.log("Response from server:", response.data);

  //       setInboxData(response.data);
  //       console.log("Message1", response.data[0]._id);
  //     } catch (error) {
  //       console.error("Error fetching chats:", error);
  //     }
  //   };

  //   fetchChats();
  // }, [userID]);

  const renderChatCard = ({ item }) => (
    <ChatCard
      name={item.name}
      subTitle={item.subTitle}
      onPress={item.onPress}
      // name={"One Time"}
      // subTitle={item.messages[0].text}
      // onPress={() => navigation.navigate("TutorChat")}
    />
  );

  console.log("Rendering TutorInbox component with inboxData:", inboxData);

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
        keyExtractor={(item) => item._id} // Use a unique key for each
        style={{ margin: 10, borderRadius: 40, marginBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
