const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  favoriteDrivers: Array,
  favoriteTeams: Array,
  favoriteRaces: Array,
});

module.exports = mongoose.model("User", UserSchema);
