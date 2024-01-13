const express = require('express'); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const addTutorRoute = require('./routes/add-tutor');



const app = express();
app.use(express.json());


const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const dbURI = 'mongodb+srv://sanamaryam:testdatabase@cluster0.hv7uxwm.mongodb.net/Project?retryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.set('view engine', 'ejs')
app.listen(3000);


// app.get('/add-tutor', async (req, res) => {
//   try {
//     const existingUserEmail = "sana123@gmail.com";

//     // Find the existing user in the User collection
//     const existingUser = await User.findOne({ email: existingUserEmail });

//     if (existingUser) {
//       // Check if a Student instance already exists for the user
//       const existingTutor = await Tutor.findOne({ userid: existingUser._id });

//       if (existingTutor) {
//         console.error('A Tutor instance already exists for this user');
//         res.status(400).json({ error: 'A Tutor instance already exists for this user' });
//       } else {
//         // Create a new Tutor instance associated with the existing user
//         const newTutor = new Tutor({
//           userid: existingUser._id, // Associate with the user by ObjectId
//           description: "Sample description",
//           subjects: ["Math", "Science"],
//           rating: 4.5,
//           qualification: "Ph.D. in Computer Science",
//           experience: 3,
//           availability: "Weekdays",
//           tutorPreference: "student_house",
//         });

//         // Save the new Tutor instance to the database
//         const savedTutor = await newTutor.save();

//         if (savedTutor) {
//           console.log('Dummy Tutor data added successfully:', savedTutor);
//           res.status(201).json({ message: 'Dummy Tutor data added successfully' });
//         } else {
//           console.error('Error saving Tutor data');
//           res.status(500).json({ error: 'Internal Server Error' });
//         }
//       }
//     } else {
//       console.error('User not found with email:', existingUserEmail);
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error adding dummy Tutor data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/add-tutor', addTutorRoute)

  