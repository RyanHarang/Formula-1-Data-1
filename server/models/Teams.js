const mongoose = require("mongoose");

const TeamsSchema = new mongoose.Schema({
  name: String,
  image: String,
  wins: Number,
  races: Number,
  drivers: Array,
});

module.exports = mongoose.model("Teams", TeamsSchema);
