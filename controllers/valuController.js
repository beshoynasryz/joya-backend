const asyncHandler = require("express-async-handler");
const Value = require("../models/valuesModel");

// Get all values
exports.getAllValues = asyncHandler(async (req, res) => {
  const values = await Value.find();
  res.status(200).json(values);
});

// Create a new value
exports.createValue = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
 
  const value = await Value.create({ title, content });
  res.status(201).json(value);
});

// Update a value by ID
exports.updateValue = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const value = await Value.findById(id);
  if (!value) {
    res.status(404).json({ message: "Value not found" });
    return;
  }

  value.title = title || value.title;
  value.content = content || value.content;
  await value.save();

  res.status(200).json(value);
});

// Delete a value by ID
exports.deleteValue = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const value = await Value.findById(id);
  if (!value) {
    res.status(404).json({ message: "Value not found" });
    return;
  }

  await value.deleteOne();
  res.status(200).json({ message: "Value deleted successfully" });
});
