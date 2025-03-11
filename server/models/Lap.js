const mongoose = require("mongoose");

const LapSchema = new mongoose.Schema(
  {
    raceId: Number,
    driverId: Number,
    lapNumber: Number,
    time: String,
    position: String,
  },
  {
    timestamps: true,
    collection: "LapData",
  }
);

module.exports = mongoose.model("Lap", LapSchema);
