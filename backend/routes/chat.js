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
  

module.exports = router;
