const Contact = require('../models/contactModel');
const asyncHandler = require('express-async-handler');

// @desc    Create new contact info
// @route   POST /api/contact
// @access  Public
const createContact = asyncHandler(async (req, res) => {
  const { description, phone, email, address, facebook, twitter, instagram, linkedin, mapUrl } = req.body;



  const newContact = new Contact({
    description,
    phone,
    email,
    address,
    facebook,
    twitter,
    instagram,
    linkedin,
    mapUrl,
  });

  await newContact.save();
  res.status(201).json({ message: 'Contact information created successfully', contact: newContact });
});

// @desc    Get all contact info
// @route   GET /api/contact
// @access  Public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find();
  if (contact.length === 0) {
    res.status(404).json({ message: 'No contact information found' });
  } else {
    res.json(contact);
  }
});

// @desc    Update contact info by ID
// @route   PUT /api/contact/:id
// @access  Public
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description, phone, email, address, facebook, twitter, instagram, linkedin, mapUrl } = req.body;

  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404).json({ message: 'Contact information not found' });
    return;
  }

  contact.description = description || contact.description;
  contact.phone = phone || contact.phone;
  contact.email = email || contact.email;
  contact.address = address || contact.address;
  contact.facebook = facebook || contact.facebook;
  contact.twitter = twitter || contact.twitter;
  contact.instagram = instagram || contact.instagram;
  contact.linkedin = linkedin || contact.linkedin;
  contact.mapUrl = mapUrl || contact.mapUrl;

  await contact.save();

  res.json({ message: 'Contact information updated successfully', contact });
});

// @desc    Delete contact info by ID
// @route   DELETE /api/contact/:id
// @access  Public
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404).json({ message: 'Contact information not found' });
    return;
  }

  await contact.remove();
  res.json({ message: 'Contact information deleted successfully' });
});

module.exports = {
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
