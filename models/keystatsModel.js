// models/KeyStats.js

const mongoose = require("mongoose");

const keyStatsSchema = new mongoose.Schema(
  {
    value: { type: String },
    label: { type: String },
  },
  { timestamps: true }
);

const KeyStats = mongoose.model("KeyStats", keyStatsSchema);

module.exports = KeyStats;
