const mongoose = require("mongoose");

const RacerInfoSchema = new mongoose.Schema({
  name: String,
  image: String,
  number: String,
  DOB: String,
  lastYear: String,
  team: String,
  totalRaces: Number,
  wins: Number,
});

module.exports = mongoose.model("RacerInfo", RacerInfoSchema);
