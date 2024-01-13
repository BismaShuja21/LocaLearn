const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');

// Route to get all tutors
router.get('/', async (req, res) => {
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

module.exports = router;
