const express = require('express');
const router = express.Router();
const {
  createPartner,
  getAllPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
} = require('../controllers/partnerController');
const upload = require('../middleware//upload'); // Middleware for handling file uploads

// Routes for handling Partner CRUD operations
router.post('/', upload.single('image'), createPartner); // Create Partner
router.get('/', getAllPartners); // Get all Partners
router.get('/:id', getPartnerById); // Get a specific Partner by ID
router.put('/:id', upload.single('image'), updatePartner); // Update a Partner
router.delete('/:id', deletePartner); // Delete a Partner

module.exports = router;
