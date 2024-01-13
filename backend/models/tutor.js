const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String },
  subjects: { type: [String] },
  rating: { type: Number },
  qualification: { type: String },
  experience: { type: Number },
  availability: { type: String },
  tutorPreference: { type: String, enum: ['student_house', 'tutor_house'] },
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
