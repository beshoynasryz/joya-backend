// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image: {
    type: String, // File path of the uploaded image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
