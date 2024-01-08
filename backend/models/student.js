const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: { type: Number },
  grade: { type: String },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
