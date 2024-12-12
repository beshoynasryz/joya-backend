// routes/keyStatsRoutes.js

const express = require("express");
const {
  getKeyStats,
  createKeyStat,
  getKeyStatById,
  updateKeyStat,
  deleteKeyStat,
} = require("../controllers/keystatsController");

const router = express.Router();

// Route to get all key stats
router.get("/", getKeyStats);

// Route to create a new key stat (for admin or authorized users)
router.post("/", createKeyStat);

// Route to get a key stat by ID
router.get("/:id", getKeyStatById);

// Route to update a key stat by ID
router.put("/:id", updateKeyStat);

// Route to delete a key stat by ID
router.delete("/:id", deleteKeyStat);

module.exports = router;
