const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  name: String,
  city: String,
  country: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Trip", tripSchema);
