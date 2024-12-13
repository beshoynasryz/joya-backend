const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createlaxury, getAlllaxurys, getlaxuryById, updatelaxury, deletelaxury } = require("../controllers/laxuryController");
const upload = require("../middleware/upload");

// Routes
router.route("/")
  .get(getAlllaxurys)
  .post(upload.fields([
    { name: "imgSrcs", maxCount: 5 },  // Allows uploading multiple laxury images
    { name: "agentImage", maxCount: 1 } // Allows uploading a single agent image
  ]), createlaxury); // Create a new laxury

router.route("/:id")
  .get(getlaxuryById)
  .put(upload.fields([
    { name: "imgSrcs", maxCount: 5 },  // Allows uploading multiple laxury images
    { name: "agentImage", maxCount: 1 } // Allows uploading a single agent image
  ]), updatelaxury) // Update an existing laxury
  .delete(deletelaxury); // Delete a laxury

module.exports = router;
