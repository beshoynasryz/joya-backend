const mongoose = require("mongoose");

const secondSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      
    },
    paragraph: {
      type: String,
      
    },
    image: {
      type: String, // Path to the image or URL
      
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const SecondSection = mongoose.model("SecondSection", secondSectionSchema);

module.exports = SecondSection;
