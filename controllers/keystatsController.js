// controllers/keyStatsController.js

const asyncHandler = require("express-async-handler");
const KeyStats = require("../models/keystatsModel");

// @desc    Get all key statistics
// @route   GET /api/keystats
// @access  Public
const getKeyStats = asyncHandler(async (req, res) => {
  const stats = await KeyStats.find({});
  res.json(stats);
});

// @desc    Create a new key stat
// @route   POST /api/keystats
// @access  Admin (or authorized users)
const createKeyStat = asyncHandler(async (req, res) => {
  const { value, label } = req.body;

  

  const newStat = new KeyStats({
    value,
    label,
  });

  const createdStat = await newStat.save();
  res.status(201).json(createdStat);
});

// @desc    Get a key stat by ID
// @route   GET /api/keystats/:id
// @access  Public
const getKeyStatById = asyncHandler(async (req, res) => {
  const keyStat = await KeyStats.findById(req.params.id);

  if (!keyStat) {
    res.status(404);
    throw new Error("Key stat not found");
  }

  res.json(keyStat);
});

// @desc    Update a key stat by ID
// @route   PUT /api/keystats/:id
// @access  Admin (or authorized users)
const updateKeyStat = asyncHandler(async (req, res) => {
  const { value, label } = req.body;

  const keyStat = await KeyStats.findById(req.params.id);

  if (!keyStat) {
    res.status(404);
    throw new Error("Key stat not found");
  }

  // Update the fields with the new data
  keyStat.value = value || keyStat.value;
  keyStat.label = label || keyStat.label;

  const updatedStat = await keyStat.save();
  res.json(updatedStat);
});

// @desc    Delete a key stat by ID
// @route   DELETE /api/keystats/:id
// @access  Admin (or authorized users)
const deleteKeyStat = asyncHandler(async (req, res) => {
  const keyStat = await KeyStats.findById(req.params.id);

  if (!keyStat) {
    res.status(404);
    throw new Error("Key stat not found");
  }

  await keyStat.remove();
  res.json({ message: "Key stat removed" });
});

module.exports = {
  getKeyStats,
  createKeyStat,
  getKeyStatById,
  updateKeyStat,
  deleteKeyStat,
};
