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

//connect to mongodb
const dbURI = 'mongodb+srv://sanamaryam:testdatabase@cluster0.hv7uxwm.mongodb.net/Project?retryWrites=true&w=majority';
// mongoose.connect(dbURI);
mongoose.connect(dbURI)
  .then(() => {
    // app.listen(3000);
    app.listen(3000, 'localhost', (error) => {
        if (error) {
          console.error('Error starting server:', error);
        } else {
          console.log('Listening for requests on port 3000');
        }
      });
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



  app.post('/register', (req, res) => {
   npx 
    const newUser = new User(req.body);

    newUser.save()
        .then((result) => {
          res.status(201).json({ message: 'User registered successfully' });
        })
        .catch((error) => {
          console.error('Error registering user:', error);
          res.status(500).json({ error: 'Internal server error' });        })
})

  // app.post('/register', async (req, res) => {
  //   // console.log("SignUp request Received")
  //   try {
  //     const { email, password, userType } = req.body;
  
  //     // Check if user already exists with the same email
  //     const existingUser = await User.findOne({ email });
  //     if (existingUser) {
  //       return res.status(400).json({ error: 'User with this email already exists' });
  //     }
  
  //     // Hash the password before saving it to the database
  //     const hashedPassword = await bcrypt.hash(password, 10);
  
  //     // Create a new user
  //     const newUser = new User({
  //       email,
  //       password: hashedPassword,
  //       userType,
  //     });
  
  //     // Save the user to the database
  //     await newUser.save();
  
  //     // Return a success response
  //     res.status(201).json({ message: 'User registered successfully' });
  //   } catch (error) {
  //     console.error(`Error registering user: ${req.body}` , error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });
  