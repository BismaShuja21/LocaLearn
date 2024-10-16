import React, { useState, useEffect } from "react";
import { GiftedChat, InputToolbar, Bubble } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LightTheme, DarkTheme } from "../../../theme/theme";
import { useSelector } from "react-redux";
import { View } from "react-native";

export default function TutorChat() {
  const [messages, setMessages] = useState([]);
  const theme = useSelector((state) => state.theme.theme);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;

  const teacherID = "t1";
  const studentID = "s1"; // Student ID

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

      // Add to teacher's sent and student's received
      msgs.teacher.sent.push(message);
      msgs.student.received.push(message);

      // Save updated messages
      await AsyncStorage.setItem("teacherSide", JSON.stringify(msgs.teacher));
      await AsyncStorage.setItem("studentSide", JSON.stringify(msgs.student));

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

        if (teacherMessages) {
          const parsedTeacherMessages = JSON.parse(teacherMessages);
          allMessages = allMessages.concat(parsedTeacherMessages.sent); // Add teacher's sent messages
        }

        if (studentMessages) {
          const parsedStudentMessages = JSON.parse(studentMessages);
          allMessages = allMessages.concat(parsedStudentMessages.sent); // Add student's sent messages
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

  // Custom InputToolbar style based on the theme
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
        user={{ _id: teacherID, name: "Teacher" }}
        renderBubble={renderBubble} // Apply custom bubble style
        renderInputToolbar={renderInputToolbar} // Apply custom toolbar style
      />
    </View>
  );
}
// import React, { useState, useEffect } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function TutorChat() {
//   const [messages, setMessages] = useState([]);

//   // Example teacher and student IDs (replace with real ones)
//   const teacherID = "t1";
//   const studentID = "s1";

//   // Sample structure for message storage
//   const msgs = {
//     teacher: {
//       id: teacherID,
//       sent: [],
//       received: [],
//     },
//     student: {
//       id: studentID,
//       sent: [],
//       received: [],
//     },
//   };

//   // Function to send and store the message
//   const onSend = async (newMessages = []) => {
//     try {
//       // Add the message to teacher's sent and student's received
//       const message = newMessages[0]; // GiftedChat sends messages in an array

//       // Push to teacher's sent
//       msgs.teacher.sent.push(message);
//       // Push to student's received
//       msgs.student.received.push(message);

//       // Save both teacher's and student's messages to AsyncStorage
//       await AsyncStorage.setItem("teacherSide", JSON.stringify(msgs.teacher));
//       await AsyncStorage.setItem("studentSide", JSON.stringify(msgs.student));

//       // Update the local state to display the new message in GiftedChat
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, newMessages)
//       );
//     } catch (error) {
//       console.error("Error saving messages:", error);
//     }
//   };

//   useEffect(() => {
//     const loadMessages = async () => {
//       try {
//         const storedMessages = await AsyncStorage.getItem("teacherSide");
//         if (storedMessages) {
//           const parsedMessages = JSON.parse(storedMessages);
//           setMessages(parsedMessages.sent.reverse()); // Show sent messages
//         }
//       } catch (error) {
//         console.error("Error loading messages:", error);
//       }
//     };

//     loadMessages();
//   }, []);
//   // const fetchInitialMessages = async () => {
//   //   try {
//   //     const response = await fetch('http://192.168.43.142:3000/initial-messages');
//   //     const data = await response.json();

//   //     if (data.messages) {
//   //       // Update the local state with initial messages

//   //       setMessages(data.messages.reverse());
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching initial messages:', error.message);
//   //   }
//   // };

//   // const fetchInitialMessages = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       `http://10.57.7.170:3000/initial-messages?chatID=${chatID}`
//   //     );
//   //     const data = await response.json();

//   //     if (data.messages) {
//   //       const formattedMsgs = data.messages.map((message) => ({
//   //         _id: message._id.toString(),
//   //         text: message.text,
//   //         createdAt: new Date(message.timestamp), // Convert timestamp to Date object
//   //         user: {
//   //           _id: message.senderId.toString(),
//   //           name: "You", // Update this if you have a way to determine the name
//   //           avatar: "https://example.com/avatar.png", // Update this if you have user avatars
//   //         },
//   //       }));
//   //       // Update the local state with initial messages
//   //       console.log(formattedMsgs);
//   //       setMessages(formattedMsgs.reverse());
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching initial messages:", error.message);
//   //   }
//   // };

//   // const socket = io("http://10.57.7.170:3000", {
//   //   transports: ["websocket"],
//   // });

//   // socket.connect();

//   // socket.on("connect_error", (error) => {
//   //   console.error("WebSocket connection error:", error.message);
//   // });

//   // useEffect(() => {
//   //   fetchInitialMessages();

//   //   socket.on("chat message", (newMessage) => {
//   //     setMessages((prevMessages) =>
//   //       GiftedChat.append(prevMessages, newMessage)
//   //     );
//   //   });

//   //   return () => {
//   //     socket.off("chat message");
//   //     socket.disconnect();
//   //   };
//   // }, []);

//   // const onSend = (newMessages = []) => {
//   //   const { _id, text, createdAt, user } = newMessages[0];

//   //   // Emit the 'send message' event with the required information
//   //   socket.emit("send message", {
//   //     chatID: chatID, // Pass the chatID you want to send the message to
//   //     senderID: userID, // Pass the senderID (userID)
//   //     text: text, // Pass the text of the message
//   //   });

//   //   socket.emit("chat message", newMessages[0]);
//   // };
//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(newMessages) => onSend(newMessages)}
//       user={{ _id: teacherID, name: "Teacher" }}
//     />
//   );
// }
