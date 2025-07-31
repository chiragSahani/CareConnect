const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { mockDoctors } = require('../data/mockData');

// @route   GET api/doctors
// @desc    Get all doctors
// @access  Private
router.get('/', auth, (req, res) => {
  res.json(mockDoctors);
});

// @route   GET api/doctors/:id
// @desc    Get doctor by ID
// @access  Private
router.get('/:id', auth, (req, res) => {
  const doctor = mockDoctors.find(doc => doc.id === req.params.id);
  if (!doctor) {
    return res.status(404).json({ msg: 'Doctor not found' });
  }
  res.json(doctor);
});

module.exports = router;
