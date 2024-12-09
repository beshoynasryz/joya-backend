const express = require('express');
const router = express.Router();
const { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty } = require('../controllers/propertyController');
const upload = require('../middleware/upload'); // Assuming you have middleware for handling file uploads

// Create a property
router.post('/', upload.single('imageProperty'), createProperty);

// Get all properties
router.get('/', getAllProperties);

// Get a specific property by ID
router.get('/:id', getPropertyById);

// Update a property
router.put('/:id', upload.single('imageProperty'), updateProperty);

// Delete a property
router.delete('/:id', deleteProperty);

module.exports = router;
