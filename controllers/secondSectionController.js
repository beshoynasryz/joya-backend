const asyncHandler = require("express-async-handler");
const SecondSection = require("../models/secondSectionModel");

// @desc    Create a new Second Section
// @route   POST /api/second-sections
// @access  Private
const createSecondSection = asyncHandler(async (req, res) => {
  const { title, paragraph } = req.body;

  // Handle image upload (if provided)
  const image = req.file ? `/images/${req.file.filename}` : null;

  // Create a new second section entry
  const section = new SecondSection({
    title,
    paragraph,
    image, // Add image if uploaded
  });

  // Save the new section to the database
  const createdSection = await section.save();

  res.status(201).json(createdSection);
});

// @desc    Get all Second Sections
// @route   GET /api/second-sections
// @access  Public
const getAllSecondSections = asyncHandler(async (req, res) => {
  const sections = await SecondSection.find();
  res.status(200).json(sections);
});

// @desc    Get a specific Second Section by ID
// @route   GET /api/second-sections/:id
// @access  Public
const getSecondSectionById = asyncHandler(async (req, res) => {
  const section = await SecondSection.findById(req.params.id);

  if (!section) {
    res.status(404);
    throw new Error("Second Section not found");
  }

  res.status(200).json(section);
});

// @desc    Update a Second Section
// @route   PUT /api/second-sections/:id
// @access  Private
const updateSecondSection = asyncHandler(async (req, res) => {
  const { title, paragraph } = req.body;

  // Handle image upload (if provided)
  const image = req.file ? `/images/${req.file.filename}` : null;

  // Find the section by ID
  const section = await SecondSection.findById(req.params.id);

  if (!section) {
    res.status(404);
    throw new Error("Second Section not found");
  }

  // Update fields with new data (or keep the existing data)
  section.title = title || section.title;
  section.paragraph = paragraph || section.paragraph;
  section.image = image || section.image; // Update image if uploaded

  // Save the updated section
  const updatedSection = await section.save();

  res.status(200).json(updatedSection);
});

// @desc    Delete a Second Section
// @route   DELETE /api/second-sections/:id
// @access  Private
const deleteSecondSection = asyncHandler(async (req, res) => {
  const section = await SecondSection.findByIdAndDelete(req.params.id);

  if (!section) {
    res.status(404);
    throw new Error("Second Section not found");
  }

  res.status(200).json({ message: "Second Section deleted successfully" });
});

module.exports = {
  createSecondSection,
  getAllSecondSections,
  getSecondSectionById,
  updateSecondSection,
  deleteSecondSection,
};
