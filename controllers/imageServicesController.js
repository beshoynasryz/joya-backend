// controllers/imageController.js
const asyncHandler = require('express-async-handler');
const Image = require('../models/imageServicesModel');
const fs = require('fs');
const path = require('path');

// @desc    Upload a new image
// @route   POST /api/images
// @access  Public
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image file provided');
  }

  const imagePath = `/images/${req.file.filename}`; // Save relative path

  const newImage = await Image.create({ image: imagePath });

  res.status(201).json({
    success: true,
    data: newImage,
  });
});

// @desc    Get all images
// @route   GET /api/images
// @access  Public
const getAllImages = asyncHandler(async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: images,
  });
});

// @desc    Get a single image by ID
// @route   GET /api/images/:id
// @access  Public
const getImageById = asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    res.status(404);
    throw new Error('Image not found');
  }

  res.status(200).json({
    success: true,
    data: image,
  });
});

// @desc    Update an image
// @route   PUT /api/images/:id
// @access  Public
const updateImage = asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    res.status(404);
    throw new Error('Image not found');
  }

  if (req.file) {
    // Delete the old image file
    const oldImagePath = path.join(__dirname, '..', image.image);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    // Update with the new image file
    image.image = `/images/${req.file.filename}`;
  }

  const updatedImage = await image.save();

  res.status(200).json({
    success: true,
    data: updatedImage,
  });
});

// @desc    Delete an image
// @route   DELETE /api/images/:id
// @access  Public
const deleteImage = asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    res.status(404);
    throw new Error('Image not found');
  }

  // Delete the image file
  const imagePath = path.join(__dirname, '..', image.image);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  await image.remove();

  res.status(200).json({
    success: true,
    message: 'Image deleted successfully',
  });
});

module.exports = {
  uploadImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
};
