const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const doctorController = require('../controllers/doctor.controller.js');

// @route   GET api/doctors
// @desc    Get all doctors
// @access  Private
router.get('/', auth, doctorController.findAll);

// @route   GET api/doctors/:id
// @desc    Get doctor by ID
// @access  Private
router.get('/:id', auth, doctorController.findOne);

module.exports = router;
