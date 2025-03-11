const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    favoriteDrivers: {
      type: [String], // An array of driver IDs or names
      default: [],
    },
    favoriteTeams: {
      type: [String],
      default: [],
    },
    favoriteRaces: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, collection: "Users" }
);

module.exports = mongoose.model("User", UserSchema);
