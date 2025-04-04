const express = require("express");
const router = express.Router();

const Driver = require("../models/Driver");
const Race = require("../models/Race");
const Team = require("../models/Team");
const Lap = require("../models/Lap");

router.get("/drivers", async (req, res) => {
  data = await Driver.find();
  res.json(data);
});

router.get("/drivers-active", async (req, res) => {
  data = await Driver.find({ lastYear: 2024 });
  res.json(data);
});

router.get("/driver-single", async (req, res) => {
  const findID = req.query.id;
  try {
    const data = await Driver.findOne({ id: findID });
    if (!data) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/teams", async (req, res) => {
  data = await Team.find();
  res.json(data);
});

router.get("/team-single", async (req, res) => {
  const findID = req.body.id;
  data = await Team.findOne({ id: findID });
  res.json(data);
});

router.get("/races", async (req, res) => {
  data = await Race.find();
  res.json(data);
});

router.get("/races-active", async (req, res) => {
  data = await Race.find({ date: { $regex: "2024" } });
  res.json(data);
});

router.get("/race-single", async (req, res) => {
  const findID = req.body.id;
  data = await Race.findOne({ id: findID });
  res.json(data);
});

router.get("/race-laps", async (req, res) => {
  const DriverID = req.query.driverId;
  const RaceID = req.query.raceId;
  try {
    const data = await Lap.find({ raceId: RaceID, driverId: DriverID });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
