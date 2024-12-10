const asyncHandler = require("express-async-handler");
const Testimonial = require("../models/testimonialModel");

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Public
const createTestimonial = asyncHandler(async (req, res) => {
  const { nameOfUser, comment, rate } = req.body;



  const testimonial = await Testimonial.create({ nameOfUser, comment, rate });

  res.status(201).json(testimonial);
});

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getAllTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.status(200).json(testimonials);
});

// @desc    Get a single testimonial by ID
// @route   GET /api/testimonials/:id
// @access  Public
const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  res.status(200).json(testimonial);
});

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Public
const updateTestimonial = asyncHandler(async (req, res) => {
  const { nameOfUser, comment, rate } = req.body;

  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  testimonial.nameOfUser = nameOfUser || testimonial.nameOfUser;
  testimonial.comment = comment || testimonial.comment;
  testimonial.rate = rate !== undefined ? rate : testimonial.rate;

  const updatedTestimonial = await testimonial.save();

  res.status(200).json(updatedTestimonial);
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Public
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  await Testimonial.deleteOne({ _id: req.params.id }); // Corrected method to delete the document
  res.status(200).json({ message: "Testimonial removed" });
});


module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
