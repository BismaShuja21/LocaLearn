const express = require('express');
const router = express.Router();
const Chat = require('../models/chat');


// Server-side endpoint to check or create a chat
router.post('/checkOrCreateChat', async (req, res) => {
    const { tutorID, studentID } = req.body;
  
    // Check if a chat exists
    const existingChat = await Chat.findOne({ tutorID, studentID });
  
    if (existingChat) {
      return res.json({ chat: existingChat });
    }
  
    // Create a new chat
    const newChat = new Chat({ tutorID, studentID, messages: [] });
    await newChat.save();
  
    return res.json({ chat: newChat });
  });
  

  router.post('/send-message', async (req, res) => {
    try {
      const { chatID, senderID, text } = req.body;
  
      // Find the chat based on chatID
      const chat = await Chat.findById(chatID);
  
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
  
      // Add the new message to the chat
      chat.messages.push({
        senderId: senderID,
        text: text,
      });
  
      // Save the updated chat
      await chat.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;
