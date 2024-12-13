const mongoose = require("mongoose");

const laxurySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
  },
  details: {
    type: String,
  },
  imgSrcs: [String], // Array of image URLs or paths
  agentName: {
    type: String,
  },
  agentImage: {
    type: String,
  },
  agentPhone: {
    type: Number,
  },
  agentWhatsapp: {
    type: Number,
  },
  beds: {
    type: Number,
  },
  baths: {
    type: Number,
  },
  sq: {
    type: Number, // Square footage
  },
  cars: {
    type: Number, // Number of parking spaces
  },
});

const laxuryModel = mongoose.model("laxury", laxurySchema);

module.exports = laxuryModel;
