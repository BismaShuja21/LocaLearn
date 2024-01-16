const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');
const Chat = require('../models/chat');

// Assuming you have a route like this in your server
router.get('/getTutor', async (req, res) => {
  try {
    const { userID } = req.query;

    // Assuming you have a Tutor model defined
    const tutor = await Tutor.findOne({ userid: userID });

    if (!tutor) {
      return res.status(404).json({ error: 'Tutor not found' });
    }

    res.json(tutor);
  } catch (error) {
    console.error('Error fetching tutor:', error);
    res.status(500).send('Internal Server Error');
  }
});



// In your routes or controllers

router.get('/getTutorEdit', async (req, res) => {
  try {
    const userID = req.query.userID;

    // Find the tutor where userid is equal to the provided userID
    const tutor = await Tutor.findOne({ userid: userID });

    if (!tutor) {
      return res.json({ success: false, message: 'Tutor not found' });
    }

    res.json({ success: true, tutor });
  } catch (error) {
    console.error('Error fetching tutor:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
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
      location: req.body.location,
      });

    // Save the tutor document to the database
    await newTutor.save();

    res.status(201).json({ message: 'Tutor profile created successfully' });
  } catch (error) {
    console.error('Error creating tutor profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






router.get('/tutors-nearby', async (req, res) => {
  try {
    const { longitude, latitude } = req.query;



    // Convert coordinates to numbers
    const userLocation = {
      type: 'Point',
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };

    // Use $geoNear aggregation to find tutors within 5 km
    const nearbyTutors = await Tutor.aggregate([
      {
        $geoNear: {
          near: userLocation,
          distanceField: 'distance',
          maxDistance: 10000, // 5 km in meters
          spherical: true,
        },
      },
    ]);


    res.json(nearbyTutors);
  } catch (error) {
    console.error('Error finding nearby tutors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Assuming you have a route like this in your server
router.get('/tutor/getChats', async (req, res) => {
  try {
    const { tutorID } = req.query;

    // Assuming you have a Chat model defined
    const chats = await Chat.find({ tutorID });

    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
