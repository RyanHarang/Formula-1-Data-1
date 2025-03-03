const mongoose = require("mongoose");

const RacesSchema = new mongoose.Schema({
  year: String,
  title: String,
  driver: String,
  laps: Array,
});

module.exports = mongoose.model("Races", RacesSchema);
