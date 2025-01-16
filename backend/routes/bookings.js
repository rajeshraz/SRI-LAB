const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { 
  addBooking, 
  getAllBookings, 
  getUserBookings,
  hideBooking,
  uploadReport, 
  getReport,
  deleteBooking // Add this new controller function
} = require('../controllers/bookingController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/add', addBooking);
router.get('/all', getAllBookings);
router.get('/user', getUserBookings);
router.post('/:id/hide', hideBooking);
router.post('/:id/upload', upload.single('report'), uploadReport);
router.get('/:id/report', getReport);
router.delete('/:id', deleteBooking); // Add this new route for deletion

module.exports = router;

