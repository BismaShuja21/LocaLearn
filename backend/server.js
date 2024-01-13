const express = require('express'); //this returns a function
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const User = require('./models/user');
const cors = require('cors');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');


const app = express(); //here we invoke the function to create an express app
app.use(express.json());


const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

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


app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);

  