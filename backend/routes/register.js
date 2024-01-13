const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();


router.post('/', async (req, res) => {
    try {
      const { email, password, userType } = req.body; 
     
      // Check if user already exists with the same email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
        userType,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Return a success response
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(`Error registering user: ${req.body}` , error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;
