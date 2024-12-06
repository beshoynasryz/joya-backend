const express = require("express");
const { getAllTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } = require("../controllers/teamController");
const upload = require("../middleware/upload");

// Router setup
const router = express.Router();

// Public route to get all team members
router.get("/", getAllTeamMembers);

// Protected routes for creating, updating, and deleting team members
router.post("/",  upload.single("image"), createTeamMember); // Admin only - for creating a team member
router.put("/:id", upload.single("image"), updateTeamMember); // Admin only - for updating a team member
router.delete("/:id", deleteTeamMember); // Admin only - for deleting a team member

module.exports = router;
