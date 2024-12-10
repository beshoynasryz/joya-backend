const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    nameOfUser: {
      type: String,
      
    },
    comment: {
      type: String,
      
    },
    rate: {
      type: Number,
     
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
