const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  symptoms: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  reportPath: { type: String },
  reportName: { type: String },
  reportMimeType: { type: String },
  hiddenByUser: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);

