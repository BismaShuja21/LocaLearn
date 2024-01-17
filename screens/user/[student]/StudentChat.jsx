import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";

export default function StudentChat({ route }) {
  const userID = route.params.userID;
  const chatID = route.params.chatID;
  const [messages, setMessages] = useState([]);
  // console.log(userID);

  const convo = [
    {
      _id: 1,
      text: "Hi, this is Hafsa..",
      createdAt: new Date(),
      user: {
        _id: userID,
        name: "Hafsa",
      },
    },
    {
      _id: 2,
      text: "I wanted to enquire about tuition",
      createdAt: new Date(),
      user: {
        _id: userID,
        name: "Hafsa",
      },
    },
    {
      _id: 3,
      text: "Hello!!, I am Ayesha",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Ayesha",
      },
    },
    {
      _id: 4,
      text: "Feel free to ask any question about tuition.",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Ayesha",
      },
    },
    {
      _id: 5,
      text: "I need tuition for Chemistry of grade 8th.",
      createdAt: new Date(),
      user: {
        _id: userID,
        name: "Hafsa",
      },
    },
  ];

  useEffect(() => {
    const conversation = convo.reverse();
    setMessages(conversation);
  }, []);

  // const fetchInitialMessages = async () => {
  //   try {
  //     const response = await fetch(`http://10.200.253.210:3000/initial-messages?chatID=${chatID}`);
  //     const data = await response.json();

  //     if (data.messages) {
  //       const formattedMsgs = data.messages.map((message) => ({
  //         _id: message._id.toString(),
  //         text: message.text,
  //         createdAt: new Date(message.timestamp), // Convert timestamp to Date object
  //         user: {
  //           _id: message.senderId.toString(),
  //           name: 'You', // Update this if you have a way to determine the name
  //           avatar: 'https://example.com/avatar.png', // Update this if you have user avatars
  //         },
  //       }));
  //       // Update the local state with initial messages
  //       console.log(formattedMsgs);
  //       setMessages(formattedMsgs.reverse());
  //     }
  //   } catch (error) {
  //     console.error('Error fetching initial messages:', error.message);
  //   }
  // };

  // const socket = io('http://10.200.253.210:3000', {
  //   transports: ['websocket'],
  // });

  // socket.connect();

  // socket.on('connect_error', (error) => {
  //   console.error('WebSocket connection error:', error.message);
  // });

  // useEffect(() => {
  //   fetchInitialMessages();

  //   socket.on('chat message', (newMessage) => {
  //     setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
  //   });

  //   return () => {
  //     socket.off('chat message');
  //     socket.disconnect();
  //   };
  // }, []);

  // const onSend = (newMessages = []) => {

  //   const { _id, text, createdAt, user } = newMessages[0];

  // // Emit the 'send message' event with the required information
  // socket.emit('send message', {
  //   chatID: chatID,      // Pass the chatID you want to send the message to
  //   senderID: userID,  // Pass the senderID (userID)
  //   text: text,          // Pass the text of the message
  // });

  //   socket.emit('chat message', newMessages[0]);
  // };

  const onSend = (newMessages = []) =>
    setMessages(GiftedChat.append(messages, newMessages));

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{ _id: userID, name: "You" }}
    />
  );
}
