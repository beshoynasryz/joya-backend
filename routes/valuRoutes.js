const express = require("express");
const router = express.Router();
const {
  getAllValues,
  createValue,
  updateValue,
  deleteValue,
} = require("../controllers/valuController");

// Routes
router.get("/", getAllValues); // Fetch all values
router.post("/", createValue); // Create a new value
router.put("/:id", updateValue); // Update a value by ID
router.delete("/:id", deleteValue); // Delete a value by ID

module.exports = router;
