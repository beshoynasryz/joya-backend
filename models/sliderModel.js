const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      
    },
    url: {
      type: String,
      
    },
    image: {
      type: String,
      
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;
