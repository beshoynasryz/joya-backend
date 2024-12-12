const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
     
    },
    content: {
      type: String,
     
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

module.exports = mongoose.model("Value", valueSchema);
