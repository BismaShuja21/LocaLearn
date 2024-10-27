import React, { useState, useEffect } from "react";
import { GiftedChat, InputToolbar, Bubble } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LightTheme, DarkTheme } from "../../../theme/theme";
import { useSelector } from "react-redux";
import { View } from "react-native";

export default function StudentChat({ route }) {
  const userID = route.params.userID;
  const chatID = route.params.chatID;
  const [messages, setMessages] = useState([]);
  const theme = useSelector((state) => state.theme.theme);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const teacherID = "t1"; // Assuming teacherID is t1
  const studentID = userID; // Student ID from route

  const onSend = async (newMessages = []) => {
    try {
      const message = newMessages[0];

      // Retrieve existing messages
      const teacherMessages = await AsyncStorage.getItem("teacherSide");
      const studentMessages = await AsyncStorage.getItem("studentSide");

      const msgs = {
        teacher: teacherMessages
          ? JSON.parse(teacherMessages)
          : { id: teacherID, sent: [], received: [] },
        student: studentMessages
          ? JSON.parse(studentMessages)
          : { id: studentID, sent: [], received: [] },
      };

      // Add to student's sent and teacher's received
      msgs.student.sent.push(message);
      msgs.teacher.received.push(message);

      // Save updated messages
      await AsyncStorage.setItem("studentSide", JSON.stringify(msgs.student));
      await AsyncStorage.setItem("teacherSide", JSON.stringify(msgs.teacher));

      // Update local state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );
    } catch (error) {
      console.error("Error saving messages:", error);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const teacherMessages = await AsyncStorage.getItem("teacherSide");
        const studentMessages = await AsyncStorage.getItem("studentSide");

        let allMessages = [];

        if (studentMessages) {
          const parsedStudentMessages = JSON.parse(studentMessages);
          allMessages = allMessages.concat(parsedStudentMessages.sent); // Add student's sent messages
        }

        if (teacherMessages) {
          const parsedTeacherMessages = JSON.parse(teacherMessages);
          allMessages = allMessages.concat(parsedTeacherMessages.sent); // Add teacher's sent messages
        }

        // Sort messages by creation date and update the state
        setMessages(
          allMessages.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    loadMessages();
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: currentTheme.colors.sentChat, // Sent messages (Teacher)
          },
          left: {
            backgroundColor: currentTheme.colors.card, // Received messages (Student)
          },
        }}
        textStyle={{
          right: {
            color: currentTheme.colors.text, // Sent message text color
          },
          left: {
            color: currentTheme.colors.text, // Received message text color
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: currentTheme.colors.card,
          borderTopColor: currentTheme.colors.border,
        }}
        textInputStyle={{
          color: currentTheme.colors.text,
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: currentTheme.colors.background }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ _id: studentID, name: "You" }}
        renderBubble={renderBubble} // Apply custom bubble style
        renderInputToolbar={renderInputToolbar}
      />
    </View>
  );
}

// import React, { useState, useEffect } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function StudentChat({ route }) {
//   const userID = route.params.userID;
//   const chatID = route.params.chatID;
//   const [messages, setMessages] = useState([]);

//   // Fetch teacher's sent messages (student's received messages) from AsyncStorage
//   const loadMessages = async () => {
//     try {
//       // Retrieve stored messages from AsyncStorage
//       const storedMessages = await AsyncStorage.getItem("studentSide");
//       if (storedMessages) {
//         const parsedMessages = JSON.parse(storedMessages);
//         // Display student's received messages
//         setMessages(parsedMessages.received.reverse());
//       }
//     } catch (error) {
//       console.error("Error loading messages:", error);
//     }
//   };

//   // Fetch initial messages when the component mounts
//   useEffect(() => {
//     loadMessages();
//   }, []);

//   const onSend = (newMessages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, newMessages)
//     );
//   };
//   // console.log(userID);

//   // const convo = [
//   //   {
//   //     _id: 1,
//   //     text: "Hi, this is Hafsa..",
//   //     createdAt: new Date(),
//   //     user: {
//   //       _id: userID,
//   //       name: "Hafsa",
//   //     },
//   //   },
//   //   {
//   //     _id: 2,
//   //     text: "I wanted to enquire about tuition",
//   //     createdAt: new Date(),
//   //     user: {
//   //       _id: userID,
//   //       name: "Hafsa",
//   //     },
//   //   },
//   //   {
//   //     _id: 3,
//   //     text: "Hello!!, I am Ayesha",
//   //     createdAt: new Date(),
//   //     user: {
//   //       _id: 2,
//   //       name: "Ayesha",
//   //     },
//   //   },
//   //   {
//   //     _id: 4,
//   //     text: "Feel free to ask any question about tuition.",
//   //     createdAt: new Date(),
//   //     user: {
//   //       _id: 2,
//   //       name: "Ayesha",
//   //     },
//   //   },
//   //   {
//   //     _id: 5,
//   //     text: "I need tuition for Chemistry of grade 8th.",
//   //     createdAt: new Date(),
//   //     user: {
//   //       _id: userID,
//   //       name: "Hafsa",
//   //     },
//   //   },
//   // ];

//   // useEffect(() => {
//   //   const conversation = convo.reverse();
//   //   setMessages(conversation);
//   // }, []);

//   // const fetchInitialMessages = async () => {
//   //   try {
//   //     const response = await fetch(`http://10.57.17.49:3000/initial-messages?chatID=${chatID}`);
//   //     const data = await response.json();

//   //     if (data.messages) {
//   //       const formattedMsgs = data.messages.map((message) => ({
//   //         _id: message._id.toString(),
//   //         text: message.text,
//   //         createdAt: new Date(message.timestamp), // Convert timestamp to Date object
//   //         user: {
//   //           _id: message.senderId.toString(),
//   //           name: 'You', // Update this if you have a way to determine the name
//   //           avatar: 'https://example.com/avatar.png', // Update this if you have user avatars
//   //         },
//   //       }));
//   //       // Update the local state with initial messages
//   //       console.log(formattedMsgs);
//   //       setMessages(formattedMsgs.reverse());
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching initial messages:', error.message);
//   //   }
//   // };

//   // const socket = io('http://10.57.17.49:3000', {
//   //   transports: ['websocket'],
//   // });

//   // socket.connect();

//   // socket.on('connect_error', (error) => {
//   //   console.error('WebSocket connection error:', error.message);
//   // });

//   // useEffect(() => {
//   //   fetchInitialMessages();

//   //   socket.on('chat message', (newMessage) => {
//   //     setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
//   //   });

//   //   return () => {
//   //     socket.off('chat message');
//   //     socket.disconnect();
//   //   };
//   // }, []);

//   // const onSend = (newMessages = []) => {

//   //   const { _id, text, createdAt, user } = newMessages[0];

//   // // Emit the 'send message' event with the required information
//   // socket.emit('send message', {
//   //   chatID: chatID,      // Pass the chatID you want to send the message to
//   //   senderID: userID,  // Pass the senderID (userID)
//   //   text: text,          // Pass the text of the message
//   // });

//   //   socket.emit('chat message', newMessages[0]);
//   // };

//   // const onSend = (newMessages = []) =>
//   //   setMessages(GiftedChat.append(messages, newMessages));

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={onSend}
//       user={{ _id: userID, name: "You" }}
//     />
//   );
// }
