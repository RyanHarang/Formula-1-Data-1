const mongoose = require("mongoose");

const RaceDataSchema = new mongoose.Schema({
  title: String,
  date: String,
  track: String,
  winner: String,
  fastestLap: String,
  polePosition: String,
});

module.exports = mongoose.model("RaceData", RaceDataSchema);
