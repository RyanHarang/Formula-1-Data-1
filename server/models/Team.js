const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    nationality: String,
    natCode: String,
    image: String,
    wins: String,
    races: String,
    drivers: [Number],
  },
  {
    timestamps: true,
    collection: "Teams",
  }
);

module.exports = mongoose.model("Team", TeamSchema);
