// routes/heroSectionRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createHeroSection,
  getHeroSections,
  updateHeroSection,
  deleteHeroSection,
  getHeroSectionById,
} = require("../controllers/heroSectionController");

// Create Hero Section
router.post("/", upload.single("image"), createHeroSection);

// Get All Hero Sections
router.get("/", getHeroSections);
router.get("/:id", getHeroSectionById);

// Update Hero Section
router.put("/:id", upload.single("image"), updateHeroSection);

// Delete Hero Section
router.delete("/:id", deleteHeroSection);

module.exports = router;
