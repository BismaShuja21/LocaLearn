const express = require('express');
const router = express.Router();
const Student = require('../models/student');


router.post('/profileSetup', async (req, res) => {
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

    res.status(201).json({ message: 'Student profile created successfully' });
  } catch (error) {
    console.error('Error creating Student profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
