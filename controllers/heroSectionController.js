// controllers/heroSectionController.js
const HeroSection = require("../models/heroSectionModel");

// Create a Hero Section
const createHeroSection = async (req, res) => {
  const { title, paragraph } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : undefined;

  try {
    const heroSection = new HeroSection({ title, paragraph, image });
    await heroSection.save();
    res.status(201).json(heroSection);
  } catch (error) {
    res.status(500).json({ message: "Failed to create Hero Section", error });
  }
};

// Get All Hero Sections
const getHeroSections = async (req, res) => {
  try {
    const heroSections = await HeroSection.find();
    res.status(200).json(heroSections);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Hero Sections", error });
  }
};

// Update a Hero Section
const updateHeroSection = async (req, res) => {
  const { id } = req.params;
  const { title, paragraph } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : undefined;

  try {
    const updatedHeroSection = await HeroSection.findByIdAndUpdate(
      id,
      { title, paragraph, image },
      { new: true }
    );
    if (!updatedHeroSection) {
      return res.status(404).json({ message: "Hero Section not found" });
    }
    res.status(200).json(updatedHeroSection);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Hero Section", error });
  }
};

// Delete a Hero Section
const deleteHeroSection = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHeroSection = await HeroSection.findByIdAndDelete(id);
    if (!deletedHeroSection) {
      return res.status(404).json({ message: "Hero Section not found" });
    }
    res.status(200).json({ message: "Hero Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Hero Section", error });
  }
};
const getHeroSectionById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const heroSection = await HeroSection.findById(id);
      if (!heroSection) {
        return res.status(404).json({ message: "Hero Section not found" });
      }
      res.status(200).json(heroSection);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Hero Section", error });
    }
  };

module.exports = {
  createHeroSection,
  getHeroSections,
  updateHeroSection,
  deleteHeroSection,
  getHeroSectionById
};
