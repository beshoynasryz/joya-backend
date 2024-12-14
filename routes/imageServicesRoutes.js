// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  uploadImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
} = require('../controllers/imageServicesController');

// Create a new image
router.post('/', upload.single('image'), uploadImage);

// Get all images
router.get('/', getAllImages);

// Get a single image by ID
router.get('/:id', getImageById);

// Update an image
router.put('/:id', upload.single('image'), updateImage);

// Delete an image
router.delete('/:id', deleteImage);

module.exports = router;
