const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  tutorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' },
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      timestamp: Date
    }
  ]});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
