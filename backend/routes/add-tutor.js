const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Tutor = require('../models/tutor');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const existingUserEmail = "User2";
  
      // Find the existing user in the User collection
      const existingUser = await User.findOne({ email: existingUserEmail });
  
      if (existingUser) {
        // Check if a Student instance already exists for the user
        const existingTutor = await Tutor.findOne({ userid: existingUser._id });
  
        if (existingTutor) {
          console.error('A Tutor instance already exists for this user');
          res.status(400).json({ error: 'A Tutor instance already exists for this user' });
        } else {
          // Create a new Tutor instance associated with the existing user
          const newTutor = new Tutor({
            userid: existingUser._id, // Associate with the user by ObjectId
            description: "Sample description",
            subjects: ["English", "Science"],
            rating: 4.8,
            qualification: "Masters in English",
            experience: 2,
            availability: "Weekdays",
            tutorPreference: "tutor_house",
          });
  
          // Save the new Tutor instance to the database
          const savedTutor = await newTutor.save();
  
          if (savedTutor) {
            console.log('Dummy Tutor data added successfully:', savedTutor);
            res.status(201).json({ message: 'Dummy Tutor data added successfully' });
          } else {
            console.error('Error saving Tutor data');
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }
      } else {
        console.error('User not found with email:', existingUserEmail);
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error adding dummy Tutor data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
 