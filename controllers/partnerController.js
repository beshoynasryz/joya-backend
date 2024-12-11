const asyncHandler = require('express-async-handler');
const Partner = require('../models/partnerModel');

// Create a new Partner
const createPartner = asyncHandler(async (req, res) => {
  const image = req.file ? `/images/${req.file.filename}` : null; // Handle image upload

  if (!image) {
    res.status(400);
    throw new Error('Image is required');
  }

  const partner = new Partner({ image });

  const createdPartner = await partner.save();
  res.status(201).json(createdPartner);
});

// Get all Partners
const getAllPartners = asyncHandler(async (req, res) => {
  const partners = await Partner.find();
  res.status(200).json(partners);
});

// Get a specific Partner by ID
const getPartnerById = asyncHandler(async (req, res) => {
  const partner = await Partner.findById(req.params.id);

  if (!partner) {
    res.status(404);
    throw new Error('Partner not found');
  }

  res.status(200).json(partner);
});

// Update a Partner
const updatePartner = asyncHandler(async (req, res) => {
  const image = req.file ? `/images/${req.file.filename}` : null;

  const partner = await Partner.findById(req.params.id);

  if (!partner) {
    res.status(404);
    throw new Error('Partner not found');
  }

  partner.image = image || partner.image;

  const updatedPartner = await partner.save();
  res.status(200).json(updatedPartner);
});

// Delete a Partner
const deletePartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findByIdAndDelete(req.params.id);

  if (!partner) {
    res.status(404);
    throw new Error('Partner not found');
  }

  res.status(200).json({ message: 'Partner deleted successfully' });
});

module.exports = {
  createPartner,
  getAllPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
};
