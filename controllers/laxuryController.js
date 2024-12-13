const asyncHandler = require("express-async-handler");
const laxuryModel = require("../models/laxuryModel"); // Assuming the model file is in the "models" folder

// Create a new laxury
const createlaxury = asyncHandler(async (req, res) => {
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
    : [];  // For laxury images

  const agentImage = req.files && req.files['agentImage'] 
    ? `/images/${req.files['agentImage'][0].filename}`  // For agent's image
    : '';

  const laxury = await laxuryModel.create({
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

  res.status(201).json(laxury);
});

// Get all laxurys
const getAlllaxurys = asyncHandler(async (req, res) => {
  const laxurys = await laxuryModel.find({});
  res.status(200).json(laxurys);
});

// Get a single laxury by ID
const getlaxuryById = asyncHandler(async (req, res) => {
  const laxury = await laxuryModel.findById(req.params.id);
  if (!laxury) {
    res.status(404);
    throw new Error("laxury not found");
  }
  res.status(200).json(laxury);
});

// Update a laxury
const updatelaxury = asyncHandler(async (req, res) => {
  const laxury = await laxuryModel.findById(req.params.id);
  if (!laxury) {
    res.status(404);
    throw new Error("laxury not found");
  }

  const updatedFields = req.body;

  // Handle image uploads (if any)
  if (req.files) {
    updatedFields.imgSrcs = req.files['imgSrcs'] 
      ? req.files['imgSrcs'].map((file) => `/images/${file.filename}`) 
      : [];

    updatedFields.agentImage = req.files['agentImage'] 
      ? `/images/${req.files['agentImage'][0].filename}` 
      : laxury.agentImage;  // Preserve the previous agent image if not updated
  }

  const updatedlaxury = await laxuryModel.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

  res.status(200).json(updatedlaxury);
});

// Delete a laxury
const deletelaxury = asyncHandler(async (req, res) => {
    const laxury = await laxuryModel.findByIdAndDelete(req.params.id);
    if (!laxury) {
      res.status(404);
      throw new Error("laxury not found");
    }
  
    res.status(200).json({ message: "laxury removed successfully" });
  });
  

module.exports = { createlaxury, getAlllaxurys, getlaxuryById, updatelaxury, deletelaxury };
