import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

export default function TutorChat({ route }) {
  const userID = route.params.userID; 
  const chatID = route.params.chatID;
  const [messages, setMessages] = useState([]);
  console.log(userID);

  // const fetchInitialMessages = async () => {
  //   try {
  //     const response = await fetch('http://192.168.43.142:3000/initial-messages');
  //     const data = await response.json();
  
  //     if (data.messages) {
  //       // Update the local state with initial messages

  //       setMessages(data.messages.reverse());
  //     }
  //   } catch (error) {
  //     console.error('Error fetching initial messages:', error.message);
  //   }
  // };


  const fetchInitialMessages = async () => {
    try {
      const response = await fetch(`http://192.168.43.143:3000/initial-messages?chatID=${chatID}`);
      const data = await response.json();
  
      if (data.messages) {
        const formattedMsgs = data.messages.map((message) => ({
          _id: message._id.toString(),
          text: message.text,
          createdAt: new Date(message.timestamp), // Convert timestamp to Date object
          user: {
            _id: message.senderId.toString(),
            name: 'You', // Update this if you have a way to determine the name
            avatar: 'https://example.com/avatar.png', // Update this if you have user avatars
          },
        }));
        // Update the local state with initial messages
        console.log(formattedMsgs);
        setMessages(formattedMsgs.reverse());
      }
    } catch (error) {
      console.error('Error fetching initial messages:', error.message);
    }
  };
  
  

  const socket = io('http://192.168.43.143:3000', {
    transports: ['websocket'],
  });

  socket.connect();

  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error.message);
  });

  useEffect(() => {
    fetchInitialMessages();
   
    socket.on('chat message', (newMessage) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
    });

    return () => {
      socket.off('chat message');
      socket.disconnect();
    };
  }, []);

  const onSend = (newMessages = []) => {

    const { _id, text, createdAt, user } = newMessages[0];

  // Emit the 'send message' event with the required information
  socket.emit('send message', {
    chatID: chatID,      // Pass the chatID you want to send the message to
    senderID: userID,  // Pass the senderID (userID)
    text: text,          // Pass the text of the message
  });

    socket.emit('chat message', newMessages[0]);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{ _id: userID, name: 'You' }}
    />
  );
};

