const express = require('express');
const router = express.Router();
const {
  createContact,
  getContact,
  updateContact,
  deleteContact
} = require('../controllers/contactUsController');

// Create new contact info
router.post('/', createContact);

// Get all contact info
router.get('/', getContact);

// Update contact info by ID
router.put('/:id', updateContact);

// Delete contact info by ID
router.delete('/:id', deleteContact);

module.exports = router;
