const express = require('express');
const router = express.Router();
const { storage } = require('../config/cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const path = require('path');
const fs = require('fs');
const { 
  addBooking, 
  getAllBookings, 
  getUserBookings,
  hideBooking,
  uploadReport, 
  getReport,
  deleteBooking
} = require('../controllers/bookingController');

router.post('/add', addBooking);
router.get('/all', getAllBookings);
router.get('/user', getUserBookings);
router.post('/:id/hide', hideBooking);
router.post('/:id/upload', upload.single('report'), uploadReport);
router.get('/:id/report', getReport);
router.delete('/:id', deleteBooking);

module.exports = router;

