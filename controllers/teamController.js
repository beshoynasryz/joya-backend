const Team = require('../models/teamModel');
const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');

// Get all team members with pagination
const getAllTeamMembers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;

  const teamMembers = await Team.find()
    .skip(skip)
    .limit(pageSize);

  const total = await Team.countDocuments();

  res.status(200).json({
    teamMembers,
    total,
    page,
    pages: Math.ceil(total / pageSize),
  });
});

// Create a new team member
const createTeamMember = asyncHandler(async (req, res) => {
  const { name, position, language, email, phone } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : null; // Store relative image path

  const teamMember = new Team({
    name,
    position,
    language,
    email,
    phone,
    image,
  });

  await teamMember.save();

  res.status(201).json({
    message: 'Team member created successfully',
    teamMember,
  });
});

// Update team member
const updateTeamMember = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, position, language, email, phone } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : null;

  const teamMember = await Team.findById(id);
  if (!teamMember) {
    return res.status(404).json({ message: 'Team member not found' });
  }

  teamMember.name = name || teamMember.name;
  teamMember.position = position || teamMember.position;
  teamMember.language = language || teamMember.language;
  teamMember.email = email || teamMember.email;
  teamMember.phone = phone || teamMember.phone;
  teamMember.image = image || teamMember.image;

  await teamMember.save();

  res.status(200).json({
    message: 'Team member updated successfully',
    teamMember,
  });
});

// Delete team member
const deleteTeamMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    // Find the team member by ID
    const teamMember = await Team.findById(id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
  
    // Delete image from the server if it exists
    if (teamMember.image) {
      fs.unlinkSync(path.join(__dirname, '../', teamMember.image)); // Delete image from server
    }
  
    // Delete the team member from the database
    await Team.findByIdAndDelete(id); // Use findByIdAndDelete instead of remove()
  
    res.status(200).json({ message: 'Team member deleted successfully' });
  });
  

module.exports = {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
