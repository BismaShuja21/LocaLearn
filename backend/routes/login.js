const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();



router.post('/', async (req, res) => {
    const { email, password } = req.body;

  
    // Find the user by email
    const user = await User.findOne({ email });
  
    if (user) {
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        // Authentication successful
        res.json({ success: true, user });
      } else {
        // Authentication failed (password mismatch)
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      // Authentication failed (user not found)
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

module.exports = router;
