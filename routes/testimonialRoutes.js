const express = require("express");
const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

const router = express.Router();

router.route("/")
  .post(createTestimonial) // Create a testimonial
  .get(getAllTestimonials); // Get all testimonials

router.route("/:id")
  .get(getTestimonialById) // Get a testimonial by ID
  .put(updateTestimonial)  // Update a testimonial by ID
  .delete(deleteTestimonial); // Delete a testimonial by ID

module.exports = router;
