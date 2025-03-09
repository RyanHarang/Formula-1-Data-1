const mongoose = require("mongoose");

const RaceSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    date: String,
    trace: String,
    winner: Number,
    fastestLap: String,
    polePosition: Number,
  },
  {
    timestamps: true,
    collection: "RaceData",
  }
);

module.exports = mongoose.model("Race", RaceSchema);
