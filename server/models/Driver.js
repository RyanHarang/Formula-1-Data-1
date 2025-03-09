const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    image: String,
    DOB: String,
    lastYear: Number,
    team: Number,
    totalRaces: String,
    wins: String,
  },
  { timestamps: true, collection: "Racer_Info" }
);

module.exports = mongoose.model("Driver", DriverSchema);
