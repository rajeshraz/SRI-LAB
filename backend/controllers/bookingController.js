const Booking = require('../models/Booking');
const path = require('path');
const fs = require('fs');

exports.addBooking = async (req, res) => {
  try {
    const { name, gender, age, symptoms, mobileNumber, address } = req.body;
    const newBooking = new Booking({ name, gender, age, symptoms, mobileNumber, address });
    await newBooking.save();
    res.status(201).json({ success: true, message: "Booking added successfully!", data: newBooking });
  } catch (error) {
    console.error("Error adding booking:", error);
    res.status(500).json({ success: false, message: "Error adding booking: " + error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Error fetching bookings: " + error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ hiddenByUser: false }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ success: false, message: "Error fetching user bookings: " + error.message });
  }
};

exports.hideBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { hiddenByUser: true }, { new: true });
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Booking hidden successfully" });
  } catch (error) {
    console.error("Error hiding booking:", error);
    res.status(500).json({ success: false, message: "Error hiding booking: " + error.message });
  }
};
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Delete the associated report file if it exists
    if (booking.reportPath) {
      const fullPath = path.resolve(booking.reportPath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    // Delete the booking from the database
    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Booking and associated report deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Error deleting booking: " + error.message });
  }
};

exports.uploadReport = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    // Save Cloudinary URL and public_id
    booking.reportPath = req.file.path; // Cloudinary URL
    booking.reportName = req.file.originalname;
    booking.reportMimeType = req.file.mimetype;
    booking.reportCloudinaryId = req.file.filename; // Optional: for future deletion
    await booking.save();
    res.status(200).json({ success: true, message: "Report uploaded successfully", url: req.file.path });
  } catch (error) {
    console.error("Error uploading report:", error);
    res.status(500).json({ success: false, message: "Error uploading report: " + error.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || !booking.reportPath) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    // Redirect to Cloudinary URL
    return res.redirect(booking.reportPath);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ success: false, message: "Error fetching report: " + error.message });
  }
};

