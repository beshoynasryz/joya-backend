// models/HeroSection.js
const mongoose = require("mongoose");

const heroSectionSchema = new mongoose.Schema({
  title: { type: String },
  paragraph: { type: String },
  image: { type: String }, // URL/path to the uploaded image
});

module.exports = mongoose.model("HeroSection", heroSectionSchema);
