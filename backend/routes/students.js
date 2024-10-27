const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Chat = require("../models/chat");

router.post("/profileSetup", async (req, res) => {
  try {
    console.log(req.body);
    // Create a new tutor document
    const newStudent = new Student({
      userid: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: parseInt(req.body.age, 10),
      grade: req.body.grade,
    });

    // Save the tutor document to the database
    await newStudent.save();

    res.status(201).json({ message: "Student profile created successfully" });
  } catch (error) {
    console.error("Error creating Student profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getChats", async (req, res) => {
  try {
    const studentID = req.query.studentID;

    // Find chats where studentID is equal to the provided studentID
    const chats = await Chat.find({ studentID });

    res.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// In your routes or controllers
router.get("/getStudent", async (req, res) => {
  try {
    const userID = req.query.userID;

    // Find the student where userid is equal to the provided userID
    const student = await Student.findOne({ userid: userID });

    if (!student) {
      return res.json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/getStudentEdit", async (req, res) => {
  try {
    const userID = req.query.userID;

    // Find the student where userid is equal to the provided userID
    const student = await Student.findOne({ _id: userID });

    if (!student) {
      return res.json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/fetchUserID/:studentID", async (req, res) => {
  try {
    const { studentID } = req.params;

    // Assuming studentID is a valid ObjectId in MongoDB
    const student = await Student.findOne({ _id: studentID });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Assuming the 'userid' field is the one you want to fetch
    const userID = student.userid;

    res.json({ userID });
  } catch (error) {
    console.error("Error fetching userID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
