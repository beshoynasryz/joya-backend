const asyncHandler = require("express-async-handler");
const OffPlanModel = require("../models/offplanModel");

// Create OffPlan
const createOffPlan = asyncHandler(async (req, res) => {
  const { title, description, details, PaymentPlan, StartingPrice, HandoverDate, Bookingfees,  ExpoCity, MarinaWalk, DubaiInternationalAirport, DowntownDubai, location ,Bedrooms} = req.body;


  
  let bedrooms = Array.isArray(Bedrooms) ? Bedrooms.map(Number) : [];

  // Filter out any invalid numbers (NaN) from Bedrooms
  bedrooms = bedrooms.filter(bedroom => !isNaN(bedroom));

  // Collect image paths from uploaded files
  // const imgSrcs = req.files.map((file) => `/images/${file.filename}`);
  const imgSrcs = req.files['imgSrcs']
  ? req.files['imgSrcs'].map((file) => `/images/${file.filename}`)
  : [];
  const offPlan = await OffPlanModel.create({
    title,
    description,
    details,
    imgSrcs,
    PaymentPlan,
    StartingPrice,
    HandoverDate,
    Bookingfees,
    Bedrooms: bedrooms,
    ExpoCity,
    MarinaWalk,
    DubaiInternationalAirport,
    DowntownDubai,
    location,
  });

  res.status(201).json(offPlan);
});

// Get all OffPlans
const getAllOffPlans = asyncHandler(async (req, res) => {
  const offPlans = await OffPlanModel.find({});
  res.status(200).json(offPlans);
});

// Get a single OffPlan by ID
const getOffPlanById = asyncHandler(async (req, res) => {
  const offPlan = await OffPlanModel.findById(req.params.id);
  if (!offPlan) {
    res.status(404);
    throw new Error("OffPlan not found");
  }
  res.status(200).json(offPlan);
});

// Update OffPlan
const updateOffPlan = asyncHandler(async (req, res) => {
  const offPlan = await OffPlanModel.findById(req.params.id);
  if (!offPlan) {
    res.status(404);
    throw new Error("OffPlan not found");
  }

  const updatedFields = req.body;

  if (req.files) {
    // Update image paths if new images are uploaded
    updatedFields.imgSrcs = req.files.map((file) => `/images/${file.filename}`);
  }

  const updatedOffPlan = await OffPlanModel.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

  res.status(200).json(updatedOffPlan);
});

// Delete OffPlan
const deleteOffPlan = asyncHandler(async (req, res) => {
  const offPlan = await OffPlanModel.findById(req.params.id);
  if (!offPlan) {
    res.status(404);
    throw new Error("OffPlan not found");
  }

  // Use deleteOne() to delete the document
  await OffPlanModel.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "OffPlan removed successfully" });
});


module.exports = { createOffPlan, getAllOffPlans, getOffPlanById, updateOffPlan, deleteOffPlan };
