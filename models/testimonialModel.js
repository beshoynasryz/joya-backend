const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    nameOfUser: {
      type: String,
      
    },
    initials: {
      type: String, // Add initials as a schema key
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

// Middleware to calculate initials before saving
testimonialSchema.pre("save", function (next) {
  if (this.nameOfUser) {
    const names = this.nameOfUser.split(" ");
    this.initials = names
      .map((name) => name.charAt(0).toUpperCase())
      .join(""); // Calculate initials
  }
  next();
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
