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
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Driver" }],
      default: [],
    },
    favoriteTeams: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
      default: [],
    },
    favoriteRaces: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Race" }],
      default: [],
    },
  },
  { timestamps: true, collection: "Users" }
);

module.exports = mongoose.model("User", UserSchema);
