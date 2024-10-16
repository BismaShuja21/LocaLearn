const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  tutorID: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      timestamp: { type: Date, default: Date.now }, // Default value is set to the current date and time
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
