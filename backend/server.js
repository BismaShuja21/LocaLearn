const express = require('express'); //this returns a function
const mongoose = require('mongoose');


const app = express(); //here we invoke the function to create an express app

//connect to mongodb
const dbURI = 'mongodb+srv://sanamaryam:testdatabase@cluster0.hv7uxwm.mongodb.net/Project?retryWrites=true&w=majority';
// mongoose.connect(dbURI);
mongoose.connect(dbURI)
  .then(() => {
    app.listen(3000);
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });