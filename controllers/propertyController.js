const asyncHandler = require('express-async-handler');
const Property = require('../models/propertyModel');

// Create a new Property
const createProperty = asyncHandler(async (req, res) => {
  const {
    type,
    description,
    location,
    price,
    beds,
    bathrooms,
    space,
    paymentPlan,
    locationDetails,
    startingPrice,
    bookingFees,
    handoverDate,
  } = req.body;

  // Handle image upload (if provided)
  const imageProperty = req.file ? `/images/${req.file.filename}` : null;

  // Create a new property
  const property = new Property({
    type,
    imageProperty,
 
    description,
    location,
    price,
    beds,
    bathrooms,
    space,
    paymentPlan,
    locationDetails,
    startingPrice,
    bookingFees,
    handoverDate,
  });

  // Save the property to the database
  const createdProperty = await property.save();

  res.status(201).json(createdProperty);
});

// Get all Properties
const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find();
  res.status(200).json(properties);
});

// Get a specific Property by ID
const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  res.status(200).json(property);
});

// Update a Property
const updateProperty = asyncHandler(async (req, res) => {
  const {
    type,
    description,
    location,
    price,
    beds,
    bathrooms,
    space,
    paymentPlan,
    locationDetails,
    startingPrice,
    bookingFees,
    handoverDate,
  } = req.body;

  // Handle image upload (if provided)
  const imageProperty = req.file ? `/images/${req.file.filename}` : null;
 

  // Find the property by ID
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  // Update property fields, including the image paths
  property.type = type || property.type;
  property.imageProperty = imageProperty || property.imageProperty;
 
  property.description = description || property.description;
  property.location = location || property.location;
  property.price = price || property.price;
  property.beds = beds || property.beds;
  property.bathrooms = bathrooms || property.bathrooms;
  property.space = space || property.space;
  property.paymentPlan = paymentPlan || property.paymentPlan;
  property.locationDetails = locationDetails || property.locationDetails;
  property.startingPrice = startingPrice || property.startingPrice;
  property.bookingFees = bookingFees || property.bookingFees;
  property.handoverDate = handoverDate || property.handoverDate;

  const updatedProperty = await property.save();
  res.status(200).json(updatedProperty);
});

// Delete a Property
const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  res.status(200).json({ message: 'Property deleted successfully' });
});

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
