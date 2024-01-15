const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  description: { type: String },
  subjects: { type: [String] },
  rating: { type: Number },
  qualification: { type: [String] },
  experience: { type: String },
  availability: { type: [String] },
  tutorPreference: { type: [String] },
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
