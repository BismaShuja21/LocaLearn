const express = require('express'); //this returns a function
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const cors = require('cors');


const app = express(); //here we invoke the function to create an express app
app.use(express.json());


const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

<<<<<<< HEAD

=======
>>>>>>> 93031fb05ca6bb11ab1235a2cc96e91e1fd30c80
const dbURI = 'mongodb+srv://sanamaryam:testdatabase@cluster0.hv7uxwm.mongodb.net/Project?retryWrites=true&w=majority';
// mongoose.connect(dbURI);
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  app.set('view engine', 'ejs')
  app.listen(3000);


  app.post('/register', async (req, res) => {
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
  
  

  app.post('/login', async (req, res) => {
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
  
