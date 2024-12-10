const express = require('express');
const router = express.Router();
const {
  createSecondSection,
  getAllSecondSections,
  getSecondSectionById,
  updateSecondSection,
  deleteSecondSection,
} = require('../controllers/secondSectionController');
const upload = require('../middleware/upload'); // Middleware for file upload

// Routes for handling SecondSection CRUD operations
router.post('/', upload.single('image'), createSecondSection); // Create SecondSection
router.get('/', getAllSecondSections); // Get all SecondSections
router.get('/:id', getSecondSectionById); // Get a specific SecondSection by ID
router.put('/:id', upload.single('image'), updateSecondSection); // Update a SecondSection
router.delete('/:id', deleteSecondSection); // Delete a SecondSection

module.exports = router;
