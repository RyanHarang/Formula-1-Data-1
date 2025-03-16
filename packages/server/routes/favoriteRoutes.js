const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

router.get("/all", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("favoriteDrivers")
      .populate("favoriteTeams")
      .populate("favoriteRaces");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      favoriteDrivers: user.favoriteDrivers,
      favoriteTeams: user.favoriteTeams,
      favoriteRaces: user.favoriteRaces,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/add/:type", authenticate, async (req, res) => {
  const { type } = req.params;
  const { item } = req.body;

  const validTypes = ["drivers", "teams", "races"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ message: "Invalid favorite type" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const fieldMap = {
      drivers: "favoriteDrivers",
      teams: "favoriteTeams",
      races: "favoriteRaces",
    };

    const favoritesField = fieldMap[type];

    if (user[favoritesField].includes(item)) {
      return res.json({
        message: "Item already in favorites",
        favorites: user[favoritesField],
      });
    }

    user[favoritesField].push(item);
    await user.save();

    res.json({
      message: `Added to favorite ${type}`,
      favorites: user[favoritesField],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/remove/:type/:item", authenticate, async (req, res) => {
  const { type, item } = req.params;

  const validTypes = ["drivers", "teams", "races"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ message: "Invalid favorite type" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const fieldMap = {
      drivers: "favoriteDrivers",
      teams: "favoriteTeams",
      races: "favoriteRaces",
    };

    const favoritesField = fieldMap[type];

    const index = user[favoritesField].indexOf(item);
    if (index === -1) {
      return res.status(400).json({ message: "Item not found in favorites" });
    }

    user[favoritesField].splice(index, 1);
    await user.save();

    res.json({
      message: `Removed from favorite ${type}`,
      favorites: user[favoritesField],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
