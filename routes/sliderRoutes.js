const express = require('express');
const router = express.Router();
const { createSlider, getAllSliders, getSliderById, updateSlider, deleteSlider } = require('../controllers/sliderController');
const upload = require('../middleware/upload');

// Routes for handling Slider CRUD operations
router.post('/', upload.single('image'), createSlider); // Create Slider
router.get('/', getAllSliders); // Get all Sliders
router.get('/:id', getSliderById); // Get a specific Slider by ID
router.put('/:id', upload.single('image'), updateSlider); // Update a Slider
router.delete('/:id', deleteSlider); // Delete a Slider

module.exports = router;
