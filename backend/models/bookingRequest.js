const mongoose = require('mongoose');

const bookingRequestSchema = new mongoose.Schema({
  tutorid: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  studentid: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

const BookingRequest = mongoose.model('BookingRequest', bookingRequestSchema);

module.exports = BookingRequest;
