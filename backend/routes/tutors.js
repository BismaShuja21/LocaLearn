const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');

// Route to get all tutors
router.get('/all-tutors', async (req, res) => {
  try {
    // Fetch all tutors from the database
    const tutors = await Tutor.find();

    // Send the list of tutors as a JSON response
    res.json(tutors);
  } catch (error) {
    // Handle errors
    console.error('Error getting tutors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/profileSetup', async (req, res) => {
  try {
    console.log(req.body);
    // Create a new tutor document
    const newTutor = new Tutor({
      userid: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      qualification: req.body.qualification,
      availability: req.body.availability,
      description: req.body.description,
      experience: req.body.experience,
      tutorPreference: req.body.tutoringPreferences,
    });

    // Save the tutor document to the database
    await newTutor.save();

    res.status(201).json({ message: 'Tutor profile created successfully' });
  } catch (error) {
    console.error('Error creating tutor profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
