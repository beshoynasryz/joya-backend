const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createFeature, getAllFeatures, getFeatureById, updateFeature, deleteFeature } = require("../controllers/featureController");
const upload = require("../middleware/upload");

// Routes
router.route("/")
  .get(getAllFeatures)
  .post(upload.fields([
    { name: "imgSrcs", maxCount: 5 },  // Allows uploading multiple feature images
    { name: "agentImage", maxCount: 1 } // Allows uploading a single agent image
  ]), createFeature); // Create a new feature

router.route("/:id")
  .get(getFeatureById)
  .put(upload.fields([
    { name: "imgSrcs", maxCount: 5 },  // Allows uploading multiple feature images
    { name: "agentImage", maxCount: 1 } // Allows uploading a single agent image
  ]), updateFeature) // Update an existing feature
  .delete(deleteFeature); // Delete a feature

module.exports = router;
