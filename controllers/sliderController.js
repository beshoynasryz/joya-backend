const asyncHandler = require('express-async-handler');
const Slider = require('../models/sliderModel');
const path = require('path');

// Create a new Slider
const createSlider = asyncHandler(async (req, res) => {
  const { name, url } = req.body;

  // Handle image upload (if provided)
  const image = req.file ? `/images/${req.file.filename}` : null;

  // Create a new slider
  const slider = new Slider({
    name,
    url,
    image,
  });

  // Save the slider to the database
  const createdSlider = await slider.save();

  res.status(201).json(createdSlider);
});

// Get all Sliders
const getAllSliders = asyncHandler(async (req, res) => {
  const sliders = await Slider.find();
  res.status(200).json(sliders);
});

// Get a specific Slider by ID
const getSliderById = asyncHandler(async (req, res) => {
  const slider = await Slider.findById(req.params.id);

  if (!slider) {
    res.status(404);
    throw new Error('Slider not found');
  }

  res.status(200).json(slider);
});

// Update a Slider
const updateSlider = asyncHandler(async (req, res) => {
  const { name, url } = req.body;

  // Handle image upload (if provided)
  const image = req.file ? `/images/${req.file.filename}` : null;

  // Find the slider by ID
  const slider = await Slider.findById(req.params.id);

  if (!slider) {
    res.status(404);
    throw new Error('Slider not found');
  }

  // Update fields with new data (or keep the existing data)
  slider.name = name || slider.name;
  slider.url = url || slider.url;
  slider.image = image || slider.image;

  // Save the updated slider
  const updatedSlider = await slider.save();

  res.status(200).json(updatedSlider);
});

// Delete a Slider
const deleteSlider = asyncHandler(async (req, res) => {
  const slider = await Slider.findByIdAndDelete(req.params.id);

  if (!slider) {
    res.status(404);
    throw new Error('Slider not found');
  }

  res.status(200).json({ message: 'Slider deleted successfully' });
});

module.exports = {
  createSlider,
  getAllSliders,
  getSliderById,
  updateSlider,
  deleteSlider,
};
