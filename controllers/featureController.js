const asyncHandler = require("express-async-handler");
const featureModel = require("../models/featureModel"); // Assuming the model file is in the "models" folder

// Create a new Feature
const createFeature = asyncHandler(async (req, res) => {
  const { 
    title, 
    description, 
    details, 
    agentName, 
    agentPhone, 
    agentWhatsapp, 
    beds, 
    baths, 
    sq, 
    cars 
  } = req.body;

  // Handle image uploads using multer (if any)
  const imgSrcs = req.files && req.files['imgSrcs'] 
    ? req.files['imgSrcs'].map((file) => `/images/${file.filename}`) 
    : [];  // For feature images

  const agentImage = req.files && req.files['agentImage'] 
    ? `/images/${req.files['agentImage'][0].filename}`  // For agent's image
    : '';

  const feature = await featureModel.create({
    title,
    description,
    details,
    imgSrcs,
    agentName,
    agentImage,
    agentPhone,
    agentWhatsapp,
    beds,
    baths,
    sq,
    cars,
  });

  res.status(201).json(feature);
});

// Get all Features
const getAllFeatures = asyncHandler(async (req, res) => {
  const features = await featureModel.find({});
  res.status(200).json(features);
});

// Get a single Feature by ID
const getFeatureById = asyncHandler(async (req, res) => {
  const feature = await featureModel.findById(req.params.id);
  if (!feature) {
    res.status(404);
    throw new Error("Feature not found");
  }
  res.status(200).json(feature);
});

// Update a Feature
const updateFeature = asyncHandler(async (req, res) => {
  const feature = await featureModel.findById(req.params.id);
  if (!feature) {
    res.status(404);
    throw new Error("Feature not found");
  }

  const updatedFields = req.body;

  // Handle image uploads (if any)
  if (req.files) {
    updatedFields.imgSrcs = req.files['imgSrcs'] 
      ? req.files['imgSrcs'].map((file) => `/images/${file.filename}`) 
      : [];

    updatedFields.agentImage = req.files['agentImage'] 
      ? `/images/${req.files['agentImage'][0].filename}` 
      : feature.agentImage;  // Preserve the previous agent image if not updated
  }

  const updatedFeature = await featureModel.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

  res.status(200).json(updatedFeature);
});

// Delete a Feature
const deleteFeature = asyncHandler(async (req, res) => {
    const feature = await featureModel.findByIdAndDelete(req.params.id);
    if (!feature) {
      res.status(404);
      throw new Error("Feature not found");
    }
  
    res.status(200).json({ message: "Feature removed successfully" });
  });
  

module.exports = { createFeature, getAllFeatures, getFeatureById, updateFeature, deleteFeature };
