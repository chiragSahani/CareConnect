const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller.js');

// @route   GET api/doctors
// @desc    Get all doctors
// @access  Public
router.get('/', doctorController.findAll);

// @route   GET api/doctors/:id
// @desc    Get doctor by ID
// @access  Public
router.get('/:id', doctorController.findOne);

module.exports = router;
