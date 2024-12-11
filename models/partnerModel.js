const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema(
  {
    image: {
      type: String, // Path to the uploaded image
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
